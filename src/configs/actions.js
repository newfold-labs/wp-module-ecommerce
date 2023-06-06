import * as React from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { PluginsSdk } from "../sdk/plugins";
import { RuntimeSdk } from "../sdk/runtime";

/**
 * @param {string} pluginId
 * @param {number | undefined} priority
 * @param {{ notify: {push: (id: string, message: any) => void} }} modules
 */
export function createPluginInstallAction(pluginId, priority, { notify }) {
  return async (
    /** @type {any} */ state,
    /** @type {{ onRefresh: (plugin: string) => any; }} */ props
  ) => {
    let response = await PluginsSdk.actions.queueInstall(pluginId, priority);
    if (response === "failed") {
      notify.push(`plugin-install-status-${pluginId}`, {
        title: __("Plugin failed to install", "wp-module-ecommerce"),
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
    } else {
      await props.onRefresh("plugins");
      notify.push(`plugin-install-status-${pluginId}`, {
        title: __("Plugin installation is in progress", "wp-module-ecommerce"),
        description: __("We'll be done in sometime", "wp-module-ecommerce"),
        variant: "info",
        autoDismiss: 5000,
      });
    }
  };
}
