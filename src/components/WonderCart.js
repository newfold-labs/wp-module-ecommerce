import { __ } from "@wordpress/i18n";
import { Button, FeatureUpsell, Title } from "@newfold/ui-component-library";
import useSWR from "swr";
import { wcPluginStatusParser } from "../configs/selectors";
import { ReactComponent as WonderCartUpsell } from "../icons/wonder-cart-upsell.svg";
import { PluginsSdk } from "../sdk/plugins";
import { Section } from "./Section";
import { useInstallWonderCart } from "./useInstallWonderCart";
import classNames from "classnames";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";

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

  const canAccessGlobalCTB = NewfoldRuntime.hasCapability("canAccessGlobalCTB");
  const hasYithExtended = NewfoldRuntime.hasCapability("hasYithExtended");

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
        <div className="nfd-bg-canvas nfd-rounded-lg nfd-border nfd-border-solid nfd-border-line">
          <div
            className={classNames(
              "nfd-px-4 nfd-py-2 nfd-rounded-lg",
              "max-[425px]:nfd-flex max-[425px]:nfd-flex-col",
              "min-[426px]:nfd-flex min-[426px]:nfd-items-center"
            )}
          >
            <div className="nfd-flex-1">
              <Title size="4" className="nfd-leading-normal">
                {__(
                  "Add Upsells, Cross-sells, and other Promotions to your store",
                  "wp-module-ecommerce"
                )}
              </Title>
              <span className="nfd-whitespace-pre-wrap">
                {__(
                  "Create and manage deals, sales promotions and upsell campaigns like Buy-One-Get-One and more.",
                  "wp-module-ecommerce"
                )}
              </span>
            </div>
            <div className="nfd-flex-none">
              <Button
                type="button"
                as={canAccessGlobalCTB && !hasYithExtended ? "a" : "button"}
                data-ctb-id={
                  canAccessGlobalCTB && !hasYithExtended
                    ? "f95ccf1e-3028-4ea7-b2c2-847969348e8b"
                    : null
                }
                href={
                  canAccessGlobalCTB &&
                  !hasYithExtended &&
                  NewfoldRuntime.sdk.ecommerce.brand_settings.wondercartBuyNow
                }
                variant="upsell"
                isLoading={showInProgress}
                onClick={hasYithExtended && installWonderCart}
              >
                {canAccessGlobalCTB && !hasYithExtended
                  ? __("Buy now", "wp-module-ecommerce")
                  : __("Install now", "wp-module-ecommerce")}
              </Button>
            </div>
          </div>
        </div>
      </Section.Content>
      <FeatureUpsell
        className="hide-html"
        shouldUpsell
        variant="card"
        cardLink={
          canAccessGlobalCTB &&
          !hasYithExtended &&
          NewfoldRuntime.sdk.ecommerce.brand_settings.wondercartBuyNow
        }
        target="_blank"
        cardText={
          canAccessGlobalCTB && !hasYithExtended
            ? __("Buy now", "wp-module-ecommerce")
            : __("Install now", "wp-module-ecommerce")
        }
        as={canAccessGlobalCTB && !hasYithExtended ? "a" : "button"}
        disabled={showInProgress}
        data-ctb-id={
          canAccessGlobalCTB && !hasYithExtended
            ? "f95ccf1e-3028-4ea7-b2c2-847969348e8b"
            : null
        }
        onClick={hasYithExtended && installWonderCart}
      >
        <WonderCartUpsell />
      </FeatureUpsell>
    </Section.Container>
  );
}
