import { ReactComponent as WIP } from "../icons/WIP.svg";

export function Banner({ state }) {
  if (state.wp.comingSoon === false) {
    return null;
  }
  return (
    <>
      <div className="nfd-ecommerce-banner">
        <div style={{ margin: "32px 0 22px" }}>
          <WIP />
        </div>
        <h1>Congrats on your new store! Let's get it ready to launch!</h1>
        <span className="text status-notice">
          Your site is currently displaying a "Coming Soon" page. Once you are
          ready, launch your site.
        </span>
        <div style={{ height: "32px" }} />
      </div>
      <div style={{ height: "32px" }} />
    </>
  );
}
