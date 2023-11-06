import { __ } from "@wordpress/i18n";
import useSWRMutation from "swr/mutation";
import { PluginsSdk } from "../sdk/plugins";
import { RuntimeSdk } from "../sdk/runtime";
import { sleep } from "../sdk/sleep";

/** @todo Can be made generic as useInstallPlugin */
export function useInstallWonderCart({ wpModules }) {
  let { notify } = wpModules;
  let installWonderCart = useSWRMutation("install-nfd_slug_wonder_cart", async () => {
    let response = await PluginsSdk.actions.installSync("nfd_slug_wonder_cart", true);
    if (response !== "failed") {
      notify.push("nfd_slug_wonder_cart-install-status", {
        title: "Installed successfully",
        variant: "success",
      });
      await sleep(1000);
      // window.location.reload();
    } else {
      notify.push("nfd_slug_wonder_cart-install-status", {
        title: "Failed to install",
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
  let isInstalling = installWonderCart.isMutating;
  return [installWonderCart.trigger, isInstalling];
}
