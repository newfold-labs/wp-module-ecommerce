import useSWR from "swr";
import { wcPluginStatusParser } from "../configs/selectors";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { PluginsSdk } from "../sdk/plugins";
import { WonderCartNonEcommerce } from "./WonderCartNonEcommerce";
import { WonderCarNotActivated } from "./WonderCartNotActivated";

let wonderCartParser = wcPluginStatusParser("nfd_slug_wonder_cart");

export function WonderCart(props) {
  let wonderCartStatus = useSWR(
    "nfd_slug_wonder_cart-status",
    () =>
      PluginsSdk.queries
        .status("woocommerce", "nfd_slug_wonder_cart")
        .then(wonderCartParser),
    { refreshInterval: 30 * 1000 }
  );
  const canAccessGlobalCTB = NewfoldRuntime.hasCapability("canAccessGlobalCTB");
  const hasYithExtended = NewfoldRuntime.hasCapability("hasYithExtended");
  
  if (wonderCartStatus.isLoading) {
    return <span />;
  }

  return (
    <>
      {
        hasYithExtended && canAccessGlobalCTB ? 
        wonderCartStatus.data?.isInstalled ? 
        <div id="wonder-cart-init" /> : <WonderCarNotActivated wonderCartStatus={wonderCartStatus} {...props} />
        : 
        <WonderCartNonEcommerce />}
    </>
  );
}
