import { __ } from "@wordpress/i18n";
import { Modal, Spinner } from "@newfold/ui-component-library";
import { YITHPluginsDefinitions } from "../configs/YITHPlugins.config";
import { Section } from "./Section";
import { useCardManager } from "./useCardManager";
import classNames from "classnames";
import { useEffect, useState } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { YithFeatureCard } from "./YithFeatureCard";
import lightchest from '../icons/light-chest.svg';
import { LoadingPanel } from "./LoadingPanel";

export function YITHPlugins({ woo, wpModules }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pluginName, setPluginName] = useState("");
  const [yithPluginsMap, setYithPluginsMap] = useState(new Map([
    [
      "f7834881-f5df-43ab-9c7e-c4e6969f5606",
      {
        title: "nfd_slug_yith_woocommerce_gift_cards",
        primaryUrl: ""
      },
    ],
    [
      "93c942e4-36fb-46be-867b-5f0d014adb22",
      {
        title: "nfd_slug_yith_woocommerce_wishlist",
        primaryUrl: ""
      },
    ],
    [
      "wondercart",
      {
        title: "nfd_slug_wonder_cart",
        primaryUrl: "admin.php?page=bluehost#/store/sales_discounts"
      },
    ],
    [
      "fc4cbc14-470d-471b-b448-c6666e5b763d",
      {
        title: "nfd_slug_yith_woocommerce_booking",
        primaryUrl: ""
      },
    ],
    [
      "c7025d24-a05a-4f01-bca7-5c9bcd17bb76",
      {
        title: "nfd_slug_yith_woocommerce_ajax_product_filter",
        primaryUrl: ""
      },
    ],
    [
      "e307cb8f-24b5-46e1-81e3-83de32c62c78",
      {
        title: "yith-woocommerce-ajax-search",
        name: "Product Search",
        primaryUrl: ""
      },
    ],
    [
      "58701f50-cb5c-4b39-b030-edadf4af6f97",
      {
        title: "nfd_slug_yith_woocommerce_customize_myaccount_page",
        primaryUrl: ""
      },
    ],
    [
      "ecodash",
      {
        title: "nfd_slug_ecomdash_wordpress_plugin",
        primaryUrl: ""
      },
    ]
  ]));
  let [cards] = useCardManager(
    YITHPluginsDefinitions({ notify: wpModules.notify }),
    { refreshInterval: 10 * 1000, isPaused: () => !woo.isActive }
  );
  const [yithProducts, setYithProducts] = useState([]);
  useEffect(() => {
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

  useEffect(() => {
    yithProducts?.filter((product) => yithPluginsMap.has(product.id))
      .forEach((product) => {
        let updatedObject = yithPluginsMap.get(product.id);
        updatedObject.primaryUrl = product.primaryUrl;
        setYithPluginsMap(yithPluginsMap.set(String(product.id), updatedObject), ...yithPluginsMap);
      }
      )

  }, [yithProducts])


  if (!woo.isActive) {
    return null;
  }

  return (
    <Section.Container id="ecommerce-features-wrapper" className={"nfd-border nfd-border-amber-300 nfd-rounded-xl nfd-pt-0"}>
      <div className="nfd-flex nfd-p-8 nfd-flex-row nfd-justify-between nfd-gap-6 nfd-items-center">
        <img
          src={lightchest}
          className="nfd-w-48 nfd-text-[--nfd-ecommerce-text-dark]"
        />
        <div className="nfd-flex nfd-flex-col nfd-gap-3">
          <h2 className="nfd-font-medium nfd-text-base">
            {__("Elevate Your Store with Exclusive WooCommerce Tools Included in Your Plan!", "wp-module-ecommerce")}
          </h2>
          {__(
            "Unlock the full power of your plan with access to a range of exclusive WooCommerce tools powered by \nYITH. Enhance your store and keep your customers coming back for more!",
            "wp-module-ecommerce"
          )}
        </div>
      </div>
      <Section.Content>
        {cards.length === 0 && (
          <div className="nfd-flex nfd-items-center nfd-text-center nfd-justify-center nfd-h-60">
            <Spinner size="8" className="nfd-text-primary" />
          </div>
        )}
        <div
          className={classNames(
            "nfd-grid nfd-gap-5",
            "sm:nfd-grid-cols-1",
            "md:nfd-grid-cols-2",
            "lg:nfd-grid-cols-3"
          )}
          id="ecommerce-features-container"
        >
          {Array.from(yithPluginsMap.keys())
            .map((product) => {
              return (
                <YithFeatureCard
                  key={product}
                  id={product}
                  setIsOpen={setIsOpen}
                  setPluginName={setPluginName}
                  yithPluginsMap={yithPluginsMap}
                  cards={cards}
                />
              );
            })}
        </div>
      </Section.Content>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="wppbh-app-sidenav-mobile nfd-z-40"
        initialFocus
      >
        <Modal.Panel className="nfd-p-0 nfd-overflow-visible">
          <div className="wppbh-app-sidenav nfd-p-5 nfd-max-h-[70vh] nfd-overflow-y-auto">
            <LoadingPanel pluginName={pluginName} />
          </div>
        </Modal.Panel>
      </Modal>
    </Section.Container>
  );
}
