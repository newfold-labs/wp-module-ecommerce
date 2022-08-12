import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { ReactComponent as WCUnAvailableIllustaration } from "../icons/wc-unavailable-illustration.svg";
import { queuePluginInstall, syncPluginInstall } from "../services";

export function WooCommerceUnavailable({ wpModules, plugins }) {
  let { Modal } = wpModules;
  let [installationFailed, setInstallationFailed] = useState(false);
  let [isInstalling, setIsInstalling] = useState(false);

  async function installWooCommerce() {
    setIsInstalling(true);
    let response =
      plugins.status?.woocommerce === 'Inactive'
        ? await queuePluginInstall('woocommerce', plugins.token)
        : await syncPluginInstall('woocommerce');
    setIsInstalling(false);
    if (response === 'failed') {
      setInstallationFailed(true);
    } else {
      await plugins.refresh();
      window.location.reload();
    }
  }

  if (installationFailed && !isInstalling) {
    return (
      <Modal
        overlayClassName="nfd-ecommerce-modal-overlay"
        className="nfd-ecommerce-atoms nfd-ecommerce-modal-wc-install-failed"
        shouldCloseOnClickOutside
        onRequestClose={() => setInstallationFailed(false)}
      >
        <div className="nfd-ecommerce-modal-content">
          <h1>{__(" We hit a snag...", "wp-module-ecommerce")}</h1>
          <span style={{ marginTop: "48px" }}>
            {__(
              "We're sorry, but there was an error installing WooCommerce, please try again.",
              "wp-module-ecommerce"
            )}
          </span>
          <button disabled={plugins.token === undefined} onClick={installWooCommerce}>
            {__("Try again", "wp-module-ecommerce")}
          </button>
          <span style={{ marginTop: "32px" }}>
            {__(" If the problem persists, please ", "wp-module-ecommerce")}
            <a href="https://www.bluehost.com/contact" target="_blank">
              {__("contact", "wp-module-ecommerce")}
            </a>
            {__(" support team.", "wp-module-ecommerce")}
          </span>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <div className="nfd-ecommerce-woocommerce-unavailable">
        <div style={{ marginTop: "24px" }}>
          <h1>
            {__("Uh-Oh! WooCommerce is not installed!", "wp-module-ecommerce")}
          </h1>
          <div className="status-notice">
            {__(
              `WooCommerce is required for this dashboard to work, install it now or contact our support team for more assistance.`,
              "wp-module-ecommerce"
            )}
          </div>
          <button disabled={isInstalling} onClick={installWooCommerce}>
            {isInstalling ? "Installing WooCommerce..." : "Install WooCommerce"}
          </button>
          <a href="https://www.bluehost.com/contact" target="_blank">
            {__("Contact Support", "wp-module-ecommerce")}
          </a>
        </div>
        <div style={{ margin: "61px 48px 60px 0" }}>
          <WCUnAvailableIllustaration />
        </div>
      </div>
      <div style={{ height: "32px" }} />
    </>
  );
}
