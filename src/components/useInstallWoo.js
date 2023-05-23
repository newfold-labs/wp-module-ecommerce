import useSWRMutation from "swr/mutation";
import { PluginsSdk } from "../sdk/plugins";

export function useInstallWoo({ plugins, wpModules, user }) {
  let { notify } = wpModules;
  let needsSyncInstall =
    plugins.details?.woocommerce.status === "need_to_install";
  let installWooCommerce = useSWRMutation("install-woo", async () => {
    let response = needsSyncInstall
      ? await PluginsSdk.installSync("woocommerce", user.site.install_token)
      : await PluginsSdk.queueInstall("woocommerce", user.site.install_token);
    if (response !== "failed") {
      await plugins.refreshWooStatus();
    } else {
      notify.push("woo-install-failure", {
        title: "WooCommerce failed to install",
        description: (
          <span>
            {__("Please try again, or ", "wp-module-ecommerce")}
            <a href={user?.currentBrandConfig?.support} target="_blank">
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
