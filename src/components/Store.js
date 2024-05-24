import { __ } from "@wordpress/i18n";
import { QuickLook } from "./QuickLook";
import { Section } from "./Section";
import { WooCommerceUnavailable } from "./WooCommerceUnavailable";
import { useEffect } from "@wordpress/element";

export function Store(props) {

  useEffect(() => {
    if (document.querySelector(".nfd-feature-upsell")) {
      const child = document.querySelector(".nfd-feature-upsell > div");  
      child.classList.remove("nfd-grayscale") 
    }
    
  }, []);

  return (
    <>
      <Section.Container>
        <Section.Header title={__("Store", "wp-module-ecommerce")} />
        <WooCommerceUnavailable {...props} />
        <QuickLook {...props} />
      </Section.Container>
    </>
  );
}
