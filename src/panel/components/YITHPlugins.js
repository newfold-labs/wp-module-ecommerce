import { Button, Modal, Spinner } from "@newfold/ui-component-library";
import apiFetch from "@wordpress/api-fetch";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import classNames from "classnames";
import { YITHPluginsDefinitions } from "../configs/YITHPlugins.config";
import { solutionsLink } from "../constants";
import lightchest from '../icons/light-chest.svg';
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { LoadingPanel } from "./LoadingPanel";
import { Section } from "./Section";
import { useCardManager } from "./useCardManager";
import { YithFeatureCard } from "./YithFeatureCard";

export function YITHPlugins({ wpModules }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pluginName, setPluginName] = useState("");
  const [yithProducts, setYithProducts] = useState([]);
  let anyPluginActive = 0;
  const hasSolution = NewfoldRuntime.hasCapability("hasSolution");
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
        primaryUrl: window.NewfoldRuntime?.linkTracker?.addUtmParams("admin.php?page=bluehost#/store/sales_discounts") || "admin.php?page=bluehost#/store/sales_discounts"
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
    { refreshInterval: 10 * 1000, isPaused: () => false }
  );

  cards.map(card => {
    card.state?.isActive ? anyPluginActive = anyPluginActive + 1 : null;
  })

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
        updatedObject.primaryUrl = window.NewfoldRuntime?.linkTracker?.addUtmParams(product.primaryUrl) || product.primaryUrl;
        setYithPluginsMap(yithPluginsMap.set(String(product.id), updatedObject), ...yithPluginsMap);
      }
      )

  }, [yithProducts])

  return (
    <Section.Container id="ecommerce-features-wrapper" className={"nfd-border nfd-rounded-xl nfd-pt-0" + (cards.length !== 0 && anyPluginActive <= 0 ? " nfd-border-amber-300" : null) + (!(NewfoldRuntime.isWoo) ? 'nfd--mt-12' : '')}>
      <div className={(anyPluginActive <= 0 ? "nfd-p-4 " : "nfd-p-4 nfd-pb-0 ") + "nfd-flex  nfd-flex-col md:nfd-flex-row nfd-justify-between nfd-gap-6 nfd-items-center"}>
        {cards.length !== 0 && anyPluginActive <= 0 ? <img
          src={lightchest}
          className="nfd-w-48 nfd-text-[--nfd-ecommerce-text-dark]"
        /> : null}
        <div className="nfd-flex nfd-flex-col nfd-gap-3">
          <h2 className="nfd-font-medium nfd-text-base">
            {cards.length !== 0 && anyPluginActive <= 0 ? __("Elevate Your Store with Exclusive WooCommerce Tools Included in Your Plan!", "wp-module-ecommerce") :
              __("Exclusive Tools Included in Your Plan", "wp-module-ecommerce")}
          </h2>
          {__(
            "Unlock the full power of your plan with access to a range of exclusive WooCommerce tools powered by \nYITH. Enhance your store and keep your customers coming back for more!",
            "wp-module-ecommerce"
          )}
          {
            hasSolution && (<Button as="a" href={window.NewfoldRuntime?.linkTracker?.addUtmParams(solutionsLink) || solutionsLink } className="nfd-button nfd-button--secondary nfd-flex  nfd-self-end nfd-ml-auto">
            {__( "View all your plugins and tools", "wp-module-ecommerce" )}
            </Button>)
          }
        </div>
      </div>
      <Section.Content className={"nfd-pt-4 nfd-pl-4 nfd-pr-4"}>
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
                  wpModules={wpModules}
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
        <Modal.Panel className="nfd-p-0 nfd-overflow-visible" hasCloseButton={false}>
          <div className="wppbh-app-sidenav nfd-p-5 nfd-max-h-[70vh] nfd-overflow-y-auto">
            <LoadingPanel pluginName={pluginName} />
          </div>
        </Modal.Panel>
      </Modal>
    </Section.Container>
  );
}
