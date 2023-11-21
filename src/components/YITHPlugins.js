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
      "faf0acf9-b5a0-479d-9cde-20fb5fa530f9",
      {
        title: "nfd_slug_yith_woocommerce_booking",
        name: "YITH Booking and Appointment for WooCommerce",
        learnMore:
          isBluehost &&
          "https://www.bluehost.com/help/article/yith-booking-and-appointment-for-woocommerce",
        image: booking,
      },
    ],
    [
      "c9201843-d8ae-4032-bd4e-f3fa5a8b8314",
      {
        title: "yith-woocommerce-ajax-search",
        name: "YITH WooCommerce AJAX Search",
        image: search,
      },
    ],
    [
      "4f17bd36-4a10-4324-89ec-b0c0bf951c6b",
      {
        title: "nfd_slug_yith_woocommerce_wishlist",
        name: "YITH WooCommerce Wishlist",
        learnMore:
          isBluehost &&
          "https://www.bluehost.com/help/article/yith-woocommerce-wishlist",
        image: wishList,
      },
    ],
    [
      "85a901f7-f919-4bd5-8717-8d0acbc8bb8d",
      {
        title: "nfd_slug_yith_woocommerce_ajax_product_filter",
        name: "YITH WooCommerce Ajax Product Filter",
        learnMore:
          isBluehost &&
          "https://www.bluehost.com/help/article/yith-woocommerce-ajax-product-filter",
        image: filter,
      },
    ],
    [
      "f6f20a00-01bd-45ec-8d63-28b4a018188a",
      {
        title: "nfd_slug_yith_woocommerce_gift_cards",
        name: "YITH WooCommerce Gift Cards",
        learnMore:
          isBluehost &&
          "https://www.bluehost.com/help/article/yith-woocommerce-gift-cards",
        image: gift,
      },
    ],
    [
      "7b490bad-380c-4e47-8b92-d78773f04f41",
      {
        title: "nfd_slug_yith_woocommerce_customize_myaccount_page",
        name: "YITH WooCommerce Customize My Account Page",
        learnMore:
          isBluehost &&
          "https://www.bluehost.com/help/article/yith-woocommerce-customize-my-account-page",
        image: customizeAccount,
      },
    ],
  ]);
  let [cards] = useCardManager(
    YITHPluginsDefinitions({ notify: wpModules.notify }),
    { refreshInterval: 10 * 1000, isPaused: () => !woo.isActive }
  );
  const [yithProducts, setYithProducts] = useState([]);
  useEffect(async () => {
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
  }, []);
  if (!woo.isActive) {
    return null;
  }

  return (
    <Section.Container>
      <Section.Header
        title={__("Additional Features", "wp-module-ecommerce")}
        subTitle={__(
          "Improve your store with these powerful add-ons.",
          "wp-module-ecommerce"
        )}
      />
      <Section.Content>
        {cards.length === 0 && (
          <div className="nfd-flex nfd-items-center nfd-text-center nfd-justify-center nfd-h-60">
            <Spinner size={8} className="nfd-text-primary" />
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
