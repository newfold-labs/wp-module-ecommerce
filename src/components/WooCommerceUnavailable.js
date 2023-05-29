import { __ } from "@wordpress/i18n";
import { Button, Title } from "@yoast/ui-library";
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
