import { useEffect, useState } from '@wordpress/element';
import useSWR from 'swr';
import {
  Endpoints,
  queuePluginInstall,
  syncPluginInstall,
  updateWCOnboarding,
  updateWPSettings,
} from '../services';

const isEmpty = (object) => Object.keys(object).length === 0;

const HighProductVolumes = ['11-100', '101-1000', '1000+'];

export function useOnboardingCleanup(token) {
  let [cleanupStatus, setCleanupStatus] = useState(false);
  let { data: flow, error: flowError } = useSWR('/newfold-onboarding/v1/flow');
  let { data: settings, error: settingsError } = useSWR(Endpoints.WP_SETTINGS);
  useEffect(async () => {
    setCleanupStatus(true);
    if (flow && settings) {
      let flowCheckpoint = flow.updatedAt ?? flow.createdAt;
      let previousCheckpoint = Number(
        settings['nfd-ecommerce-onboarding-check']
      );
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
            token
          );
          await syncPluginInstall('yith-woocommerce-ajax-search');
        }
        for (const product_type of productInfo.product_types) {
          if (product_type === 'physical') {
            await queuePluginInstall(
              'nfd_slug_yith_shippo_shippings_for_woocommerce',
              token
            );
          }
          if (product_type === 'bookings') {
            await queuePluginInstall(
              'nfd_slug_yith_woocommerce_booking',
              token
            );
          }
        }
        await updateWPSettings({
          'nfd-ecommerce-onboarding-check': String(flowCheckpoint),
        });
      }
    }
    if (flowError || settingsError) {
      setCleanupStatus(false);
    }
  }, [flow, settings]);
  return cleanupStatus;
}
