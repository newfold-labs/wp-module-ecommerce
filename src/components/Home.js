import { __ } from "@wordpress/i18n";
import { Section } from "./Section";
import { SiteStatus } from "./SiteStatus";
import { WooCommerceUnavailable } from "./WooCommerceUnavailable";
import { YITHPlugins } from "./YITHPlugins";

export function Home(props) {
  return (
    <>
      <Section.Container>
        <Section.Header title={__("Store", "wp-module-ecommerce")} />
        <WooCommerceUnavailable {...props} />
        <Section.Content>
          <Section.Block
            title="Quick Look"
            subtitle="Once you launch your store, you'll see a snapshot of recent purchases and other customer activity."
          >
            <SiteStatus
              comingSoon={props.state.wp.comingSoon}
              siteUrl={props.user?.site.url}
              toggleComingSoon={props.actions.toggleComingSoon}
            />
          </Section.Block>
        </Section.Content>
      </Section.Container>
      <Section.Container>
        <Section.Header
          title={__("Additional Features", "wp-module-ecommerce")}
          subTitle={__(
            "Improve your store with these powerful add-ons.",
            "wp-module-ecommerce"
          )}
        />
        <Section.Content>
          <YITHPlugins {...props} />
        </Section.Content>
      </Section.Container>
    </>
  );
}
