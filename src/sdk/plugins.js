import apiFetch from "@wordpress/api-fetch";

const Endpoints = {
  PLUGIN_STATUS: "/newfold-ecommerce/v1/plugins/status",
  PLUGIN_INSTALL: "/newfold-installer/v1/plugins/install",
};

export const PluginsSdk = {
  isPlugin(plugins, pluginNames, requiredState) {
    return pluginNames.every(
      (pluginName) => plugins?.details[pluginName].status === requiredState
    );
  },
  async queryStatus(...plugins) {
    return apiFetch({
      path: `${Endpoints.PLUGIN_STATUS}?${new URLSearchParams({
        plugins: plugins.join(),
      })}`,
    });
  },
  async installSync(plugin, token) {
    return apiFetch({
      path: Endpoints.PLUGIN_INSTALL,
      method: "POST",
      headers: { "X-NFD-INSTALLER": token },
      data: { plugin, activate: true, queue: false },
    }).catch((error) => "failed");
  },
  async queueInstall(plugin, token, priority = 10) {
    return apiFetch({
      path: Endpoints.PLUGIN_INSTALL,
      method: "POST",
      headers: { "X-NFD-INSTALLER": token },
      data: { plugin, activate: true, queue: true, priority },
    }).catch((error) => "failed");
  },
};
