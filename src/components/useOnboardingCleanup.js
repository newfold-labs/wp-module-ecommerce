import { useEffect, useState } from '@wordpress/element';
import useSWRImmutable from 'swr/immutable';
import {
  Endpoints,
  queuePluginInstall,
  updateWCOnboarding,
  updateWPSettings,
} from '../services';

const isEmpty = (object) => Object.keys(object).length === 0;

const HighProductVolumes = ['11-100', '101-1000', '1000+'];

export function useOnboardingCleanup(hash) {
  let [cleanupStatus, setCleanupStatus] = useState(false);
  let { data: flow, error: flowError } = useSWRImmutable(
    hash ? '/newfold-onboarding/v1/flow' : null
  );
  let { data: settings, error: settingsError } = useSWRImmutable(
    hash ? Endpoints.WP_SETTINGS : null
  );
  useEffect(async () => {
    if (flow && settings && hash) {
      setCleanupStatus(true);
      let flowCheckpoint = flow.updatedAt ?? flow.createdAt;
      let previousCheckpoint = Number(
        settings['nfd-ecommerce-onboarding-check']
      );
      let viewCounter = Number(settings['nfd-ecommerce-counter']);
      if (viewCounter < 2) {
        await updateWPSettings({
          "nfd-ecommerce-counter": String(
            isNaN(viewCounter) ? 1 : viewCounter + 1
          ),
        });
      }
      if (isNaN(previousCheckpoint) || previousCheckpoint < flowCheckpoint) {
        let { productInfo } = flow.storeDetails;
        let wcOnboardingProfile = {};
        if (productInfo.product_count !== '') {
          wcOnboardingProfile.product_count = productInfo.product_count;
        }
        if (productInfo.product_types?.length > 0) {
          wcOnboardingProfile.product_types = productInfo.product_types;
        }
        if (!isEmpty(wcOnboardingProfile)) {
          wcOnboardingProfile.completed = true;
          await updateWCOnboarding(wcOnboardingProfile);
        }
        setCleanupStatus(false);
        if (HighProductVolumes.includes(productInfo.product_count)) {
          await queuePluginInstall(
            'nfd_slug_yith_woocommerce_ajax_product_filter',
            { hash },
            11
          );
          await queuePluginInstall(
            'yith-woocommerce-ajax-search',
            { hash },
            12
          );
        }
        for (const product_type of productInfo.product_types) {
          if (product_type === 'physical') {
            await queuePluginInstall(
              'nfd_slug_yith_shippo_shippings_for_woocommerce',
              { hash },
              13
            );
          }
          if (product_type === 'bookings') {
            await queuePluginInstall(
              'nfd_slug_yith_woocommerce_booking',
              { hash },
              14
            );
          }
        }
        await updateWPSettings({
          'nfd-ecommerce-onboarding-check': String(flowCheckpoint),
        });
      } else {
        setCleanupStatus(false);
      }
    }
    if (flowError || settingsError) {
      setCleanupStatus(false);
    }
  }, [flow, settings, hash]);
  return cleanupStatus;
}
