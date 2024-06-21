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
  //let showInProgress = isInstalling || wonderCartStatus.data?.isInstalling;
  return (
    <Section.Container>
      <Section.Header title={__('Sales & Promotions', "wp-module-ecommerce")} />
        <p>
          {__("Create custom upsell, cross-sell and other promotional campaigns to generate more sales.", "wp-module-ecommerce")}
        </p>
        <Section.Content>    
          <div className={"nfd-app-section-container nfd-bg-white nfd-w-full nfd-rounded-lg " + (!(NewfoldRuntime.isWoo) ? 'nfd--mt-12' : '')} id="nonecommerce-features-wrapper">        
              <div className="nfd-app-section-content nfd-border nfd-rounded-lg nfd-px-8 nfd-pt-0 nfd-pb-8 nfd--mt-2 nfd-items-start nfd-border-[#E2E8F0]">
                  <div className="nfd-flex md:nfd-flex-row nfd-flex-col nfd-gap-x-10">
                      <div className="nfd-flex-none nfd-mt-8 nfd-w-40">
                          <TransformStore />
                      </div>
                      <div>

                          <div class="nfd-flex nfd-flex-col nfd-mt-5 nfd-pt-0.5">
                          <h1 className="nfd-text-2xl nfd-leading-9 nfd-font-medium nfd-text-[#111729]">
                              {__("Start selling like a Pro!", "wp-module-ecommerce")}
                          </h1>
                              <p className="nfd-leading-5 nfd-text-[#4A5567]">
                              {__("Give your online store a boost with our all-in-one eCommerce bundle filled with exclusive plugins and tools designed to help you sell your products and services like never before. ", "wp-module-ecommerce")}
                          </p>
                      </div>
                          <div className="nfd-flex nfd-mt-8 nfd-self-end nfd-justify-end">
                          <Button
                              as="a"
                              className="nfd-button nfd-button--upsell nfd-w-40"
                              variant="upsell"
                              data-ctb-id={"f95ccf1e-3028-4ea7-b2c2-847969348e8b"}   
                              data-action="load-nfd-ctb"
                              target="_blank"
                              rel="noopener"
                              id="buy-ecommerce-addon-btn"
                          >
                              <LockIcon className="nfd-w-5 nfd-h-5 nfd--ml-1 nfd-shrink-0" />
                              {__("Buy Now", "wp-module-ecommerce")}
                          </Button>
                          </div>
                      </div>
                  </div>
                
                  <h2 className="nfd-text-lg nfd-font-medium nfd-mt-8 nfd-text-black">
                      {__("Add upsells, cross-sells, and other promotions with WonderCart", "wp-module-ecommerce")}
                  </h2>
                  <p className="nfd-leading-5 nfd-w-4/5 nfd-text-[#4A5567]">
                      {__("Create and run effective promotional campaigns like BOGOs, free shipping offers, category discounts, and more to increase revenue and strengthen customer engagement.", "wp-module-ecommerce")}
                  </p>
                  <div className="nfd-flex nfd-flex-wrap nfd-gap-6">
                      <div className="nfd-flex-1">
                          <div className="nfd-flex nfd-flex-wrap nfd-gap-x-10 nfd-mt-3 nfd-pt-0.5 nfd-w-3/4">
                              <ul className="nfd-flex-1 nfd-text-black">
                                  <li className="nfd-flex">
                                      <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                      <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("Buy One Get One", "wp-module-ecommerce")}</span>
                                  </li>
                                  <li className="nfd-flex">
                                      <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                      <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("Cart Promotions", "wp-module-ecommerce")}</span>
                                  </li>
                                  <li className="nfd-flex">
                                      <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                      <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("Related Items Discounts", "wp-module-ecommerce")}</span>
                                  </li>
                              </ul>
                              <ul className="nfd-flex-1 nfd-text-black">
                                  <li className="nfd-flex">
                                      <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                      <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("Free Shipping Offers", "wp-module-ecommerce")}</span>
                                  </li>
                                  <li className="nfd-flex">
                                      <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                      <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("Category Discounts", "wp-module-ecommerce")}</span>
                                  </li>
                                  <li className="nfd-flex">
                                      <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                      <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("and more!", "wp-module-ecommerce")}</span>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <div className="nfd-flex-none nfd-w-28 nfd-h-24 nfd-self-end">
                          <WonderCartIcon />
                      </div>
                  </div>

                  <div className="nfd-h-px nfd-mx-4 nfd-mt-5 nfd-mb--1 nfd-pt-0.5 nfd-bg-[#E2E8F0]">&nbsp;</div>

                  <h2 className="nfd-text-lg nfd-font-medium nfd-mt-8 nfd-text-black">
                      {__("Exclusive YITH plugins and tools to help you sell online", "wp-module-ecommerce")}
                  </h2>
                  <p className="nfd-leading-5 nfd-w-4/5 nfd-text-[#4A5567]">
                      {__("Our eCommerce bundle includes a comprehensive suite of advanced tools designed to boost the performance of your WooCommerce store. This bundle includes these exclusive YITH plugins:", "wp-module-ecommerce")}
                  </p>
                  <div className="nfd-flex nfd-flex-wrap nfd-gap-6">
                      <div className="nfd-flex-1">
                          <div className="nfd-flex nfd-flex-wrap nfd-gap-x-10 nfd-mt-3 nfd-pt-0.5 nfd-w-3/4">
                              <ul className="nfd-flex-1 nfd-text-black">
                                  <li className="nfd-flex">
                                      <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                      <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("Gift Cards", "wp-module-ecommerce")}</span>
                                  </li>
                                  <li className="nfd-flex">
                                      <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                      <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("Wishlists", "wp-module-ecommerce")}</span>
                                  </li>
                                  <li className="nfd-flex">
                                      <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                      <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("Custom 'My Account' Page", "wp-module-ecommerce")}</span>
                                  </li>
                              </ul>
                              <ul className="nfd-flex-1 nfd-text-black">
                                  <li className="nfd-flex">
                                      <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                      <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("Bookings & Appointments", "wp-module-ecommerce")}</span>
                                  </li>
                                  <li className="nfd-flex">
                                      <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                      <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("AJAX Product Filters", "wp-module-ecommerce")}</span>
                                  </li>
                                  <li className="nfd-flex">
                                      <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                      <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("AJAX Product Search", "wp-module-ecommerce")}</span>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <div className="nfd-flex-none nfd-w-28 nfd-h-24 nfd-self-end">
                          <YithPluginsIcon />
                      </div>
                  </div>
              </div>
          </div>
        </Section.Content>  
    </Section.Container>

    // <Section.Container>
    //   <Section.Header title={__('Sales & Promotions', "wp-module-ecommerce")} />
    //   <Section.Content>
    //     <div className="nfd-bg-canvas nfd-rounded-lg nfd-border nfd-border-solid nfd-border-line">
    //       <div
    //         className={classNames(
    //           "nfd-px-4 nfd-py-2 nfd-rounded-lg",
    //           "max-[425px]:nfd-flex max-[425px]:nfd-flex-col",
    //           "min-[426px]:nfd-flex min-[426px]:nfd-items-center"
    //         )}
    //       >
    //         <div className="nfd-flex-1">
    //           <Title size="4" className="nfd-leading-normal">
    //             {__(
    //               'Add Upsells, Cross-sells, and other Promotions to your store',
    //               "wp-module-ecommerce"
    //             )}
    //           </Title>
    //           <span className="nfd-whitespace-pre-wrap">
    //             {__(
    //               'Create and manage X-sell, Upsell, sales and promotions through campaigns to boost your sales',
    //               "wp-module-ecommerce"
    //             )}
    //           </span>
    //         </div>
    //         <div className="nfd-flex-none">
    //           <Button
    //             type="button"
    //             as={canAccessGlobalCTB && !hasYithExtended ? "a" : "button"}
    //             data-ctb-id={
    //               canAccessGlobalCTB && !hasYithExtended
    //                 ? "f95ccf1e-3028-4ea7-b2c2-847969348e8b"
    //                 : null
    //             }
    //             href={
    //               (canAccessGlobalCTB &&
    //                 !hasYithExtended &&
    //                 NewfoldRuntime.sdk.ecommerce.brand_settings.wondercartBuyNow) || ''
    //             }
    //             variant="upsell"
    //             isLoading={showInProgress}
    //             onClick={hasYithExtended ? installWonderCart : null}
    //             id={canAccessGlobalCTB && !hasYithExtended
    //               ? "buynow-wondercart"
    //               : "installnow-wondercart"}
    //           >
    //             {canAccessGlobalCTB && !hasYithExtended
    //               ? __('Buy now', "wp-module-ecommerce")
    //               : __('Install now', "wp-module-ecommerce")}
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //   </Section.Content>
    //   <FeatureUpsell
    //     className="hide-html"
    //     shouldUpsell
    //     variant="card"
    //     cardLink={
    //       (canAccessGlobalCTB &&
    //         !hasYithExtended &&
    //         NewfoldRuntime.sdk.ecommerce.brand_settings.wondercartBuyNow) || ''
    //     }
    //     target="_blank"
    //     cardText={
    //       canAccessGlobalCTB && !hasYithExtended
    //         ? __('Buy now', "wp-module-ecommerce")
    //         : __('Install now', "wp-module-ecommerce")
    //     }
    //     as={canAccessGlobalCTB && !hasYithExtended ? "a" : "button"}
    //     disabled={showInProgress}
    //     data-ctb-id={
    //       canAccessGlobalCTB && !hasYithExtended
    //         ? "f95ccf1e-3028-4ea7-b2c2-847969348e8b"
    //         : null
    //     }
    //     onClick={hasYithExtended ? installWonderCart : null}
    //   >
    //     <WonderCartUpsell />
    //   </FeatureUpsell>
    // </Section.Container>
  );
}
