import { __ } from "@wordpress/i18n";
import movingfiles from "../icons/movingfiles.svg";
import { Spinner } from "@newfold/ui-component-library";


export function LoadingPanel({ pluginName }) {
  return <div className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-5">
    <h1 className="nfd-text-2xl">{__("Hold on while we get things setup for you!", "wp-module-ecommerce")}</h1>
    <img src={movingfiles} className="nfd-w-50 nfd-h-50 nfd-text-[--nfd-ecommerce-text-dark]" />
    <p className="nfd-text-base">{__(`Activating the YITH ${pluginName} plugin...`, "wp-module-ecommerce")}</p>
    <Spinner size="4" className="nfd-text-primary" />
  </div>
}

