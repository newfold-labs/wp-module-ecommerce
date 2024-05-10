import { Card, Link, Spinner, Title } from "@newfold/ui-component-library";
import { Section } from "./Section";
import { ReactComponent as TransformStore } from "../icons/transform-store.svg"

export function TransformtoEcommerce() {
    return(
           
        
        <div class="nfd-app-section-container nfd-bg-white nfd-w-full nfd-rounded-lg" id="nonecommerce-features-wrapper">
            <div class="nfd-app-section-content nfd-border nfd-rounded-lg nfd-p-4 nfd-pt-0 nfd-m-8 nfd--mt-2" style={{borderColor: "#E2E8F0"}}>
                <div className="nfd-flex">
                    <TransformStore className="nfd-flex nfd-flex-1 nfd-mt-8" />
                    <div class="nfd-flex nfd-flex-1">
                        <h1>Transform your store!</h1>
                        <p>
                            Give your online store a boost with our all-in-one eCommerce bundle filled with exclusive plugins and tools designed to help you sell your products and services like a pro.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
