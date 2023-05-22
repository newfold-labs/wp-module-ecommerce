import { __ } from "@wordpress/i18n";
import { Button, Title } from "@yoast/ui-library";
import useSWRMutation from "swr/mutation";
import { queuePluginInstall, syncPluginInstall } from "../services";
import { Section } from "./Section";

export function WooCommerceUnavailable({ plugins, user, wpModules }) {
  let { notify } = wpModules;
  let isWooActive = plugins.details?.woocommerce.status === "active";
  let needsSyncInstall = plugins.details?.woocommerce.status === "need_to_install";
  let isWCInQueue = plugins.queue?.some(
    (queue) => queue.slug === "woocommerce"
  );
  let installWooCommerce = useSWRMutation("install-woo", async () => {
    let response = needsSyncInstall
      ? await syncPluginInstall("woocommerce", user.install_token)
      : await queuePluginInstall("woocommerce", user.install_token);
    if (response !== "failed") {
      await plugins.refresh();
    } else {
      notify.push("woo-failure", {
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
  if (isWooActive) {
    return null;
  }
  let showInProgress = isInstalling || isWCInQueue;
  return (
    <Section.Content separator>
      <div className="yst-bg-canvas yst-rounded-lg yst-border yst-border-solid yst-border-line">
        <div className="yst-px-4 yst-py-2 yst-flex yst-items-center yst-rounded-lg">
          <div className="yst-flex-1">
            <Title size={4} className="yst-leading-normal">
              {__("Add a store to your site", "wp-module-ecommerce")}
            </Title>
            <span className="yst-whitespace-pre-wrap">
              {__(
                "Adding a store to your website is quick and easy!\nJust install WooCommerce and get ready to start making money!",
                "wp-module-ecommerce"
              )}
            </span>
          </div>
          <div className="yst-flex-none">
            <Button
              type="button"
              variant="upsell"
              isLoading={showInProgress}
              onClick={installWooCommerce.trigger}
            >
              {__("Install WooCommerce", "wp-module-ecommerce")}
            </Button>
          </div>
        </div>
      </div>
    </Section.Content>
  );
}
