import { NewfoldRuntime } from './sdk/NewfoldRuntime';
import apiFetch from '@wordpress/api-fetch';
import { Spinner } from '@newfold/ui-component-library';
import useSWR, { SWRConfig } from 'swr';
import { Products } from './components/ProductsAndServices';
import { Store } from './components/Store';
import { StoreDetails } from './components/StoreDetails';
import { WonderCart } from './components/WonderCart';
import { PluginsSdk } from './sdk/plugins';
import { AllPayments } from './components/AllPayments';
import domReady from '@wordpress/dom-ready';
import { AnalyticsSdk } from './sdk/analytics';

const fetcher = (path) => apiFetch({ url: NewfoldRuntime.createApiUrl(path) });

domReady(() => {
  AnalyticsSdk.initialize();
});

const pages = [
  { key: '/store', Page: Store },
  { key: '/store/products', Page: Products },
  { key: '/store/details', Page: StoreDetails },
  { key: '/store/sales_discounts', Page: WonderCart },
  { key: '/store/payments', Page: AllPayments },
];

function parseWCStatus(data) {
  const status = data?.details?.woocommerce?.status;
  const isActive = status === 'active';
  const needsInstall = status === 'need_to_install';
  const isInstalling = data?.queue?.includes('woocommerce');
  return { isActive, needsInstall, isInstalling };
}

/** @type {import("..").NewfoldEcommerce}  */
export function NewfoldECommerce(props) {
  let { data: woo, mutate } = useSWR(
    'woo-status',
    () => PluginsSdk.queries.status('woocommerce').then(parseWCStatus),
    { revalidateOnReconnect: false, refreshInterval: 30 * 1000 }
  );
  let { Page } =
    pages.find((page) => page.key === props.state.location) ?? pages[0];

  if (woo === undefined) {
    return (
      <div className="nfd-flex nfd-items-center nfd-text-center nfd-justify-center nfd-h-full">
        <Spinner size={8} className="nfd-text-primary" />
      </div>
    );
  }
  if (!woo.isActive) {
    Page = Store;
    sessionStorage.setItem('reload', 'true');
  } else {
    if (sessionStorage.getItem('reload') === 'true') {
      sessionStorage.setItem('reload', 'false');
      window.location.reload();
    }
  }
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnReconnect: false,
        revalidateOnFocus: woo.isActive,
      }}
    >
      <Page woo={{ ...woo, refreshStatus: mutate }} {...props} />
    </SWRConfig>
  );
}

export * from './components/FreePlugins';
export * from './components/OnboardingScreen';
