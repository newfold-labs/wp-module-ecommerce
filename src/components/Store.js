import { __ } from "@wordpress/i18n";
import { QuickLook } from "./QuickLook";
import { Section } from "./Section";
import { WooCommerceUnavailable } from "./WooCommerceUnavailable";
import { YITHPlugins } from "./YITHPlugins";

export function Store(props) {
  return (
    <>
      <Section.Container>
        <Section.Header title={__("Store", "wp-module-ecommerce")} />
        <WooCommerceUnavailable {...props} />
        <QuickLook {...props} />
      </Section.Container>
      <YITHPlugins {...props} />
    </>
  );
}
