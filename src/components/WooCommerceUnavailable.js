import { __ } from "@wordpress/i18n";
import { Button, Modal, Title } from "@yoast/ui-library";
import useSWRMutation from "swr/mutation";
import { queuePluginInstall, syncPluginInstall } from "../services";
import { Section } from "./Section";

export function WooCommerceUnavailable({ plugins, user }) {
  let isWooActive = plugins.status?.woocommerce === "Active";
  let needsSyncInstall = plugins.status?.woocommerce === "Not Installed";
  let isWCInQueue = plugins?.status?.["queue-status"]?.some(
    (queue) => queue.slug === "woocommerce"
  );

  let installWooCommerce = useSWRMutation("install-woo", async () => {
    let response = needsSyncInstall
      ? await syncPluginInstall("woocommerce", plugins.token)
      : await queuePluginInstall("woocommerce", plugins.token);
    if (response !== "failed") {
      await plugins.refresh();
    }
  });
  let isInstalling = needsSyncInstall
    ? installWooCommerce.isMutating
    : installWooCommerce.isMutating || installWooCommerce.data !== undefined;
  let installationFailed = installWooCommerce.data === "failed";
  if (isWooActive) {
    return null;
  }
  if (installationFailed && !isInstalling) {
    return (
      <Modal isOpen onClose={installWooCommerce.reset}>
        <Modal.Description className="yst-bg-white yst-w-[900px] yst-shadow-md yst-py-6">
          <div className="yst-text-center yst-grid yst-grid-flow-row yst-auto-rows-min">
            <Title size={1}>
              {__("We hit a snag...", "wp-module-ecommerce")}
            </Title>
            <span className="yst-mt-3">
              {__(
                "We're sorry, but there was an error installing WooCommerce, please try again.",
                "wp-module-ecommerce"
              )}
            </span>
            <Button
              type="submit"
              disabled={plugins.token === undefined}
              onClick={() => {
                installWooCommerce.reset();
                installWooCommerce.trigger();
              }}
              size="large"
            >
              {__("Try again", "wp-module-ecommerce")}
            </Button>
            <span className="yst-mt-2">
              {__(" If the problem persists, please ", "wp-module-ecommerce")}
              <a href={user?.currentBrandConfig?.support} target="_blank">
                {__("contact", "wp-module-ecommerce")}
              </a>
              {__(" support team.", "wp-module-ecommerce")}
            </span>
          </div>
        </Modal.Description>
      </Modal>
    );
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
