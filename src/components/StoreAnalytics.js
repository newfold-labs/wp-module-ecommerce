import { dateI18n } from "@wordpress/date";
import { useState } from "@wordpress/element";
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
import { WooCommerceSdk } from "../sdk/woocommerce";
import { Section } from "./Section";
import { SiteStatus } from "./SiteStatus";
import { useCardManager } from "./useCardManager";
import { useInstallWoo } from "./useInstallWoo";

let storeAnalyticsLink = `admin.php?${new URLSearchParams({
  page: "wc-admin",
  path: "/analytics/overview",
  return_to_nfd: "/home/store/",
})}`;

function RecentReport({ title, filter, onSelect, disabled, children }) {
  return (
    <Card className={`yst-flex-1`}>
      <Card.Content className={"yst-flex yst-flex-col yst-gap-4"}>
        <div className="yst-flex yst-items-baseline">
          <Title className="yst-w-3/4" size={4}>
            {title}
          </Title>
          <Select
            id={title}
            disabled={disabled}
            onChange={(newFilter) => {
              if (newFilter !== filter) {
                onSelect(newFilter);
              }
            }}
            options={[
              { label: "Today", value: "today" },
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
    revalidateOnFocus: false,
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
          <div className="yst-flex-1 yst-grid yst-grid-cols-2 yst-gap-4">
            {cards.map((cardConfig) => {
              let { Card, name, ...props } = cardConfig;
              return <Card key={name} {...props} />;
            })}
          </div>
          <Link
            className="yst-text-base"
            href="admin.php?page=wc-admin&path=%2Fanalytics%2Frevenue"
          >
            view all
          </Link>
        </>
      )}
    </RecentReport>
  );
}

function RecentOrders() {
  let [filter, onSelect] = useState("week");
  let orders = useSWR(
    `recent-orders-${filter}`,
    () => WooCommerceSdk.orders(filter),
    { revalidateOnFocus: false }
  );
  return (
    <RecentReport title="Recent Orders" filter={filter} onSelect={onSelect}>
      {orders.isLoading && (
        <div className="yst-flex-1 yst-items-center yst-text-center yst-justify-center">
          <Spinner size={8} className="yst-text-primary" />
        </div>
      )}
      {true && (
        <div className="yst-flex-1 yst-justify-center yst-h-full">
          <NoOrdersFallback className="yst-h-[70%]" />
        </div>
      )}
      {false && (
        <>
          <ul className="yst-flex-1">
            {orders.data?.map((order) => (
              <Card as="li" key={order.id}>
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
                    {order.billing.first_name} {order.billing.last_name}
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
                  <Badge className="yst-w-fit">{order.status}</Badge>
                </Card.Content>
              </Card>
            ))}
          </ul>
          <Link
            className="yst-text-base"
            href="edit.php?post_type=shop_order"
            target="_blank"
          >
            view all
          </Link>
        </>
      )}
    </RecentReport>
  );
}

export function StoreAnalytics(props) {
  let shouldUpsell = props.plugins.details?.woocommerce.status !== "active";
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
          <div className="yst-flex yst-mt-10 yst-gap-6">
            <RecentActivity />
            <RecentOrders />
          </div>
          <div className="yst-h-4" />
          <SiteStatus
            comingSoon={props.state.wp.comingSoon}
            siteUrl={props.user?.site.url}
            toggleComingSoon={props.actions.toggleComingSoon}
          />
        </Section.Block>
      </Section.Content>
    </FeatureUpsell>
  );
}
