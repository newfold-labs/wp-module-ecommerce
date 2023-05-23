import { __ } from "@wordpress/i18n";
import { Section } from "./Section";
import { StoreAnalytics } from "./StoreAnalytics";
import { WooCommerceUnavailable } from "./WooCommerceUnavailable";
import { YITHPlugins } from "./YITHPlugins";

export function Home(props) {
  return (
    <>
      <Section.Container>
        <Section.Header title={__("Store", "wp-module-ecommerce")} />
        <WooCommerceUnavailable {...props} />
        <StoreAnalytics {...props} />
      </Section.Container>
      <YITHPlugins {...props} />
    </>
  );
}
