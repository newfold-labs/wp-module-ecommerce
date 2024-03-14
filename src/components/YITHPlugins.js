import { __ } from "@wordpress/i18n";
import { Spinner } from "@newfold/ui-component-library";
import { YITHPluginsDefinitions } from "../configs/YITHPlugins.config";
import { Section } from "./Section";
import { useCardManager } from "./useCardManager";
import classNames from "classnames";
import { useEffect, useState } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { YithFeatureCard } from "./YithFeatureCard";
import filter from "../icons/brands/yith-woocommerce-ajax-product-filter.svg";
import search from "../icons/brands/yith-woocommerce-ajax-search.svg";
import booking from "../icons/brands/yith-woocommerce-booking.svg";
import customizeAccount from "../icons/brands/yith-woocommerce-customize-myaccount-page.svg";
import gift from "../icons/brands/yith-woocommerce-gift-card.svg";
import wishList from "../icons/brands/yith-woocommerce-wishlist.svg";
import { RuntimeSdk } from "../sdk/runtime";

export function YITHPlugins({ woo, wpModules }) {
  const isBluehost = RuntimeSdk?.brandSettings?.brand?.includes("bluehost");
  const yithPluginsMap = new Map([
    [
      "fc4cbc14-470d-471b-b448-c6666e5b763d",
      {
        title: "nfd_slug_yith_woocommerce_booking",
        name: "YITH Booking and Appointment for WooCommerce",
        learnMore: RuntimeSdk.brandSettings.nfd_slug_yith_woocommerce_booking,
        image: booking,
      },
    ],
    [
      "e307cb8f-24b5-46e1-81e3-83de32c62c78",
      {
        title: "yith-woocommerce-ajax-search",
        name: "YITH WooCommerce AJAX Search",
        image: search,
      },
    ],
    [
      "93c942e4-36fb-46be-867b-5f0d014adb22",
      {
        title: "nfd_slug_yith_woocommerce_wishlist",
        name: "YITH WooCommerce Wishlist",
        learnMore: RuntimeSdk.brandSettings.nfd_slug_yith_woocommerce_wishlist,
        image: wishList,
      },
    ],
    [
      "c7025d24-a05a-4f01-bca7-5c9bcd17bb76",
      {
        title: "nfd_slug_yith_woocommerce_ajax_product_filter",
        name: "YITH WooCommerce Ajax Product Filter",
        learnMore: RuntimeSdk.brandSettings.nfd_slug_yith_woocommerce_ajax_product_filter,
        image: filter,
      },
    ],
    [
      "f7834881-f5df-43ab-9c7e-c4e6969f5606",
      {
        title: "nfd_slug_yith_woocommerce_gift_cards",
        name: "YITH WooCommerce Gift Cards",
        learnMore: RuntimeSdk.brandSettings.nfd_slug_yith_woocommerce_gift_cards,
        image: gift,
      },
    ],
    [
      "58701f50-cb5c-4b39-b030-edadf4af6f97",
      {
        title: "nfd_slug_yith_woocommerce_customize_myaccount_page",
        name: "YITH WooCommerce Customize My Account Page",
        learnMore: RuntimeSdk.brandSettings.nfd_slug_yith_woocommerce_customize_myaccount_page,
        image: customizeAccount,
      },
    ],
  ]);
  let [cards] = useCardManager(
    YITHPluginsDefinitions({ notify: wpModules.notify }),
    { refreshInterval: 10 * 1000, isPaused: () => !woo.isActive }
  );
  const [yithProducts, setYithProducts] = useState([]);
  useEffect( () => {
    const fecthApi = async () => {
      const data = await apiFetch({
        url: NewfoldRuntime.createApiUrl("/newfold-marketplace/v1/marketplace"),
      });
      setYithProducts(
        data?.products?.data.filter(
          (product) =>
            product.categories?.includes("eCommerce") &&
            product.categories?.length === 1
        )
      );
    }
    fecthApi()
  }, []);
  if (!woo.isActive) {
    return null;
  }

  return (
    <Section.Container>
      <Section.Header
        title={__("eCommerce Features", "wp-module-ecommerce")}
        subTitle={__(
          "Improve your store with these powerful add-ons.",
          "wp-module-ecommerce"
        )}
      />
      <Section.Content>
        {cards.length === 0 && (
          <div className="nfd-flex nfd-items-center nfd-text-center nfd-justify-center nfd-h-60">
            <Spinner size="8" className="nfd-text-primary" />
          </div>
        )}
        <div
          className={classNames(
            "nfd-grid nfd-gap-6",
            "sm:nfd-grid-cols-1",
            "md:nfd-grid-cols-2",
            "lg:nfd-grid-cols-3"
          )}
        >
          {yithProducts
            ?.filter((product) => yithPluginsMap.has(product.id))
            .map((product) => {
              return (
                <YithFeatureCard
                  key={product.id}
                  id={product.id}
                  yithProducts={product}
                  yithPluginsMap={yithPluginsMap}
                  cards={cards}
                />
              );
            })}
        </div>
      </Section.Content>
    </Section.Container>
  );
}
