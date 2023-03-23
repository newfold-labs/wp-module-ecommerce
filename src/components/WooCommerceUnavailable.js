import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { ReactComponent as WCUnAvailableIllustaration } from "../icons/wc-unavailable-illustration.svg";
import { queuePluginInstall, syncPluginInstall } from "../services";

export function WooCommerceUnavailable({ wpModules, plugins, user }) {
  let { Modal } = wpModules;
  let [installationFailed, setInstallationFailed] = useState(false);
  let [isInstalling, setIsInstalling] = useState(false);

  let isWCInQueue = plugins?.status?.["queue-status"]?.some(
    (queue) => queue.slug === "woocommerce"
  );

  async function installWooCommerce() {
    setIsInstalling(true);
    let needsSyncInstall = plugins.status?.woocommerce === "Not Installed";
    let response = needsSyncInstall
      ? await syncPluginInstall("woocommerce", plugins.token)
      : await queuePluginInstall("woocommerce", plugins.token);
    if (needsSyncInstall) {
      setIsInstalling(false);
    }
    if (response === "failed") {
      setInstallationFailed(true);
    } else {
      await plugins.refresh();
    }
  }

  if (installationFailed && !isInstalling) {
    return (
      <Modal
        overlayClassName="nfd-ecommerce-modal-overlay"
        className="nfd-ecommerce-atoms nfd-ecommerce-modal-plugin-install-failed"
        shouldCloseOnClickOutside
        onRequestClose={() => setInstallationFailed(false)}
      >
        <div className="nfd-ecommerce-modal-plugin-install-failed-content">
          <h1>{__(" We hit a snag...", "wp-module-ecommerce")}</h1>
          <span style={{ marginTop: "48px" }}>
            {__(
              "We're sorry, but there was an error installing WooCommerce, please try again.",
              "wp-module-ecommerce"
            )}
          </span>
          <button
            disabled={plugins.token === undefined}
            onClick={installWooCommerce}
            className="nfd-ecommerce-button"
            data-variant="flat"
          >
            {__("Try again", "wp-module-ecommerce")}
          </button>
          <span style={{ marginTop: "32px" }}>
            {__(" If the problem persists, please ", "wp-module-ecommerce")}
            <a href={user?.currentBrandConfig?.support} target="_blank">
              {__("contact", "wp-module-ecommerce")}
            </a>
            {__(" support team.", "wp-module-ecommerce")}
          </span>
        </div>
      </Modal>
    );
  }
  let showInProgress = isInstalling || isWCInQueue;
  return (
    <>
      <div className="nfd-ecommerce-woocommerce-unavailable">
        <div style={{ marginTop: "24px" }}>
          <h1>
            {__("Uh-Oh! WooCommerce is not installed!", "wp-module-ecommerce")}
          </h1>
          <div className="status-notice">
            {isWCInQueue
              ? __(
                  `We are currently installing WooCommerce which is required for this dashboard to work.`,
                  "wp-module-ecommerce"
                )
              : __(
                  `WooCommerce is required for this dashboard to work, install it now or contact our support team for more assistance.`,
                  "wp-module-ecommerce"
                )}
          </div>
        </div>

        <div className="actions-container">
          <button
          id="install-wc-btn"
            disabled={showInProgress}
            onClick={installWooCommerce}
            className="nfd-ecommerce-button"
            data-variant="flat"
          >
            <span
              style={{
                height: "100%",
                display: "grid",
                gridAutoFlow: "column",
                placeContent: "center",
                gap: "5px",
              }}
            >
              {__("Install WooCommerce", "wp-module-ecommerce")}
              {showInProgress ? (
                <div className="nfd-ecommerce-loader nfd-ecommerce-loader-mini nfd-ecommerce-loader-inverse" />
              ) : null}
            </span>
          </button>
          <button
          id="ctc-btn"
            className="nfd-ecommerce-button"
            data-variant="hollow"
            onClick={() =>
              window.open(user?.currentBrandConfig?.support, "_blank")
            }
          >
            <span> {__("Contact Support", "wp-module-ecommerce")}</span>
          </button>
        </div>
        <div className="banner-image">
          <WCUnAvailableIllustaration className="wcUnAvailableIllustaration" />
        </div>
      </div>
      <div style={{ height: "32px" }} />
    </>
  );
}
