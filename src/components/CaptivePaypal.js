import { Badge, Button, Title } from "@yoast/ui-library";
import classNames from "classnames";
import { ReactComponent as AmexBrand } from "../icons/brands/amex.svg";
import { ReactComponent as DiscoverBrand } from "../icons/brands/discover.svg";
import { ReactComponent as GiroPayBrand } from "../icons/brands/giropay.svg";
import { ReactComponent as IdealBrand } from "../icons/brands/ideal.svg";
import { ReactComponent as MasterCardBrand } from "../icons/brands/mastercard.svg";
import { ReactComponent as PaypalBrand } from "../icons/brands/paypal.svg";
import { ReactComponent as SofortBrand } from "../icons/brands/sofort.svg";
import { ReactComponent as VenmoBrand } from "../icons/brands/venmo.svg";
import { ReactComponent as VisaBrand } from "../icons/visa.svg";
import { RuntimeSdk } from "../sdk/runtime";
import { Section } from "./Section";
import { ThirdPartyIntegration } from "./ThirdPartyIntegration";

const CaptivePaypal = ({ notify }) => {
  if (!RuntimeSdk.brandSettings.setup.payment.includes("Paypal")) {
    return null;
  }
  return (    
    <Section.Content separator>
      <ThirdPartyIntegration
        id="paypal"
        title={__("Payment Processors", "wp-module-ecommerce")}
        description={__(
          "Choose a service that your customers will use to process their payments in return for your products and services.",
          "wp-module-ecommerce"
        )}
        notify={notify}
      >
        {({ integrationStatus, onConnect, isInstalling }) => {
          const isSetupComplete = integrationStatus?.complete;
          const environment = integrationStatus?.details?.environment;
            const paypalSettingsWrapper = {
                color: "#5B5B5B", 
                fontSize: "13px", 
                lineHeight: "15.5px"                
            }
            const paypalSettingSubtitles = {
                lineHeight: "19px"
            }
            const paypalSettingList = {
                "listStyle": "disc", 
                "paddingLeft": "1.25rem"
            }    
          return (            
            <div className="yst-border yst-p-6">
              <div className="yst-flex yst-justify-between yst-mb-8">                                
                  <>
                    {isSetupComplete ? (
                    <div className="yst-flex yst-justify-between">
                        <PaypalBrand />             
                        <Button
                            variant="secondary"
                            as="a"
                            href={integrationStatus?.integration?.plugin?.url}
                        >
                            {__("Manage", "wp-module-ecommerce")}
                        </Button>
                        {environment && (
                                <div className="yst-flex yst-gap-4 yst-mt-4">
                                <span>{__("Environment:", "wp-module-ecommerce")}</span>
                                <Badge
                                    size="large"
                                    variant={environment === "sandbox" ? "upsell" : "plain"}
                                    className={classNames(
                                    "yst-text-sm yst-capitalize",
                                    environment === "live" &&
                                        "yst-bg-[#178113] yst-text-white"
                                    )}
                                >
                                    {environment}
                                </Badge>
                                </div>
                        )}
                    </div>   
                    ) : (                      
                            <div className="yst-space-y-4" style={paypalSettingsWrapper}>    
                                <div className="yst-flex yst-justify-between">
                                    <PaypalBrand /> 
                                    {!isInstalling ? (
                                        <Button onClick={onConnect}>
                                            {__("Connect", "wp-module-ecommerce")}
                                        </Button>
                                        ):(
                                        <Button variant="secondary" isLoading={isInstalling}>
                                            {__("Installing...", "wp-module-ecommerce")}
                                        </Button>
                                    )}
                                </div>            
                                <br />
                                <p>Online payments built for success. We help you do business in 200+ markets and 100+ currencies—even if your customers don't have PayPal.</p>
                                
                                <Title size="3" style={paypalSettingSubtitles}>Provides flexible checkout options</Title>
                                <ul style={paypalSettingList}>
                                    <li>PayPal Pay Later</li>
                                    <li>White-Labeling</li>
                                    <li>Country-specific payment methods</li>
                                </ul>
                                
                                <Title size="3" style={paypalSettingSubtitles}>Uses many popular payment methods</Title>        
                                <div className="yst-flex yst-items-end yst-gap-2">
                                    <VisaBrand />
                                    <MasterCardBrand />
                                    <AmexBrand />
                                    <DiscoverBrand />
                                    <VenmoBrand />
                                    <IdealBrand />
                                    <GiroPayBrand />
                                    <SofortBrand />
                                </div>                                    
                            </div>  
                    )}
                  </>
                
              </div>                            
            </div>
          );
        }}
      </ThirdPartyIntegration>
    </Section.Content>
  );
};

export default CaptivePaypal;