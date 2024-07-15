import { __ } from "@wordpress/i18n";
import useSWRMutation from "swr/mutation";
import { PluginsSdk } from "../sdk/plugins";
import { RuntimeSdk } from "../sdk/runtime";
import { sleep } from "../sdk/sleep";

/** @todo Can be made generic as useInstallPlugin */

export function useInstallEcomdash({ wpModules }) {
  let { notify } = wpModules;
  let installEcomdash = useSWRMutation("install-nfd_slug_ecomdash_wordpress_plugin", async () => {
    let response = await PluginsSdk.actions.installSync("nfd_slug_ecomdash_wordpress_plugin");
    if (response !== "failed") {
      notify.push("nfd_slug_ecomdash_wordpress_plugin-install-status", {
        title: "Installed successfully",
        variant: "success",
      });
      await sleep(1000);
      window.location.href = "admin.php?page=bluehost#/store/sales_channel"
      window.location.reload();
    } else {
      notify.push("nfd_slug_ecomdash_wordpress_plugin-install-status", {
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
  let isInstalling = installEcomdash.isMutating;
  return [installEcomdash.trigger, isInstalling];
}
