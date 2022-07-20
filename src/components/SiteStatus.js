import { __ } from "@wordpress/i18n";
import { ReactComponent as ComingSoonIllustration } from "../icons/coming-soon-illustration.svg";
import { ReactComponent as LaunchStoreIllustration } from "../icons/launch-store.svg";
import { ReactComponent as StoreOnlineIllustration } from "../icons/store-online.svg";
import { DashboardContent } from "./DashboardContent";

const SiteStatusContent = {
  comingSoon: {
    title: __("Launch Your Store!", "wp-module-ecommerce"),
    subtitle: __(
      "Once you're ready, click the button below to make your store live to the world!",
      "wp-module-ecommerce"
    ),
    Illustration: LaunchStoreIllustration,
    cta: __("Launch your store", "wp-module-ecommerce"),
    status: {
      text: __("Live", "wp-module-ecommerce"),
      color: "#048200",
    },
  },
  live: {
    title: __("Change your site status", "wp-module-ecommerce"),
    subtitle: __(
      `Your site is currently "Live", but you can disable your site and put back the "Coming Soon" page if needed.`,
      "wp-module-ecommerce"
    ),
    Illustration: ComingSoonIllustration,
    cta: __(`Switch back to "Coming Soon" mode`, "wp-module-ecommerce"),
    status: {
      text: __("Coming Soon", "wp-module-ecommerce"),
      color: "#E01C1C",
    },
  },
};

export function SiteStatus(props) {
  let { wp } = props.state;
  let { toggleComingSoon } = props.actions;
  let { Modal, useState } = props.wpModules;
  let [showModal, setModal] = useState(false);
  let { title, subtitle, Illustration, cta, status } = wp.comingSoon
    ? SiteStatusContent.comingSoon
    : SiteStatusContent.live;
  return (
    <DashboardContent title={title} subtitle={subtitle}>
      <div
        style={{ display: "grid", placeItems: "center", paddingBottom: "32px" }}
      >
        {!wp.comingSoon ? <div style={{ height: "24px" }} /> : null}
        <Illustration />
        {!wp.comingSoon ? (
          <>
            <div style={{ height: "3px" }} />
            <button
              className="nfd-ecommerce-button"
              data-variant="flat"
              onClick={() => window.open(window.location.origin, "_blank")}
            >
              <h3>{__("Go to your site!", "wp-module-ecommerce")}</h3>
            </button>
            <div style={{ height: "16px" }} />
          </>
        ) : null}
        <button
          className="nfd-ecommerce-button"
          data-variant={wp.comingSoon ? "flat" : "link"}
          onClick={() => {
            toggleComingSoon().then(() => {
              let $statusText = document.getElementById("nfd-site-status-text");
              if ($statusText) {
                $statusText.textContent = status.text;
                $statusText.style.setProperty("color", status.color);
              }
              setModal(wp.comingSoon);
            });
          }}
        >
          <h3>{cta}</h3>
        </button>
      </div>
      {showModal ? (
        <Modal
          overlayClassName="nfd-ecommerce-modal-overlay"
          className="nfd-ecommerce-atoms nfd-ecommerce-modal"
          shouldCloseOnClickOutside
          onRequestClose={() => setModal(false)}
        >
          <div className="nfd-ecommerce-modal-content">
            <StoreOnlineIllustration className="nfd-ecommerce-hero" />
            <h1>
              {__(
                "Your store is online and ready for business!",
                "wp-module-ecommerce"
              )}
            </h1>
            <span>
              {__(
                "Not ready? You can re-enable the 'Coming Soon' mode if you need.",
                "wp-module-ecommerce"
              )}
            </span>
          </div>
          <div className="nfd-ecommerce-modal-actions">
            <button onClick={() => setModal(false)}>
              <h3>{__("Continue", "wp-module-ecommerce")}</h3>
            </button>
          </div>
        </Modal>
      ) : null}
    </DashboardContent>
  );
}
