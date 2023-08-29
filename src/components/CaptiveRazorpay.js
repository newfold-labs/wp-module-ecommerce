import { useEffect, useState } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import { Button, TextField, ToggleField } from "@newfold/ui-component-library";
import { ReactComponent as RazorPayBrand } from "../icons/brands/razorpay.svg";
import classNames from "classnames";

/** @type {((key: string) => boolean)[]} */
const KeyChecks = [
  (key) => key?.startsWith("rzp_test_"),
  (key) => key?.startsWith("rzp_live_"),
];

const Content = {
  keyIdLabel: __("Key ID *", "wp-module-ecommerce"),
  keyTestIdLabel: __("Test Key ID *", "wp-module-ecommerce"),
  keySecretLabel: __("Key Secret *", "wp-module-ecommerce"),
  keyTestSecretLabel: __("Test Key Secret *", "wp-module-ecommerce"),
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

export function CaptiveRazorpay({ razorpaySettings }) {
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
    setTestMode(!isTestMode);
    updateKeys({
      key_id: razorpaySettings?.key_id ?? "",
      key_secret: razorpaySettings?.key_secret ?? "",
    });
  };

  let isFormDisabled = razorpaySettings === undefined;
  let [isTestKeyValid, isProductionKeyValid] = KeyChecks.map(
    (check) => rzrKeys.key_id === "" || check(rzrKeys.key_id)
  );
  let isKeyValid = isTestMode ? isTestKeyValid : isProductionKeyValid;

  return (
    <fieldset className="nfd-border nfd-p-6 nfd-rounded-md">
      <div
        className={classNames(
          "max-[375px]:nfd-flex-col",
          "min-[376px]:nfd-flex nfd-justify-between min-[376px]:nfd-mb-8"
        )}
      >
        <RazorPayBrand className="razorpay-logo" />
        <Button
          as="a"
          target="_blank"
          href="https://rzp.io/i/egoPZR2rbu"
          className={classNames("max-[375px]:nfd-my-2", "min-[376px]:nfd-m-0")}
        >
          {__("Create an Account", "wp-module-ecommerce")}
        </Button>
      </div>

      <p className="nfd-mb-4">
        {__("Already have an account? ", "wp-module-ecommerce")}
        <a
          href="https://dashboard.razorpay.com/?screen=sign_in&source=bluehost&next=app%2Fwebsite-app-settings%2Fapi-keys"
          target="_blank"
        >
          {__("Login", "wp-module-ecommerce")}
        </a>
      </p>
      <p className="nfd-mb-6 nfd-pb-6 nfd-border-b nfd-font-medium">
        {__(
          "After you login to Razorpay, you will need to generate your key ID and key secret codes, you will then need to switch back to this tab in your browser and paste your codes into the fields below.",
          "wp-module-ecommerce"
        )}
      </p>
      <div
        disabled={isFormDisabled}
        className="nfd-flex nfd-flex-col nfd-gap-4 nfd-mb-4"
      >
        <ToggleField
          id="rzpTestModeToggle"
          label={__("Enable Test Mode", "wp-module-ecommerce")}
          checked={isTestMode}
          onChange={() => {
            toggleValue();
          }}
        />
        <TextField
          data-section="razorpay"
          name="key_id"
          value={rzrKeys.key_id}
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
              style={{ color: isKeyValid ? "inherit" : "var(--nfd-ecommerce-text-danger)" }}
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
          data-section="razorpay"
          name="key_secret"
          value={rzrKeys.key_secret}
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
      </div>
      <p className="nfd-mb-4">
        <span>* indicates a required field</span>
      </p>
    </fieldset>
  );
}
