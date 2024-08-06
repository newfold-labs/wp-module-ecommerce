import { useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { onAnchorNavigate, onButtonNavigate } from "../sdk/hiiveEventsTracking";
import { QuickLook } from "./QuickLook";
import { Section } from "./Section";
import { SiteStatus } from "./SiteStatus";
import { WooCommerceUnavailable } from "./WooCommerceUnavailable";

export function Store(props) {

  useEffect(() => {
    if (document.querySelector(".nfd-feature-upsell")) {
      const child = document.querySelector(".nfd-feature-upsell > div");  
      child.classList.remove("nfd-grayscale") 
      document.querySelector(".nfd-feature-upsell .nfd-absolute.nfd-justify-center").style.backgroundColor = "rgba(255, 255, 255, .5)"
    }  

    const storeContainer = document.querySelector('#ecommerce-features-wrapper');

    const storeButtons = Array.from(
      storeContainer.querySelectorAll( 'button' )
    );
    const storeAnchors = Array.from( storeContainer.querySelectorAll( 'a' ) );

    if ( storeButtons.length ) {
      storeButtons.forEach( ( button ) => {
        button.addEventListener( 'click', onButtonNavigate );
        button.addEventListener( 'onkeydown', onButtonNavigate );      
      } );
    }

    if ( storeAnchors.length ) {
      storeAnchors.forEach( ( link ) => {
          link.addEventListener( 'click', onAnchorNavigate );
          link.addEventListener( 'onkeydown', onAnchorNavigate );      
      } );
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
