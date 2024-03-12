import { __ } from "@wordpress/i18n";
import { Button, Title } from "@newfold/ui-component-library";
import { Section } from "./Section";
import { useInstallWoo } from "./useInstallWoo";

export function WooCommerceUnavailable(props) {
  let [installWoo, isInstalling] = useInstallWoo(props);
  if (props.woo.isActive) {
    return null;
  }
  let showInProgress = isInstalling || props.woo.isInstalling;
  return (
    <Section.Content>
      <div className="nfd-bg-canvas nfd-rounded-lg nfd-border nfd-border-solid nfd-border-line">
        <div className="nfd-px-4 nfd-py-2 nfd-flex nfd-items-center nfd-rounded-lg">
          <div className="nfd-flex-1">
            <Title size="4" className="nfd-leading-normal">
              {__("Add a store to your site", "wp-module-ecommerce")}
            </Title>
            <span className="nfd-whitespace-pre-wrap">
              {__(
                "Adding a store to your website is quick and easy!\nJust install WooCommerce and get ready to start making money!",
                "wp-module-ecommerce"
              )}
            </span>
          </div>
          <div className="nfd-flex-none">
            <Button
              type="button"
              variant="upsell"
              isLoading={showInProgress}
              onClick={installWoo}
            >
              {__("Install WooCommerce", "wp-module-ecommerce")}
            </Button>
          </div>
        </div>
      </div>
    </Section.Content>
  );
}
