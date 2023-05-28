import useSWRMutation from "swr/mutation";
import { PluginsSdk } from "../sdk/plugins";

export function useInstallWoo({ plugins, wpModules, user }) {
  let { notify } = wpModules;
  let needsSyncInstall = PluginsSdk.queries.isPlugin(
    plugins,
    ["woocommerce"],
    "need_to_install"
  );
  let installWooCommerce = useSWRMutation("install-woo", async () => {
    let response = needsSyncInstall
      ? await PluginsSdk.actions.installSync("woocommerce")
      : await PluginsSdk.actions.queueInstall("woocommerce");
    if (response !== "failed") {
      notify.push("woo-install-status", {
        title: "WooCommerce has been installed successfully",
        variant: "success",
      });
      await plugins.refreshWooStatus();
    } else {
      notify.push("woo-install-status", {
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
