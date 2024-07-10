import { NewfoldRuntime } from "./NewfoldRuntime";
import apiFetch from "@wordpress/api-fetch";

const Endpoints = {
  PLUGIN_STATUS: (plugins) =>
    NewfoldRuntime.createApiUrl("/newfold-ecommerce/v1/plugins/status", {
      plugins: plugins.join(),
    }),
  PLUGIN_INSTALL: NewfoldRuntime.createApiUrl("/newfold-installer/v1/plugins/install"),
};

const INSTALL_TOKEN = NewfoldRuntime.ecommerce.install_token;

export const PluginsSdk = {
  queries: {
    isPlugin(plugins, pluginNames, requiredState) {
      return pluginNames.every(
        (pluginName) => plugins?.details?.[pluginName].status === requiredState
      );
    },
    async status(...plugins) {
      return apiFetch({ url: Endpoints.PLUGIN_STATUS(plugins) });
    },
  },
  actions: {
    async installSync(plugin) {
      return apiFetch({
        url: Endpoints.PLUGIN_INSTALL,
        method: "POST",
        headers: { "X-NFD-INSTALLER": INSTALL_TOKEN },
        data: { plugin, activate: true, queue: false },
      }).catch((error) => {         
        return "failed"
      });
    },
    async queueInstall(plugin, priority = 10) {
      return apiFetch({
        url: Endpoints.PLUGIN_INSTALL,
        method: "POST",
        headers: { "X-NFD-INSTALLER": INSTALL_TOKEN },
        data: { plugin, activate: true, queue: true, priority },
      }).catch((error) => "failed");
    },
  },
};
