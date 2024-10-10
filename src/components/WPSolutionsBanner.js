import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button, Spinner } from "@newfold/ui-component-library";
import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import useSWR from "swr";
import { myPluginsAndToolsPageLink, solutionButtonTextObject, wpSolutionsPromotedPluginsList } from "../constants";
import { ReactComponent as RightArrow } from "../icons/right-arrow.svg";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { PluginsSdk } from "../sdk/plugins";
import { NoExistingPlan } from "./NoExistingPlan";
import { Section } from "./Section";


export function WPSolutionsBanner() {
        
    const entitlementsEndPoint = NewfoldRuntime.createApiUrl("/newfold-solutions/v1/entitlements");
    const [ error, setError ] = useState(null);
    const [ apiResponse, setApiResponse ] = useState(null);
    const [ isLoaded, setIsLoaded ] = useState( false );
    const [ purchasedSolution, setPurchasedSolution] = useState(null)
    const [ availableSolutions, setAvailableSolutions] = useState([]);
    const [ pluginActiveStatusArray, setPluginActiveStatusArray] = useState([]);
    let currentSolution = [];    

    //TODO: To add slug information for all premium plugins once data is available
    let premiumPluginStatus = useSWR(
        "nfd_slug_wonder_cart",
        () =>
          PluginsSdk.queries
            .status("nfd_slug_wonder_cart", "sensei-lms", "wp-seo", "yith-woocommerce-affiliates", "yith-woocommerce-booking", "yith-woocommerce-points-and-rewards", "yith-woocommerce-wishlist", "yith-woocommerce-advanced-reviews", "yith-woocommerce-dynamic-pricing-and-discounts")
            .then(res => {                
                setPluginActiveStatusArray(res?.details)
            }),
        { refreshInterval: 30 * 1000 }
      );  
    
    const routeChange = () =>{ 
        location.href = myPluginsAndToolsPageLink;
    }

    useEffect( () => {
        apiFetch( { url: `${ entitlementsEndPoint }` } ).then(
            ( result ) => {
                setIsLoaded(true);                
                setApiResponse(result)
                setPurchasedSolution(result['solution']) 
                setAvailableSolutions(result['solutions'])                                
            },
            ( error ) => {
                setIsLoaded(true);                
                setError(error);
            }
        );
    }, [] );
        
    if ( error ) {
        //Uncomment below line, to debug error in API response
        //console.log(error.message, "error");
        return (
            <div className="nfd-flex nfd-p-6 nfd-bg-white nfd-w-full nfd-rounded-lg nfd-text-red-700">
              <ExclamationTriangleIcon className="nfd-w-[24px] nfd-h-[24px]" />
              <span className="nfd-ml-1.5">{__("Oops! something went wrong. Please try again later", "wp-module-ecommerce")}</span>
            </div>
        );
    } 
    else if (!isLoaded){
        return (
            <div className="nfd-flex nfd-items-center nfd-text-center nfd-justify-center nfd-h-full">
              <Spinner size="8" className="nfd-text-primary" />
            </div>
          );
    } 
    else if (apiResponse) {
        if (purchasedSolution === null) {
            return (<NoExistingPlan availableSolutions={availableSolutions} />);
        }    
        else{
                currentSolution = purchasedSolution === "WP_SOLUTION_CREATOR" ? 
                wpSolutionsPromotedPluginsList[0]['WP_SOLUTION_CREATOR'] : 
                purchasedSolution === "WP_SOLUTION_SERVICE" ? 
                wpSolutionsPromotedPluginsList[0]['WP_SOLUTION_SERVICE'] :  wpSolutionsPromotedPluginsList[0]['WP_SOLUTION_COMMERCE'];
                let solutionsCards = Object.values(currentSolution);                           
                return(   
                            <Section.Container className="nfd-container">
                                <Section.Header 
                                    title={__("Explore Your Plugins and Tools", "wp-module-ecommerce")} 
                                    subTitle={__("Improve your site with the tools and services included in your plan.", "wp-module-ecommerce")} 
                                    secondaryAction={{title : __( `View ${solutionButtonTextObject[purchasedSolution]} tools`, "wp-module-ecommerce" ), className: false, onClick: routeChange }} 
                                />
                                <Section.Content className="nfd-app-section-home">     
                                    <div className="nfd-flex nfd-flex-row nfd-flex-wrap">                
                                        {
                                            solutionsCards?.map((details, index) => {                                                
                                                return (<div key="index" className={"nfd-flex nfd-flex-col nfd-bg-[#F1F5F7] nfd-p-6 nfd-rounded-lg nfd-border nfd-border-[#E2E8F0] nfd-box-content "+ (index === 0 ? "nfd-w-[38.33%] nfd-mr-6 nfd-mb-6" : index === 1 ? "nfd-w-6/12 nfd-mb-6" : index === 2 ? "nfd-w-6/12 nfd-mr-6" : "nfd-w-[38.33%]") }>                        
                                                            <h2 className="nfd-text-[#0F172A] nfd-text-lg nfd-leading-5 nfd-font-semibold nfd-mb-4">
                                                                { __(`${details['title']}`,"wp-module-ecommerce") }
                                                            </h2>
                                                            <p className="nfd-text-[#0F172A] nfd-text-lg nfd-leading-5 nfd-font-normal nfd-mb-10">
                                                                { __(`${details['description']}`,"wp-module-ecommerce") }                                                                
                                                            </p>                                                            
                                                            {   
                                                                details.plsSlug !== "" ? 
                                                                Object.entries(pluginActiveStatusArray).map(([slug, { status, url }]) => (
                                                                    details.plsSlug === slug ?
                                                                        status === "active" ?                                                                         
                                                                        <Button className="nfd-button nfd-button--primary nfd-mt-9 nfd-mt-auto nfd-self-start" as="a" href={url}>
                                                                            { __(`${details['buttonText']}`,"wp-module-ecommerce") }                                                               
                                                                            <RightArrow className="nfd-mt-2.5" />
                                                                        </Button>        
                                                                        :
                                                                        status === "need_to_install" || "installing" ? 
                                                                        <Button 
                                                                        className="nfd-button nfd-button--primary nfd-mt-9 nfd-mt-auto nfd-self-start" 
                                                                        as="button" 
                                                                        data-nfd-installer-plugin-slug={slug} 
                                                                        data-nfd-installer-plugin-provider={details.plsProviderName} 
                                                                        data-nfd-installer-plugin-activate={true}
                                                                        data-nfd-installer-plugin-name={details.name}
                                                                        data-nfd-installer-plugin-url={url}
                                                                        data-nfd-installer-plugin-storage-key={details.storageKey}
                                                                        isLoading={status==="installing"}
                                                                        >
                                                                            { status==="installing" ? __("Installing","wp-module-ecommerce") :  __("Install","wp-module-ecommerce") }                                                               
                                                                            <RightArrow className="nfd-mt-2.5" />
                                                                        </Button>  : null
                                                                    :
                                                                    null
                                                                ))
                                                                : 
                                                                <Button className="nfd-button nfd-button--primary nfd-mt-9 nfd-mt-auto nfd-self-start" as="button" disabled={true}>
                                                                    { __(`${details['buttonText']}`,"wp-module-ecommerce") }                                                               
                                                                    <RightArrow className="nfd-mt-2.5" />
                                                                </Button>
                                                            }
                                                        </div>)   
                                            })
                                        }
                                    </div>   

                                    <Button as="a" href={myPluginsAndToolsPageLink} className="nfd-button nfd-button--secondary nfd-flex nfd-w-56 nfd-mx-auto nfd-mt-3">
                                        {__(`View all ${solutionButtonTextObject[purchasedSolution]} tools`, "wp-module-ecommerce")}
                                    </Button>     
                                </Section.Content>
                            </Section.Container>
                        )                    
        }    
       
    }
}