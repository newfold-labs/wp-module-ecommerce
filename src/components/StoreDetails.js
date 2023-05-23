import { __ } from "@wordpress/i18n";
import { Section } from "./Section";

export function StoreDetails(props) {
  return (
    <Section.Container>
      <Section.Header
        title={__("Store Details", "wp-module-ecommerce")}
        subTitle={__(
          "This is the place for all your general store details and setup.",
          "wp-module-ecommerce"
        )}
      />
      <Section.Content>
      </Section.Content>
    </Section.Container>
  );
};

