import { __ } from "@wordpress/i18n";
import { Button, FeatureUpsell, Title } from "@yoast/ui-library";
import useSWR from "swr";
import { wcPluginStatusParser } from "../configs/selectors";
import { ReactComponent as WonderCartUpsell } from "../icons/wonder-cart-upsell.svg";
import { PluginsSdk } from "../sdk/plugins";
import { Section } from "./Section";
import { useInstallWonderCart } from "./useInstallWonderCart";
import classNames from "classnames";

let wonderCartParser = wcPluginStatusParser("nfd_slug_wonder_cart");

export function WonderCart(props) {
  let wonderCartStatus = useSWR(
    "nfd_slug_wonder_cart-status",
    () =>
      PluginsSdk.queries
        .status("woocommerce", "nfd_slug_wonder_cart")
        .then(wonderCartParser),
    { refreshInterval: 30 * 1000 }
  );
  let [installWonderCart, isInstalling] = useInstallWonderCart(props);
  if (wonderCartStatus.isLoading) {
    return <span />;
  }
  if (wonderCartStatus.data?.isInstalled) {
    return <div id="wonder-cart-init" />;
  }
  let showInProgress = isInstalling || wonderCartStatus.data?.isInstalling;
  return (
    <Section.Container>
      <Section.Header title={__("Sales & Discounts", "wp-module-ecommerce")} />
      <Section.Content>
        <div className="yst-bg-canvas yst-rounded-lg yst-border yst-border-solid yst-border-line">
          <div
            className={classNames(
              "yst-px-4 yst-py-2 yst-rounded-lg",
              "max-[425px]:yst-flex max-[425px]:yst-flex-col",
              "min-[426px]:yst-flex min-[426px]:yst-items-center"
            )}
          >
            <div className="yst-flex-1">
              <Title size={4} className="yst-leading-normal">
                {__(
                  "Add Upsells, Cross-sells, and other Promotions to your store",
                  "wp-module-ecommerce"
                )}
              </Title>
              <span className="yst-whitespace-pre-wrap">
                {__(
                  "Create and manage deals, sales promotions and upsell campaigns like Buy-One-Get-One and more.",
                  "wp-module-ecommerce"
                )}
              </span>
            </div>
            <div className="yst-flex-none">
              <Button
                type="button"
                variant="upsell"
                isLoading={showInProgress}
                onClick={installWonderCart}
              >
                {__("Install now", "wp-module-ecommerce")}
              </Button>
            </div>
          </div>
        </div>
      </Section.Content>
      <FeatureUpsell
        className="hide-html"
        shouldUpsell
        variant="card"
        cardText="Install now"
        as="button"
        disabled={showInProgress}
        onClick={installWonderCart}
      >
        <WonderCartUpsell />
      </FeatureUpsell>
    </Section.Container>
  );
}
