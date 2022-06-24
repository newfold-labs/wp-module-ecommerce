import { ReactComponent as Complete } from "./Complete.svg";
import { ReactComponent as WIP } from "./WIP.svg";

const BannerConfigurationByStatus = {
  wip: {
    vars: {
      "--nfd-ecommerce-status": "rgba(229, 22, 7, 1)",
      "--nfd-ecommerce-status-border": "var(--nfd-ecommerce-border-primary)",
      "--nfd-ecommerce-status-outer": "rgba(229, 22, 7, 0.2)",
    },
    Icon: WIP,
    message: "Congrats on your new store! Let's get it ready to launch!",
    status: "Coming Soon",
  },
  complete: {
    vars: {
      "--nfd-ecommerce-status": "rgba(23, 178, 18, 1)",
      "--nfd-ecommerce-status-outer": "rgba(23, 178, 18, 0.2)",
      "--nfd-ecommerce-status-border": "var(--nfd-ecommerce-status-outer)",
    },
    Icon: Complete,
    message: "Your store is online and ready for business!",
    status: "Live",
  },
};

export function Banner({ state }) {
  let BannerConfiguration = state.wp.comingSoon
    ? BannerConfigurationByStatus.wip
    : BannerConfigurationByStatus.complete;
  return (
    <div className="nfd-ecommerce-banner" style={BannerConfiguration.vars}>
      <div style={{ margin: "43px 0 28px" }}>
        <BannerConfiguration.Icon />
      </div>
      <h1 className="heading accent">{BannerConfiguration.message}</h1>
      <div className="status-bar">
        <div className="status-icon" />
        <span>
          Store status:{" "}
          <span style={{ color: "var(--nfd-ecommerce-status)" }}>
            {BannerConfiguration.status}
          </span>
        </span>
      </div>
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
      <div style={{ height: "34px" }} />
    </div>
  );
}
