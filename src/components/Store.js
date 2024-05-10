import { __ } from "@wordpress/i18n";
import { QuickLook } from "./QuickLook";
import { Section } from "./Section";
import { WooCommerceUnavailable } from "./WooCommerceUnavailable";
import { YITHPlugins } from "./YITHPlugins";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime"
import { TransformtoEcommerce } from "../components/TransformtoEcommerce";

export function Store(props) {
  return (
    <>
      <Section.Container>
        <Section.Header title={__("Store", "wp-module-ecommerce")} />
        <WooCommerceUnavailable {...props} />
        <QuickLook {...props} />
        {NewfoldRuntime.hasCapability("isEcommerce") ? (<YITHPlugins {...props} />) : <TransformtoEcommerce /> }      
      </Section.Container>      
    </>
  );
}
