import { Button } from "@newfold/ui-component-library";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { wpSolutionsPluginsList } from "../constants";
import { ReactComponent as RightArrow } from "../icons/right-arrow.svg";
import { Section } from "./Section";


export function WPSolutionsBanner() {


    /*
    *
    * This is static mock value added only for coding purpose
    * Actual value of purchased solution will be retrived from API call, discussed with @Diwanshu, @Vara to work on it.
    * 
    */
    let purchasedSolution = "creator";   
    
    let [solutionsCards, setSolutionsCards] = useState([{}]);
    let currentSolution = [];

    useEffect(() => {    

        currentSolution = purchasedSolution === "creator" ? 
        wpSolutionsPluginsList[0]['creator'] : 
        purchasedSolution === "services" ? 
        wpSolutionsPluginsList[0]['services'] : 
        purchasedSolution === "ecommerce" ?
        wpSolutionsPluginsList[0]['ecommerce'] : wpSolutionsPluginsList[0]['none'];

        //console.log(Object.values(currentSolution), "currentSolution"); 

        let tempSolutionsCards = Object.values(currentSolution);
        //console.log(tempSolutionsCards, "tempSolutionsCards");     

        setSolutionsCards(tempSolutionsCards);           
    }, [purchasedSolution]);

    //console.log(solutionsCards, Array.isArray(solutionsCards), "solutionsCards");

    return(   
        <Section.Container className="nfd-container">
            <Section.Header 
                title={__("Explore Your Plugins and Tools", "wp-module-ecommerce")} 
                subTitle={__("Improve your site with the tools and services included in your plan.", "wp-module-ecommerce")} 
                secondaryAction={{title : "View all your plugins and tools" }} 
            />
            <Section.Content className="nfd-app-section-home">     
                <div className="nfd-flex nfd-flex-col">                
                    {
                        solutionsCards.map((details) => {
                            return (<div className="nfd-bg-[#F1F5F7] nfd-w-96 nfd-m-3 nfd-p-6 nfd-rounded-lg nfd-border nfd-border-[#E2E8F0] nfd-box-content">                        
                                        <h2 className="nfd-text-[#0F172A] nfd-text-lg nfd-leading-5 nfd-font-semibold nfd-mb-4">
                                            {details['title']}
                                        </h2>
                                        <p className="nfd-text-[#0F172A] nfd-text-lg nfd-leading-5 nfd-font-normal">
                                            {details['description']}
                                        </p>
                                        <Button className="nfd-button nfd-button--primary nfd-mt-9">
                                            {details['buttonText']}
                                            <RightArrow className="nfd-mt-2.5" />
                                        </Button>
                                    </div>)   
                        })
                    }
                </div>   
                <Button as="a" href="" className="nfd-button nfd-button--secondary nfd-flex nfd-w-56 nfd-mx-auto nfd-mt-3">
                    {__("View all your plugins and tools", "wp-module-ecommerce")}
                </Button>     
            </Section.Content>
        </Section.Container>
    )
}