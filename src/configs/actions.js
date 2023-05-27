import { PluginsSdk } from "../sdk/plugins";

export function createPluginInstallAction(
  pluginId,
  priority,
  { notify, user }
) {
  return async (state, props) => {
    let response = await PluginsSdk.queueInstall(
      pluginId,
      user?.site.install_token,
      priority
    );
    if (response === "failed") {
      notify.push(`plugin-install-failure-${yithId}`, {
        title: "Plugin failed to install",
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
    } else {
      await props.onRefresh("plugins");
      notify.push(`plugin-install-success-${yithId}`, {
        title: "Plugin installation is in progress",
        description: (
          <span>
            {__("Please check back in sometime", "wp-module-ecommerce")}
          </span>
        ),
        variant: "info",
      });
    }
  };
}
