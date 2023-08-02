import { dateI18n } from "@wordpress/date";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  Badge,
  Card,
  FeatureUpsell,
  Link,
  Select,
  Spinner,
  Title,
} from "@yoast/ui-library";
import classNames from "classnames";
import useSWR from "swr";
import Reports from "../configs/Reports.config";
import { ReactComponent as NoOrdersFallback } from "../icons/no-orders-fallback.svg";
import { formatMoney } from "../sdk/formatMoney";
import { RuntimeSdk } from "../sdk/runtime";
import { WooCommerceSdk } from "../sdk/woocommerce";
import { Section } from "./Section";
import { SiteStatus } from "./SiteStatus";
import { useCardManager } from "./useCardManager";
import { useInstallWoo } from "./useInstallWoo";

let recentActivityLink = `admin.php?${new URLSearchParams({
  page: "wc-admin",
  path: "/analytics/revenue",
})}`;

let recentOrdersLink = `edit.php?${new URLSearchParams({
  post_type: "shop_order",
})}`;

const individualOrderLink = (postId) => `post.php?${new URLSearchParams({
  post: postId,
  action: "edit"
})}`;

function RecentReport({ title, filter, onSelect, disabled, children }) {
  return (
    <Card className={`yst-flex-1`}>
      <Card.Content className={"yst-flex yst-flex-col yst-gap-4"}>
        <div className="yst-flex yst-items-baseline">
          <Title className="yst-flex-1" size={4}>
            {title}
          </Title>
          <Select
            id={title}
            className="lg:yst-w-1/4 sm:yst-w-1/2"
            disabled={disabled}
            onChange={(newFilter) => {
              if (newFilter !== filter) {
                onSelect(newFilter);
              }
            }}
            options={[
              { label: "Today", value: "day" },
              { label: "Week to date", value: "week" },
              { label: "Month to date", value: "month" },
            ]}
            value={filter}
          />
        </div>
        {children}
      </Card.Content>
    </Card>
  );
}

function RecentActivity() {
  let [filter, onSelect] = useState("week");
  let [cards] = useCardManager(Reports(filter), {
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
  return (
    <RecentReport title="Recent Activity" filter={filter} onSelect={onSelect}>
      {cards.length === 0 && (
        <div className="yst-flex-1 yst-flex yst-items-center yst-text-center yst-justify-center">
          <Spinner size={8} className="yst-text-primary" />
        </div>
      )}
      {cards.length > 0 && (
        <>
          <div className="yst-flex-1 yst-grid yst-gap-4 sm:yst-grid-cols-1 md:yst-grid-cols-2">
            {cards.map((cardConfig) => {
              let { Card, name, ...props } = cardConfig;
              return <Card key={name} {...props} />;
            })}
          </div>
          <Link
            className="yst-text-base yst-no-underline yst-w-fit"
            href={RuntimeSdk.adminUrl(recentActivityLink, true)}
          >
            view all
          </Link>
        </>
      )}
    </RecentReport>
  );
}

const StatusToTextMapping = {
  pending: { text: "Pending Payment", variant: "plain" },
  processing: { text: "Processing", variant: "plain" },
  "on-hold": { text: "On hold", variant: "upsell" },
  completed: { text: "Completed", variant: "info" },
  cancelled: {
    text: "Cancelled",
    className: "yst-bg-[#E01C1C] yst-text-white",
  },
  refunded: {
    text: "Refunded",
    className: "yst-bg-[#E01C1C] yst-text-white",
  },
  failed: { text: "Failed", className: "yst-bg-[#E01C1C] yst-text-white" },
};

function OrderStatus(props) {
  const { variant, className, text } = StatusToTextMapping[props.status] ?? {};
  return (
    <Badge variant={variant} className={classNames("yst-w-fit", className)}>
      {text ?? props.status}
    </Badge>
  );
}

function RecentOrders() {
  let [filter, onSelect] = useState("week");
  let orders = useSWR(
    `recent-orders-${filter}`,
    () => WooCommerceSdk.orders.list(filter),
    { revalidateOnFocus: false }
  );
  return (
    <RecentReport title="Recent Orders" filter={filter} onSelect={onSelect}>
      {orders.isLoading && (
        <div className="yst-flex-1 yst-items-center yst-text-center yst-justify-center">
          <Spinner size={8} className="yst-text-primary" />
        </div>
      )}
      {!orders.isLoading && orders.data.length === 0 && (
        <div
          className={classNames(
            "yst-flex-1 yst-h-full",
            "yst-flex yst-flex-col yst-flex-wrap yst-items-center yst-gap-4",
            "yst-p-4 yst-pb-0"
          )}
        >
          <NoOrdersFallback className="yst-flex-2" />
          <p className="yst-flex-1" >
            {__(
              "No orders yet. When you start getting orders, they will show up here.",
              "wp-module-ecommerce"
            )}
          </p>
        </div>
      )}
      {!orders.isLoading && orders.data?.length > 0 && (
        <>
          <ul className="yst-flex-1">
            {orders.data?.map((order) => (
              <Card as="a" key={order.id} href={RuntimeSdk.adminUrl(individualOrderLink(order.id))} className="focus:yst-mb-[2px]">
                <Card.Content
                  className={classNames(
                    "yst-grid yst-grid-cols-2 yst-gap-y-2 yst-items-center",
                    "yst-text-sm yst-text-[#495C77]"
                  )}
                >
                  <Title
                    size={4}
                    className="yst-leading-normal yst-text-[#495C77]"
                  >
                    {order.billing.first_name || "Guest"}{" "}
                    {order.billing.last_name}
                  </Title>
                  <p className="yst-text-base yst-justify-self-end">
                    {formatMoney({
                      cost: Number(order.total),
                      currency: order.currency,
                      currencyDisplay: "symbol",
                    })}
                  </p>
                  <p>
                    {dateI18n("F j, Y, g:i a", new Date(order.date_created))}
                  </p>
                  <p className="yst-justify-self-end">
                    #{String(order.id).padStart(6, "0")}
                  </p>
                  <OrderStatus status={order.status} />
                </Card.Content>
              </Card>
            ))}
          </ul>
          <Link
            className="yst-text-base yst-no-underline yst-w-fit"
            href={RuntimeSdk.adminUrl(recentOrdersLink)}
          >
            view all
          </Link>
        </>
      )}
    </RecentReport>
  );
}

export function QuickLook(props) {
  let shouldUpsell = !props.woo.isActive;
  let [installWoo, isInstalling] = useInstallWoo(props);
  return (
    <FeatureUpsell
      className={"yst-p-0 hide-html"}
      shouldUpsell={shouldUpsell}
      variant="card"
      cardText="Install WooCommerce to unlock"
      as="button"
      disabled={isInstalling}
      onClick={installWoo}
    >
      <Section.Content>
        <Section.Block
          title="Quick Look"
          subtitle="Once you launch your store, you'll see a snapshot of recent purchases and other customer activity."
        >
          <div className="yst-mt-10 yst-gap-6 yst-flex yst-flex-col md:yst-flex-row">
            <RecentActivity />
            <RecentOrders />
          </div>
          <div className="yst-h-4" />
          <SiteStatus
            comingSoon={props.state.wp.comingSoon}
            notify={props.wpModules.notify}
            toggleComingSoon={props.actions.toggleComingSoon}
          />
        </Section.Block>
      </Section.Content>
    </FeatureUpsell>
  );
}
