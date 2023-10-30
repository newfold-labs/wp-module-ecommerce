import { __ } from "@wordpress/i18n";
import useSWRMutation from "swr/mutation";
import { PluginsSdk } from "../sdk/plugins";
import { RuntimeSdk } from "../sdk/runtime";

export function useInstallWoo({ woo, wpModules }) {
  let { notify } = wpModules;
  let needsSyncInstall = woo.needsInstall;
  let installWooCommerce = useSWRMutation("install-woo", async () => {
    let response = needsSyncInstall
      ? await PluginsSdk.actions.installSync("woocommerce", true)
      : await PluginsSdk.actions.queueInstall("woocommerce", true);
    if (response !== "failed") {
      console.log(response, "testingggg");
      notify.push("woo-install-status", {
        title: __("WooCommerce has been installed successfully", "wp-module-ecommerce"),
        variant: "success",
        autoDismiss: 5000
      });
      await woo.refreshStatus();
    } else {
      notify.push("woo-install-status", {
        title: __("WooCommerce failed to install", "wp-module-ecommerce"),
        description: (
          <span>
            {__("Please try again, or ", "wp-module-ecommerce")}
            <a href={RuntimeSdk.brandSettings.support} target="_blank">
              {__("contact support", "wp-module-ecommerce")}
            </a>
          </span>
        ),
        variant: "error",
      });
    }
  });
  let isInstalling = needsSyncInstall
    ? installWooCommerce.isMutating
    : installWooCommerce.isMutating || installWooCommerce.data !== undefined;
  return [installWooCommerce.trigger, isInstalling];
}
