import { ReactComponent as Complete } from "./Complete.svg";
import { ReactComponent as WIP } from "./WIP.svg";

const BannerConfigurationByStatus = {
  wip: {
    Icon: WIP,
    message: "Congrats on your new store! Let's get it ready to launch!",
  },
  complete: {
    Icon: Complete,
    message: "Your store is online and ready for business!",
  },
};

export function Banner({ state }) {
  let BannerConfiguration = state.wp.comingSoon
    ? BannerConfigurationByStatus.wip
    : BannerConfigurationByStatus.complete;
  return (
    <div className="nfd-ecommerce-banner">
      <div style={{ margin: "32px 0 22px" }}>
        <BannerConfiguration.Icon />
      </div>
      <h1 className="accent">{BannerConfiguration.message}</h1>
      {state.wp.comingSoon ? (
        <span className="text status-notice">
          Your site is currently displaying a "Coming Soon" page. Once you are
          ready, launch your site.
        </span>
      ) : (
        <span className="text status-notice">
          Your site is live and visible to everyone. Not quite ready?{" "}
          <span>Enable the "Coming Soon" mode.</span>
        </span>
      )}
      <div style={{ height: "32px" }} />
    </div>
  );
}
