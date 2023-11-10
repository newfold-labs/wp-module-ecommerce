import { __ } from '@wordpress/i18n';
import { Spinner } from '@newfold/ui-component-library';
import { YITHPluginsDefinitions } from '../configs/YITHPlugins.config';
import { Section } from './Section';
import { useCardManager } from './useCardManager';
import classNames from 'classnames';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { NewfoldRuntime } from '../sdk/NewfoldRuntime';
import { YithFeatureCard } from './YithFeatureCard';

export function YITHPlugins({ woo, wpModules }) {
  let [cards] = useCardManager(
    YITHPluginsDefinitions({ notify: wpModules.notify }),
    { refreshInterval: 10 * 1000, isPaused: () => !woo.isActive }
  );
  const [yithProducts, setYithProducts] = useState([]);
  useEffect(async () => {
    const data = await apiFetch({
      url: NewfoldRuntime.createApiUrl('/newfold-marketplace/v1/marketplace'),
    });
    setYithProducts(
      data?.products?.data.filter(
        (product) =>
          product.categories?.includes('eCommerce') &&
          product.categories?.length === 1
      )
    );
  }, []);
  if (!woo.isActive) {
    return null;
  }
  console.log(yithProducts);

  return (
    <Section.Container>
      <Section.Header
        title={__('Additional Features', 'wp-module-ecommerce')}
        subTitle={__(
          'Improve your store with these powerful add-ons.',
          'wp-module-ecommerce'
        )}
      />
      <Section.Content>
        {cards.length === 0 && (
          <div className="nfd-flex nfd-items-center nfd-text-center nfd-justify-center nfd-h-60">
            <Spinner size={8} className="nfd-text-primary" />
          </div>
        )}
        <div
          className={classNames(
            'nfd-grid nfd-gap-6',
            'sm:nfd-grid-cols-1',
            'md:nfd-grid-cols-2',
            'lg:nfd-grid-cols-3'
          )}
        >
          {yithProducts?.map((product) => {
            return <YithFeatureCard yithProducts={product} />;
          })}
        </div>
      </Section.Content>
    </Section.Container>
  );
}
