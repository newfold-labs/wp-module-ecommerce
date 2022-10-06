import { queuePluginInstall } from "../services";

const PluginsUnavailable = (props) => {
  let { pluginName, token, closeModal } = props;
  return (
    <div className="nfd-ecommerce-modal-content">
      <h1>Hold tight...</h1>
      <span style={{ marginTop: "48px" }}>
        {pluginName} support is still being setup. Please wait a few minutes and
        try again.
      </span>
      <span style={{ marginTop: "32px" }}>
        If the problem persists, please{" "}
        <a href="https://www.bluehost.com/contact" target="_blank">
          contact
        </a>{" "}
        the support team.
      </span>
      <button
        onClick={async () => {
          let pluginToInstall =
            pluginName == "Paypal"
              ? "nfd_slug_yith_paypal_payments_for_woocommerce"
              : "nfd_slug_yith_shippo_shippings_for_woocommerce";
          await queuePluginInstall(pluginToInstall, token);
          closeModal();
        }}
      >
        Okay
      </button>
    </div>
  );
};
export default PluginsUnavailable;