import { ToggleField, TextField, Button } from "@yoast/ui-library";
import { useEffect, useState } from "@wordpress/element";
import { sprintf, __ } from "@wordpress/i18n";
import { WordPressSdk } from "../sdk/wordpress";
import { ReactComponent as RazorPayBrand } from "../icons/razorpay-brand.svg";

/** @type {((key: string) => boolean)[]} */
const KeyChecks = [
  (key) => key?.startsWith("rzp_test_"),
  (key) => key?.startsWith("rzp_live_"),
];

const Content = {
  keyIdLabel: __("Key ID", "wp-module-ecommerce"),
  keyTestIdLabel: __("Test Key ID", "wp-module-ecommerce"),
  keySecretLabel: __("Key Secret", "wp-module-ecommerce"),
  keyTestSecretLabel: __("Test Key Secret", "wp-module-ecommerce"),
  keyId: sprintf(
    __(
      `The key ID can be found in the "%1$sAPI Keys%2$s" section of your Razorpay dashboard.`,
      "wp-module-ecommerce"
    ),
    `<a target="_blank" href="https://dashboard.razorpay.com/app/website-app-settings/api-keys">`,
    "</a>"
  ),
  invalidTestKeyId: __(
    "That is not a valid test key ID. Please check your key ID and enter it again.",
    "wp-module-ecommerce"
  ),
  invalidProductionKeyId: __(
    "That is not a valid production key ID. Please check your key ID and enter it again.",
    "wp-module-ecommerce"
  ),
  keySecret: sprintf(
    __(
      `The key secret can be found in the "%1$sAPI Keys%2$s" section of your Razorpay dashboard.`,
      "wp-module-ecommerce"
    ),
    `<a target="_blank" href="https://dashboard.razorpay.com/app/website-app-settings/api-keys">`,
    "</a>"
  ),
};

const rzrPaySettings = {
  enabled: "yes",
  title: "Credit Card/Debit Card/NetBanking",
  description:
    "Pay securely by Credit or Debit card or Internet Banking through Razorpay.",
  payment_action: "capture",
  order_success_message:
    "Thank you for shopping with us. Your account has been charged and your transaction is successful. We will be processing your order soon.",
  enable_1cc_debug_mode: "yes",
};

export function CaptiveRazorpay({razorpaySettings}) {

  let hireExpertsUrl = `admin.php?page=bluehost#/marketplace/services/blue-sky`;

  let [isTestMode, setTestMode] = useState(() => false);
  let [rzrKeys, updateKeys] = useState({
    key_id: "",
    key_secret: "",
  });
  useEffect(() => {
    if (razorpaySettings) {
      setTestMode(razorpaySettings?.key_id?.startsWith("rzp_test_"));
      updateKeys(razorpaySettings);
    }
  }, [razorpaySettings]);
  const toggleValue = () => {
    if (isTestMode) {
      setTestMode(false);
    }
    else {
      setTestMode(true);
      updateKeys(razorpaySettings);
    }
  }
  let isFormDisabled = razorpaySettings === undefined;
  let [isTestKeyValid, isProductionKeyValid] = KeyChecks.map(
    (check) => rzrKeys.key_id === "" || check(rzrKeys.key_id)
  );
  let isKeyValid = isTestMode ? isTestKeyValid : isProductionKeyValid;
  const handleSubmit = async (event) => {
    event.preventDefault();
    await WordPressSdk.settings.put({
      "nfd-ecommerce-captive-flow-razorpay": "true",
      woocommerce_razorpay_settings: { ...rzrPaySettings, ...rzrKeys },
    });
  };
  return (
    <form>
      <div className="yst-flex yst-justify-between yst-mb-6">
        <RazorPayBrand className="razorpay-logo" />
        <Button
          target="_blank"
          href="https://rzp.io/i/egoPZR2rbu"
        >
          {__("Create an Account", "wp-module-ecommerce")}
        </Button>
      </div>

      <p className="yst-mb-4">
        {__("Already have an account? ", "wp-module-ecommerce")}
        <a
          href="https://dashboard.razorpay.com/?screen=sign_in&source=bluehost&next=app%2Fwebsite-app-settings%2Fapi-keys"
          target="_blank"
        >
          {__("Login", "wp-module-ecommerce")}
        </a>
      </p>
      <p className="yst-mb-6 yst-pb-6 yst-border-b yst-font-medium" style={{ color: "var(--nfd-ecommerce-text-tertiary)" }}>
        {__(
          "After you login to Razorpay, you will need to generate your key ID and key secret codes, you will then need to switch back to this tab in your browser and paste your codes into the fields below.",
          "wp-module-ecommerce"
        )}
      </p>
      <fieldset
        disabled={isFormDisabled}
        className="yst-mb-4"
      >
        <ToggleField
          id="rzpTestModeToggle"
          label={__("Enable test mode", "wp-module-ecommerce")}
          checked={isTestMode}
          onChange={() => { toggleValue() }}
        />
        <TextField
          name="key_id"
          value={rzrKeys.key_id && rzrKeys.key_id}
          label={isTestMode ? Content.keyTestIdLabel : Content.keyIdLabel}
          placeholder={__(
            `enter your ${isTestMode ? "test" : "production"} key ID here.`,
            "wp-module-ecommerce"
          )}
          required
          onChange={(event) => {
            const { value } = event.target;
            updateKeys((keys) => ({ ...keys, key_id: value }));
          }}
          description={
            <span
              style={{ color: isKeyValid ? "inherit" : "#F72F26" }}
              dangerouslySetInnerHTML={{
                __html: isKeyValid
                  ? Content.keyId
                  : isTestMode
                    ? Content.invalidTestKeyId
                    : Content.invalidProductionKeyId,
              }}
            />
          }
        />
        <TextField
          name="key_secret"
          value={rzrKeys.key_secret && rzrKeys.key_secret}
          onChange={(event) => {
            const { value } = event.target;
            updateKeys((keys) => ({ ...keys, key_secret: value }));
          }}
          required
          label={
            isTestMode ? Content.keyTestSecretLabel : Content.keySecretLabel
          }
          placeholder={__(
            `enter your ${isTestMode ? "test" : "production"} key secret here.`,
            "wp-module-ecommerce"
          )}
          description={
            <span dangerouslySetInnerHTML={{ __html: Content.keySecret }} />
          }
        />
      </fieldset>
      <p className="yst-mb-4">
        <em>* required</em>
      </p>
      <div className="yst-mb-4 yst-flex yst-justify-end">
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!isKeyValid}
        >
          {__("Save", "wp-module-ecommerce")}
        </Button>
      </div>
      <p className="yst-justify-self-end">
        <em>
          {__("Need help?", "wp-module-ecommerce")}{" "}
          <a href={hireExpertsUrl}>
            {__("Hire our experts", "wp-module-ecommerce")}
          </a>
        </em>
      </p>
    </form>
  );
}
