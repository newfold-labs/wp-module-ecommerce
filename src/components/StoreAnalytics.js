import { useState } from "@wordpress/element";
import { FeatureUpsell, Select, Title } from "@yoast/ui-library";
import Reports from "../configs/Reports.config";
import { Section } from "./Section";
import { SiteStatus } from "./SiteStatus";
import { useCardManager } from "./useCardManager";
import { useInstallWoo } from "./useInstallWoo";

let storeAnalyticsLink = `admin.php?${new URLSearchParams({
  page: "wc-admin",
  path: "/analytics/overview",
  return_to_nfd: "/home/store/",
})}`;

function RecentReport({ title, onSelect, className = "", children }) {
  return (
    <div
      className={`yst-flex-1 yst-bg-white yst-rounded-lg yst-border yst-border-solid yst-border-line yst-p-4 ${className}`}
    >
      <div className="yst-pb-4 yst-flex yst-items-center">
        <Title className="yst-w-3/4" size={4}>
          {title}
        </Title>
        <Select
          id={title}
          onChange={onSelect}
          className="yst-w-1/4"
          options={[
            { label: "Week to date", value: "week" },
            { label: "Month to date", value: "month" },
          ]}
        />
      </div>
      {children}
    </div>
  );
}

function RecentActivity() {
  let [filter, setFilter] = useState("week");
  let [cards, onRefresh] = useCardManager(Reports(filter));
  return (
    <RecentReport
      title="Recent Activity"
      onSelect={() => {
        setFilter("week");
      }}
    >
      <div className="yst-grid yst-grid-cols-2 yst-gap-4">
        {cards.map((cardConfig) => {
          let { Card, name, ...props } = cardConfig;
          return <Card key={name} {...props} />;
        })}
      </div>
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
            <RecentReport title={"Recent Orders"} onSelect={() => {}} />
          </div>
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
