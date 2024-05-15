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
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
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

function RecentReport({ title, divname, filter, onSelect, disabled, children }) {
  return (
    <Card className={`nfd-flex-1`} id={`${divname}-report-wrapper`}>
      <Card.Content className={"nfd-flex nfd-flex-col nfd-gap-4"}>
        <div
          className={classNames(
            "max-[360px]:nfd-flex-col max-[360px]:nfd-items-stretch",
            "sm:nfd-flex sm:nfd-flex-row sm:nfd-items-baseline"
          )}
        >
          <Title className="nfd-flex-1" size="4">
            {title}
          </Title>
          <Link
            className="nfd-text-base nfd-no-underline nfd-w-fit nfd-pr-2"
            href={RuntimeSdk.adminUrl(recentActivityLink, true)}
          >
            {__("View all analytics", "wp-module-ecommerce")}
          </Link>
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
              { label: __("Today", "wp-module-ecommerce"), value: "day" },
              { label: __("Week to date", "wp-module-ecommerce"), value: "week" },
              { label: __("Month to date", "wp-module-ecommerce"), value: "month" },
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
    <RecentReport title={__("Recent Activity", "wp-module-ecommerce")} filter={filter} onSelect={onSelect} divname="recent-activity">
      {cards.length === 0 && (
        <div className="nfd-flex-1 nfd-flex nfd-items-center nfd-text-center nfd-justify-center">
          <Spinner size="8" className="nfd-text-primary" />
        </div>
      )}
      {cards.length > 0 && (
        <>
          <span className="nfd-whitespace-pre-wrap nfd-leading-tight">
            {cards[0]?.state?.reportValue === "-" && __("Once you launch your store, you'll see a snapshot of recent purchases and other \ncustomer activity here.", "wp-module-ecommerce")}
          </span>
          <div
            className={classNames(
              "nfd-flex-1 nfd-grid nfd-gap-4",
              "sm:nfd-grid-cols-1",
              "md:nfd-grid-cols-4"
            )}
          >
            {cards.map((cardConfig) => {
              let { Card, name, ...props } = cardConfig;
              return <Card key={name} {...props} />;
            })}
          </div>
        </>
      )}
    </RecentReport>
  );
}

const StatusToTextMapping = {
  pending: { text: __("Pending Payment", "wp-module-ecommerce"), variant: "plain" },
  processing: { text: __("Processing", "wp-module-ecommerce"), variant: "plain" },
  "on-hold": { text: __("On hold", "wp-module-ecommerce"), variant: "upsell" },
  completed: { text: __("Completed", "wp-module-ecommerce"), variant: "info" },
  cancelled: {
    text: __("Cancelled", "wp-module-ecommerce"),
    className: "nfd-bg-[--nfd-ecommerce-bg-danger] nfd-text-white",
  },
  refunded: {
    text: __("Refunded", "wp-module-ecommerce"),
    className: "nfd-bg-[--nfd-ecommerce-bg-danger] nfd-text-white",
  },
  failed: { text: __("Failed", "wp-module-ecommerce"), className: "nfd-bg-[--nfd-ecommerce-bg-danger] nfd-text-white" },
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
    <RecentReport title={__("Recent Orders", "wp-module-ecommerce")} filter={filter} onSelect={onSelect} divname="recent-orders">
      {orders.isLoading && (
        <div className="nfd-flex-1 nfd-items-center nfd-text-center nfd-justify-center">
          <Spinner size="8" className="nfd-text-primary" />
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
                    size="4"
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
            {__("view all", "wp-module-ecommerce")}
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
      className={"hide-html"}
      shouldUpsell={shouldUpsell}
      variant="card"
      cardText={__("Install WooCommerce to unlock", "wp-module-ecommerce")}
      as="button"
      disabled={isInstalling}
      onClick={installWoo}
      id="install-woocommerce-to-unlock-btn"
    >
      <Section.Content className={"nfd-pt-4"} subClassName={"nfd-pb-4"}>
        <Section.Block>
          <div
            className={classNames(
              "nfd-flex nfd-flex-col",
              "xl:nfd-flex-row"
            )}
          >
            <RecentActivity />
          </div>
        </Section.Block>
      </Section.Content>
    </FeatureUpsell>
  );
}
