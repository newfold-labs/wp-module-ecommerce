import { __ } from "@wordpress/i18n";
import { AdvancedFeatures } from "./AdvancedFeatures";
import { Block } from "./Block";
import { SectionHeader } from "./SectionHeader";
import { SiteStatus } from "./SiteStatus";
import { WooCommerceUnavailable } from "./WooCommerceUnavailable";

export function Home(props) {
  return (
    <>
      <Block title={__("Store", "wp-module-ecommerce")}>
        <WooCommerceUnavailable {...props} />
        <SectionHeader
          title="Quick Look"
          subtitle="Once you launch your store, you'll see a snapshot of recent purchases and other customer activity."
        >
          <SiteStatus
            comingSoon={props.state.wp.comingSoon}
            siteUrl={props.user?.site.url}
            toggleComingSoon={props.actions.toggleComingSoon}
          />
        </SectionHeader>
      </Block>
      <Block
        title={__("Additional Features", "wp-module-ecommerce")}
        subtitle={__(
          "Improve your store with these powerful add-ons.",
          "wp-module-ecommerce"
        )}
      >
        <AdvancedFeatures {...props} />
      </Block>
    </>
  );
}
