import { Button } from "@newfold/ui-component-library";
import { wpSolutionsPluginsList } from "../constants"
import { __ } from "@wordpress/i18n";
import { AnalyticsSdk } from "../sdk/analytics";
import { useEffect, useState } from "@wordpress/element";


export function WPSolutionsBanner() {

    let purchasedSolution = "services";
    
    let [solutionsCards, setSolutionsCards] = useState([{}]);

    let currentSolution = [];

    currentSolution = purchasedSolution === "creator" ? 
                    wpSolutionsPluginsList[0]['creator'] : 
                    purchasedSolution === "services" ? 
                    wpSolutionsPluginsList[0]['services'] : 
                    purchasedSolution === "ecommerce" ?
                    wpSolutionsPluginsList[0]['ecommerce'] : wpSolutionsPluginsList[0]['none'];

    //console.log(Object.values(currentSolution), "currentSolution");    

    useEffect(() => {    
        let tempSolutionsCards = Object.values(currentSolution);
        //console.log(tempSolutionsCards, "tempSolutionsCards");     

        setSolutionsCards(tempSolutionsCards);           
    }, [purchasedSolution]);


    //console.log(solutionsCards, Array.isArray(solutionsCards), "solutionsCards");

    return(        
        <div className="nfd-app-section-container nfd-bg-white nfd-w-full nfd-rounded-lg" id="wpsolutions-plugins-wrapper">        
            
            <div class="nfd-flex nfd-flex-col nfd-mt-5 nfd-pt-0.5">
                <h1 className="nfd-text-2xl nfd-leading-9 nfd-font-medium nfd-text-[#111729]">
                    {__("Explore Your Plugins and Tools", "wp-module-ecommerce")}
                </h1>
                    <p className="nfd-leading-5 nfd-text-[#4A5567]">
                    {__("Improve your site with the tools and services included in your plan.", "wp-module-ecommerce")}
                </p>
            </div>

            <div className="nfd-flex nfd-flex-col">                
                {
                    solutionsCards.map((details) => {
                        return (<div>                        
                                    <h2>{details['title']}</h2>
                                    <p>{details['description']}</p>
                                    <Button>
                                        {details['buttonText']}
                                    </Button>
                                </div>)   
                    })
                }
            </div>
        </div>
    )
}