import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { NewfoldRuntime } from "@newfold-labs/wp-module-runtime";
import { Button, Spinner } from "@newfold/ui-component-library";
import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { wpSolutionsPluginsList } from "../constants";
import { ReactComponent as RightArrow } from "../icons/right-arrow.svg";
import { NoExistingPlan } from "./NoExistingPlan";
import { Section } from "./Section";

//TODO: To removed once actual API response is available.
import { solutionsMockAPIResponse } from "../constants";


export function WPSolutionsBanner() {
    /**
     * 
     * TODO: To be tested with actual API call response. 
     * Code built using sample API response shared in this PR - https://github.com/newfold-labs/wp-module-solutions/pull/2
     * 
     **/
        
    const entitlementsEndPoint = NewfoldRuntime.createApiUrl("/newfold-solutions/v1/entitlements");
    const [ error, setError ] = useState(null);
    const [ mySolution, setMySolution ] = useState(null);
    const [ isLoaded, setIsLoaded ] = useState( false );
    const [ purchasedSolution, setPurchasedSolution] = useState(null)
    const [ availableSolutions, setAvailableSolutions] = useState([]);
    const [solutionsCards, setSolutionsCards] = useState([{}]);
    let currentSolution = [];


    const myPluginsAndToolsPageLink = `${window.location.href.split('#')[0]}#/my_plugins_and_tools`;
    const routeChange = () =>{ 
        location.href = myPluginsAndToolsPageLink;
    }

    useEffect( () => {
        apiFetch( { path: `${ entitlementsEndPoint }` } ).then(
            ( result ) => {
                setIsLoaded(true);
                setMySolution(result);
                setPurchasedSolution(mySolution.solution) 
                if (purchasedSolution === null) {
                    //TODO: Once actual API response is available, remove line nos. 47 & uncomment line nos. 48
                    setAvailableSolutions(solutionsMockAPIResponse?.solutions)
                    //setAvailableSolutions(mysolutions.solutions)
                }                
            },
            ( error ) => {
                setIsLoaded(true);                
                setError(error);
            }
        );
    }, [] );

    if ( error ) {
        console.log(error.message, "error");
        return (
            <div className="nfd-flex nfd-p-6 nfd-bg-white nfd-w-full nfd-rounded-lg nfd-text-[#FF0000]">
              <ExclamationTriangleIcon className="nfd-w-[24px] nfd-h-[24px]" />
              <span className="nfd-ml-1.5">{__("Oops! something went wrong. Please try again later", "wp-module-ecommerce")}</span>
            </div>
        );
    } else if (!isLoaded){
        return (
            <div className="nfd-flex nfd-items-center nfd-text-center nfd-justify-center nfd-h-full">
              <Spinner size="8" className="nfd-text-primary" />
            </div>
          );
    } else if (mySolution) {
        if (purchasedSolution === null) {
            return (<NoExistingPlan availableSolutions={availableSolutions} />);
        }
        else{
                currentSolution = purchasedSolution === "Creator" ? 
                wpSolutionsPluginsList[0]['Creator'] : 
                purchasedSolution === "Agency" ? 
                wpSolutionsPluginsList[0]['Agency'] : 
                purchasedSolution === "Commerce" ?
                wpSolutionsPluginsList[0]['Commerce'] : wpSolutionsPluginsList[0]['none'];

                let tempSolutionsCards = Object.values(currentSolution);
                setSolutionsCards(tempSolutionsCards);                          
                return(   
                            <Section.Container className="nfd-container">
                                <Section.Header 
                                    title={__("Explore Your Plugins and Tools", "wp-module-ecommerce")} 
                                    subTitle={__("Improve your site with the tools and services included in your plan.", "wp-module-ecommerce")} 
                                    secondaryAction={{title : __( "View all your plugins and tools", "wp-module-ecommerce" ), className: false, onClick: routeChange }} 
                                />
                                <Section.Content className="nfd-app-section-home">     
                                    <div className="nfd-flex nfd-flex-row nfd-flex-wrap">                
                                        {
                                            solutionsCards.map((details, index) => {
                                                return (<div className={"nfd-flex nfd-flex-col nfd-bg-[#F1F5F7] nfd-m-3 nfd-p-6 nfd-rounded-lg nfd-border nfd-border-[#E2E8F0] nfd-box-content "+ (index === 0 || index === 3 ? "nfd-w-[474px]" : "nfd-w-[300px]") }>                        
                                                            <h2 className="nfd-text-[#0F172A] nfd-text-lg nfd-leading-5 nfd-font-semibold nfd-mb-4">
                                                                { __(`${details['title']}`,"wp-module-ecommerce") }
                                                            </h2>
                                                            <p className="nfd-text-[#0F172A] nfd-text-lg nfd-leading-5 nfd-font-normal nfd-mb-10">
                                                                { __(`${details['description']}`,"wp-module-ecommerce") }                                                                
                                                            </p>
                                                            <Button className="nfd-button nfd-button--primary nfd-mt-9 nfd-mt-auto nfd-self-start" as="a" href="">
                                                                { __(`${details['buttonText']}`,"wp-module-ecommerce") }                                                               
                                                                <RightArrow className="nfd-mt-2.5" />
                                                            </Button>
                                                        </div>)   
                                            })
                                        }
                                    </div>   
                                    <Button as="a" href={myPluginsAndToolsPageLink} className="nfd-button nfd-button--secondary nfd-flex nfd-w-56 nfd-mx-auto nfd-mt-3">
                                        {__("View all your plugins and tools", "wp-module-ecommerce")}
                                    </Button>     
                                </Section.Content>
                            </Section.Container>
                        )
        }
        
    }
}