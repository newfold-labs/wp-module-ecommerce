import { Card, Link, Spinner, Title } from "@newfold/ui-component-library";
import { Section } from "./Section";
import { ReactComponent as TransformStore } from "../icons/transform-store.svg"

export function TransformtoEcommerce() {
    return(
           
        
        <div class="nfd-app-section-container nfd-bg-white nfd-w-full nfd-rounded-lg" id="nonecommerce-features-wrapper">
            <div class="nfd-app-section-content nfd-border nfd-rounded-lg nfd-p-4 nfd-pt-0 nfd-m-8 nfd--mt-2 nfd-items-start" style={{borderColor: "#E2E8F0"}}>
                <div className="nfd-flex nfd-flex-wrap nfd-gap-x-10">
                    <div className="nfd-flex-none nfd-mt-8 nfd-w-40">
                        <TransformStore />
                    </div>                    
                    <div class="nfd-flex-1 nfd-mt-5 nfd-pt-0.5">
                        <h1 className="nfd-text-2xl nfd-leading-9 nfd-font-medium" style={{color: "#111729"}}>Transform your store!</h1>
                        <p style={{fontSize: "0.813rem", color: "#4A5567" }} className="nfd-leading-5">
                            Give your online store a boost with our all-in-one eCommerce bundle filled with exclusive plugins and tools designed to help you sell your products and services like a pro.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
