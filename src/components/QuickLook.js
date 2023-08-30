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
} from "@newfold/ui-component-library";
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

const individualOrderLink = (postId) =>
  `post.php?${new URLSearchParams({
    post: postId,
    action: "edit",
  })}`;

function RecentReport({ title, filter, onSelect, disabled, children }) {
  return (
    <Card className={`nfd-flex-1`}>
      <Card.Content className={"nfd-flex nfd-flex-col nfd-gap-4"}>
        <div
          className={classNames(
            "max-[360px]:nfd-flex-col max-[360px]:nfd-items-stretch",
            "sm:nfd-flex sm:nfd-flex-row sm:nfd-items-baseline"
          )}
        >
          <Title className="nfd-flex-1" size={4}>
            {title}
          </Title>
          <Select
            id={title}
            className={classNames("lg:nfd-w-1/4", "sm:nfd-w-2/5")}
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
        <div className="nfd-flex-1 nfd-flex nfd-items-center nfd-text-center nfd-justify-center">
          <Spinner size={8} className="nfd-text-primary" />
        </div>
      )}
      {cards.length > 0 && (
        <>
          <div
            className={classNames(
              "nfd-flex-1 nfd-grid nfd-gap-4",
              "sm:nfd-grid-cols-1",
              "md:nfd-grid-cols-2"
            )}
          >
            {cards.map((cardConfig) => {
              let { Card, name, ...props } = cardConfig;
              return <Card key={name} {...props} />;
            })}
          </div>
          <Link
            className="nfd-text-base nfd-no-underline nfd-w-fit"
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
    className: "nfd-bg-[--nfd-ecommerce-bg-danger] nfd-text-white",
  },
  refunded: {
    text: "Refunded",
    className: "nfd-bg-[--nfd-ecommerce-bg-danger] nfd-text-white",
  },
  failed: { text: "Failed", className: "nfd-bg-[--nfd-ecommerce-bg-danger] nfd-text-white" },
};

function OrderStatus(props) {
  const { variant, className, text } = StatusToTextMapping[props.status] ?? {};
  return (
    <Badge variant={variant} className={classNames("nfd-w-fit", className)}>
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
        <div className="nfd-flex-1 nfd-items-center nfd-text-center nfd-justify-center">
          <Spinner size={8} className="nfd-text-primary" />
        </div>
      )}
      {!orders.isLoading && orders.data.length === 0 && (
        <div
          className={classNames(
            "nfd-flex-1 nfd-h-full",
            "nfd-flex nfd-flex-col nfd-flex-wrap nfd-items-center nfd-gap-4",
            "nfd-p-4 nfd-pb-0"
          )}
        >
          <NoOrdersFallback className="nfd-flex-2" />
          <p className="nfd-flex-1">
            {__(
              "No orders yet. When you start getting orders, they will show up here.",
              "wp-module-ecommerce"
            )}
          </p>
        </div>
      )}
      {!orders.isLoading && orders.data?.length > 0 && (
        <>
          <ul className="nfd-flex-1">
            {orders.data?.map((order) => (
              <Card
                as="a"
                key={order.id}
                href={RuntimeSdk.adminUrl(individualOrderLink(order.id))}
                className="focus:nfd-mb-[2px]"
              >
                <Card.Content
                  className={classNames(
                    "nfd-grid nfd-grid-cols-2 nfd-gap-y-2 nfd-items-center",
                    "nfd-text-sm nfd-text-[--nfd-ecommerce-text-info]"
                  )}
                >
                  <Title
                    size={4}
                    className="nfd-leading-normal nfd-text-[--nfd-ecommerce-text-info]"
                  >
                    {order.billing.first_name || "Guest"}{" "}
                    {order.billing.last_name}
                  </Title>
                  <p className="nfd-text-base nfd-justify-self-end">
                    {formatMoney({
                      cost: Number(order.total),
                      currency: order.currency,
                      currencyDisplay: "symbol",
                    })}
                  </p>
                  <p>
                    {dateI18n("F j, Y, g:i a", new Date(order.date_created))}
                  </p>
                  <p className="nfd-justify-self-end">
                    #{String(order.id).padStart(6, "0")}
                  </p>
                  <OrderStatus status={order.status} />
                </Card.Content>
              </Card>
            ))}
          </ul>
          <Link
            className="nfd-text-base nfd-no-underline nfd-w-fit"
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
      className={"nfd-p-0 hide-html"}
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
          <div
            className={classNames(
              "nfd-mt-10 nfd-gap-6",
              "nfd-flex nfd-flex-col",
              "xl:nfd-flex-row"
            )}
          >
            <RecentActivity />
            <RecentOrders />
          </div>
          <div className="nfd-h-4" />
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
