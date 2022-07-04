import { __ } from "@wordpress/i18n";
import { ReactComponent as WIPIllustration } from "../icons/wip-illustration.svg";
export function Banner({ state }) {
  if (state.wp.comingSoon === false) {
    return null;
  }
  return (
    <>
      <div className="nfd-ecommerce-banner">
        <div style={{ margin: "32px 0 22px" }}>
          <WIPIllustration />
        </div>
        <h1>
          {__(
            "Congrats on your new store! Let's get it ready to launch!",
            "wp-module-ecommerce"
          )}
        </h1>
        <span className="status-notice">
          {__(
            `Your site is currently displaying a "Coming Soon" page. Once you are ready, launch your site.`,
            "wp-module-ecommerce"
          )}
        </span>
        <div style={{ height: "32px" }} />
      </div>
      <div style={{ height: "32px" }} />
    </>
  );
}
