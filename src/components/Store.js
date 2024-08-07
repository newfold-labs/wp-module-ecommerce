import { __ } from "@wordpress/i18n";
import { QuickLook } from "./QuickLook";
import { Section } from "./Section";
import { WooCommerceUnavailable } from "./WooCommerceUnavailable";
import { useEffect } from "@wordpress/element";
import { SiteStatus } from "./SiteStatus";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";

export function Store(props) {

  useEffect(() => {
    if (document.querySelector(".nfd-feature-upsell")) {
      const child = document.querySelector(".nfd-feature-upsell > div");  
      child.classList.remove("nfd-grayscale") 
      document.querySelector(".nfd-feature-upsell .nfd-absolute.nfd-justify-center").style.backgroundColor = "rgba(255, 255, 255, .5)"
    }    
  }, []);

  return (
    <>
      <Section.Container>
        <Section.Header title={__("Store", "wp-module-ecommerce")} />
        <WooCommerceUnavailable {...props} />
        <QuickLook {...props} />
        {NewfoldRuntime.hasCapability("isEcommerce") &&
          props.state.wp.comingSoon &&
          <Section.Content className={"nfd-pt-0"} subClassName={"nfd-pb-4"}>
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
