import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ReactComponent as StoreOnlineIllustration } from "../icons/store-online.svg";

const SiteStatusContent = {
  title: __("Ready to go live?", "wp-module-ecommerce"),
  subtitle: __(
    "Preview your store before setting it live to make sure everything is how you want it. Once you're ready, set your store live!",
    "wp-module-ecommerce"
  ),
  cta: __("Launch your store", "wp-module-ecommerce"),
  status: { text: __("Live", "wp-module-ecommerce"), color: "#048200" },
};

export function SiteStatus(props) {
  let { wp } = props.state;
  let { toggleComingSoon } = props.actions;
  let { Modal } = props.wpModules;
  let [showModal, setModal] = useState(false);
  let { title, subtitle, cta, status } = SiteStatusContent;
  let addCurtain = props.plugins?.status?.woocommerce !== "Active";
  if (!wp.comingSoon && !showModal) {
    return null;
  }
  return (
    <>
      <div style={{ height: "32px" }} />
      <div
        className={`site-status-banner ${
          addCurtain ? "nfd-ecommerce-disable" : ""
        }`}
      >
        <h2>{title}</h2>
        <div style={{ height: "24px" }} />
        <div className="content">
          <p>{subtitle}</p>
          <button
            className="nfd-ecommerce-button"
            data-variant="hollow"
            onClick={() => window.open(window.location.origin, "_blank")}
          >
            <h3>{__("Preview your store", "wp-module-ecommerce")}</h3>
          </button>
          <button
            className="nfd-ecommerce-button"
            data-variant="flat"
            onClick={() => {
              setModal(true);
              toggleComingSoon().then(() => {
                let $statusText = document.getElementById(
                  "nfd-site-status-text"
                );
                if ($statusText) {
                  $statusText.textContent = status.text;
                  $statusText.style.setProperty("color", status.color);
                }
              });
            }}
          >
            <h3>{cta}</h3>
          </button>
        </div>
        {showModal ? (
          <Modal
            __experimentalHideHeader
            overlayClassName="nfd-ecommerce-modal-overlay"
            className="nfd-ecommerce-atoms nfd-ecommerce-modal nfd-site-live-modal"
            shouldCloseOnClickOutside
            onRequestClose={() => setModal(false)}
          >
            <div className="nfd-ecommerce-modal-content">
              <StoreOnlineIllustration
                style={{ width: "100%" }}
                className="nfd-ecommerce-hero"
              />
              <h1>
                {__(
                  "Your store is online and ready for business!",
                  "wp-module-ecommerce"
                )}
              </h1>
              <span>
                {__(
                  `Not ready? You can re-enable the "Coming Soon" mode if you need.`,
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
      </div>
    </>
  );
}
