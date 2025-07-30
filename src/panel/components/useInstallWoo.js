import { __ } from '@wordpress/i18n';
import useSWRMutation from 'swr/mutation';
import { PluginsSdk } from '../sdk/plugins';
import { RuntimeSdk } from '../sdk/runtime';

export function useInstallWoo({ woo, wpModules }) {
  let { notify } = wpModules;
  let needsSyncInstall = woo.needsInstall;
  let installWooCommerce = useSWRMutation('install-woo', async () => {
    let response = needsSyncInstall
      ? await PluginsSdk.actions.installSync('woocommerce')
      : await PluginsSdk.actions.queueInstall('woocommerce');
    if (response !== 'failed') {
      await woo.refreshStatus();
    } else {
      notify.push('woo-install-status', {
        title: __('WooCommerce failed to install', 'wp-module-ecommerce'),
        description: (
          <span>
            {__('Please try again, or ', 'wp-module-ecommerce')}
            <a href={ window.NewfoldRuntime?.linkTracker?.addUtmParams( RuntimeSdk.brandSettings.support ) || RuntimeSdk.brandSettings.support } target="_blank">
              {__('contact support', 'wp-module-ecommerce')}
            </a>
          </span>
        ),
        variant: 'error',
      });
    }
  });
  let isInstalling = needsSyncInstall
    ? installWooCommerce.isMutating
    : installWooCommerce.isMutating || installWooCommerce.data !== undefined;
  return [installWooCommerce.trigger, isInstalling];
}
