import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ReactComponent as Booking } from "../icons/booking.svg";
import { ReactComponent as CustomizeAccount } from "../icons/customize-account.svg";
import { ReactComponent as Filter } from "../icons/filter.svg";
import { ReactComponent as Gift } from "../icons/gift.svg";
import { ReactComponent as Search } from "../icons/search.svg";
import { ReactComponent as WishList } from "../icons/wishlist.svg";
import { queuePluginInstall, syncPluginInstall } from "../services";
import { Card } from "./Card";
import { DashboardContent } from "./DashboardContent";

const SuggestedPlugins = [
  {
    title: __("Manage bookable/rental products", "wp-module-ecommerce"),
    description: __(
      "Enable a booking/appointment system to manage renting or booking of services, rooms, houses.",
      "wp-module-ecommerce"
    ),
    slug: "yith_wcbk_panel",
    name: "nfd_slug_yith_woocommerce_booking",
    Icon: Booking,
  },
  {
    title: __("Add a powerful seach tool to your store", "wp-module-ecommerce"),
    description: __(
      "Allow your users to search products in real time by title, description, tags, and more.",
      "wp-module-ecommerce"
    ),
    slug: "yith_wcas_panel",
    name: "yith-woocommerce-ajax-search",
    sync: true,
    Icon: Search,
  },
  {
    title: __(
      "Allow your customers to save products in their Wishlist",
      "wp-module-ecommerce"
    ),
    description: __(
      "Make it easy for your customers to create lists and add their favorite items to them.",
      "wp-module-ecommerce"
    ),
    slug: "yith_wcwl_panel",
    name: "nfd_slug_yith_woocommerce_wishlist",
    Icon: WishList,
  },
  {
    title: __(
      "Add a powerful product filter to your store",
      "wp-module-ecommerce"
    ),
    description: __(
      "If your store has lots of products, help your customers find what they're looking for fast.",
      "wp-module-ecommerce"
    ),
    slug: "yith_wcan_panel",
    name: "nfd_slug_yith_woocommerce_ajax_product_filter",
    Icon: Filter,
  },
  {
    title: __("Sell Gift Cards in your store", "wp-module-ecommerce"),
    description: __(
      "Use gift cards to increase your earnings and attract new customers.",
      "wp-module-ecommerce"
    ),
    slug: "yith_woocommerce_gift_cards_panel",
    name: "nfd_slug_yith_woocommerce_gift_cards",
    Icon: Gift,
  },
  {
    title: __("Customize your customers' account page", "wp-module-ecommerce"),
    description: __(
      "Show any kind of custom content in your customers' account page.",
      "wp-module-ecommerce"
    ),
    slug: "yith_wcmap_panel",
    name: "nfd_slug_yith_woocommerce_customize_myaccount_page",
    Icon: CustomizeAccount,
  },
];

export function AdvancedFeatures({ plugins }) {
  let [inprogressInstalls, setInstalls] = useState([]);
  
  if (plugins.status === undefined) {
    return (
      <div style={{ height: "100%", display: "grid", placeContent: "center" }}>
        {plugins.errors ? (
          <h2>
            {__(
              "There was an error while loading this information",
              "wp-module-ecommerce"
            )}
          </h2>
        ) : (
          <div className="bwa-loader" />
        )}
      </div>
    );
  }
  let installedPlugins = SuggestedPlugins.filter(
    (pluginDef) => plugins.status?.[pluginDef.slug] === "Active"
  );
  let unavailablePlugins = SuggestedPlugins.filter(
    (pluginDef) => plugins.status?.[pluginDef.slug] !== "Active"
  );
  return (
    <>
      {unavailablePlugins.length > 0 ? (
        <>
          <DashboardContent
            title={__("Advanced Features", "wp-module-ecommerce")}
            subtitle={__(
              "Enjoy the free add-ons included in your plan and improve your store.",
              "wp-module-ecommerce"
            )}
          >
            <div className="nfd-ecommerce-extended-actions-container">
              {unavailablePlugins.map((plugin) => {
                let { Icon } = plugin;
                return (
                  <Card
                    key={plugin.slug}
                    variant="extended"
                    data-completed={false}
                    title={plugin.title}
                    action={__("Enable", "wp-module-ecommerce")}
                    status={
                      inprogressInstalls.includes(plugin.slug)
                        ? "inprogress"
                        : "ready"
                    }
                    description={plugin.description}
                    onClick={async () => {
                      setInstalls([...inprogressInstalls, plugin.slug]);
                      if (plugin.sync === true) {
                        await syncPluginInstall(plugin.name);
                      } else {
                        await queuePluginInstall(plugin.name, plugins.token);
                      }
                      await plugins.refresh();
                      setInstalls(
                        inprogressInstalls.filter((_) => _ !== plugin.slug)
                      );
                      window.location.href = `admin.php?page=${plugin.slug}`;
                    }}
                  >
                    <Icon />
                  </Card>
                );
              })}
            </div>
          </DashboardContent>
          <div style={{ height: "32px" }} />
        </>
      ) : null}
      {installedPlugins.length > 0 ? (
        <DashboardContent
          title={__("Already Installed Features", "wp-module-ecommerce")}
          subtitle={__(
            "These tools are already installed and activated and ready for use.",
            "wp-module-ecommerce"
          )}
        >
          <div className="nfd-ecommerce-extended-actions-container">
            {installedPlugins.map((plugin) => {
              let { Icon } = plugin;
              return (
                <Card
                  key={plugin.slug}
                  variant="extended"
                  data-completed
                  title={plugin.title}
                  action={__("Manage", "wp-module-ecommerce")}
                  href={`admin.php?page=${plugin.slug}`}
                  description={plugin.description}
                >
                  <Icon />
                </Card>
              );
            })}
          </div>
        </DashboardContent>
      ) : null}
    </>
  );
}
