import { queuePluginInstall } from "../services";
import { __ } from "@wordpress/i18n";

const PluginsUnavailable = (props) => {
  let { pluginName, token, onComplete } = props;
  let pluginToInstall =
    pluginName == "Paypal"
      ? "nfd_slug_yith_paypal_payments_for_woocommerce"
      : "nfd_slug_yith_shippo_shippings_for_woocommerce";

  return (
    <div className="nfd-ecommerce-modal-plugin-install-failed-content">
      <h1>{__("Hold tight...", "wp-module-ecommerce")} </h1>

      <span style={{ marginTop: "48px" }}>
        {__(
          `${pluginName} support is still being setup. Please wait a few minutes and
        try again.`,
          "wp-module-ecommerce"
        )}
      </span>

      <span style={{ marginTop: "32px" }}>
        {__("If the problem persists, please", "wp-module-ecommerce")}{" "}
        <a href="https://www.bluehost.com/contact" target="_blank">
          {__("contact.", "wp-module-ecommerce")}
        </a>{" "}
        {__("the support team.", "wp-module-ecommerce")}
      </span>

      <button
        onClick={async () => {
          await queuePluginInstall(pluginToInstall, token);
          await onComplete();
        }}
      >
        {__("Okay", "wp-module-ecommerce")}
      </button>
    </div>
  );
};
export default PluginsUnavailable;
