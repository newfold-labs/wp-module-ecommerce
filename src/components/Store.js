import { __ } from "@wordpress/i18n";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { QuickLook } from "./QuickLook";
import { Section } from "./Section";
import { SiteStatus } from "./SiteStatus";
import { WooCommerceUnavailable } from "./WooCommerceUnavailable";

export function Store(props) {
  return (
    <>
      <Section.Container>
        <Section.Header title={__("Store", "wp-module-ecommerce")} />
        <WooCommerceUnavailable {...props} />
        <QuickLook {...props} />
        {NewfoldRuntime.hasCapability("isEcommerce") &&
          true &&
          <Section.Content className={"nfd-pt-0"}>
            <Section.Block>
              <SiteStatus
                comingSoon={props.state.wp.comingSoon}
                notify={props.wpModules.notify}
                toggleComingSoon={props.actions.toggleComingSoon}
              />
            </Section.Block>
          </Section.Content>
        }
      </Section.Container>
    </>
  );
}
