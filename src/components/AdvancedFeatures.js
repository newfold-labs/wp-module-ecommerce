import { __ } from "@wordpress/i18n";
import useSWR from "swr";
import { ReactComponent as Booking } from "../icons/booking.svg";
import { ReactComponent as CustomizeAccount } from "../icons/customize-account.svg";
import { ReactComponent as Filter } from "../icons/filter.svg";
import { ReactComponent as Search } from "../icons/search.svg";
import { ReactComponent as WishList } from "../icons/wishlist.svg";
import { ReactComponent as Gift } from "../icons/gift.svg";
import { Card } from "./Card";
import { DashboardContent } from "./DashboardContent";

const SuggestedPlugins = [
  {
    title: __("Manage bookable/rental products", "wp-module-ecommerce"),
    description: __(
      "Enable a booking/appointment system to manage renting or booking of services, rooms, houses.",
      "wp-module-ecommerce"
    ),
    pluginName: "yith-woocommerce-booking-extended",
    Icon: Booking,
  },
  {
    title: __("Add a powerful seach tool to your store", "wp-module-ecommerce"),
    description: __(
      "Allow your users to search products in real time by title, description, tags, and more.",
      "wp-module-ecommerce"
    ),
    pluginName: "yith-woocommerce-ajax-search",
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
    pluginName: "yith-woocommerce-wishlist-extended",
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
    pluginName: "yith-woocommerce-ajax-product-filter-extended/init",
    Icon: Filter,
  },
  {
    title: __("Sell Gift Cards in your store", "wp-module-ecommerce"),
    description: __(
      "Use gift cards to increase your earnings and attract new customers.",
      "wp-module-ecommerce"
    ),
    pluginName: "yith-woocommerce-gift-cards-extended/init",
    Icon: Gift,
  },
  {
    title: __("Customize your customers' account page", "wp-module-ecommerce"),
    description: __(
      "Show any kind of custom content in your customers' account page.",
      "wp-module-ecommerce"
    ),
    pluginName: "yith-woocommerce-customize-myaccount-page-extended/init",
    href: "/wp-admin/admin.php?page=yith_wcmap_panel",
    Icon: CustomizeAccount,
  },
];

export function AdvancedFeatures(props) {
  let { data, error } = useSWR("/wp/v2/plugins?status=active");
  if (!data) {
    return (
      <div style={{ height: "100%", display: "grid", placeContent: "center" }}>
        {error ? (
          <h2>There was an error while loading this information</h2>
        ) : (
          <div className="bwa-loader" />
        )}
      </div>
    );
  }
  let pluginsOnSite = data.reduce(
    (map, _) => ({ ...map, [_.plugin]: _.status }),
    {}
  );
  let installedPlugins = SuggestedPlugins.filter(
    (pluginDef) => pluginsOnSite[pluginDef.pluginName] === "active"
  );
  let unavailablePlugins = SuggestedPlugins.filter(
    (pluginDef) => pluginsOnSite[pluginDef.pluginName] !== "active"
  );
  return (
    <>
      {unavailablePlugins.length > 0 ? (
        <>
          <DashboardContent
            title="Advanced Features"
            subtitle="Enjoy the free add-ons included in your plan and improve your store."
          >
            <div className="nfd-ecommerce-extended-actions-container">
              {unavailablePlugins.map((plugin) => {
                let { Icon } = plugin;
                return (
                  <Card
                    key={plugin.pluginName}
                    variant="extended"
                    data-completed={false}
                    title={plugin.title}
                    action="Enable"
                    href={plugin.href ?? "Test"}
                    description={plugin.description}
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
          title="Already Installed Features"
          subtitle="These tools are already installed and activated and ready for use."
        >
          <div className="nfd-ecommerce-extended-actions-container">
            {installedPlugins.map((plugin) => {
              let { Icon } = plugin;
              return (
                <Card
                  key={plugin.pluginName}
                  variant="extended"
                  data-completed
                  title={plugin.title}
                  action="Manage"
                  href={plugin.href ?? "Test"}
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
