import {
  Button,
  ButtonGroup,
  TextControl,
  ToggleControl,
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import { sprintf, __ } from "@wordpress/i18n";
import { ReactComponent as RazorPayBrand } from "../icons/razorpay-brand.svg";
import { updateWPSettings } from "../services";

/** @type {((key: string) => boolean)[]} */
const KeyChecks = [
  (key) => key.startsWith("rzp_test_"),
  (key) => key.startsWith("rzp_live_"),
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

export function CaptiveRazorpay({ onComplete, settings }) {
  let [isTestMode, setTestMode] = useState(() =>
    settings?.key_id?.startsWith("rzp_test_")
  );
  let [rzrKeys, updateKeys] = useState({
    key_id: settings?.key_id,
    key_secret: settings?.key_secret,
  });
  let isFormDisabled = settings === undefined;
  let [isTestKeyValid, isProductionKeyValid] = KeyChecks.map(
    (check) => rzrKeys.key_id === "" || check(rzrKeys.key_id)
  );
  let isKeyValid = isTestMode ? isTestKeyValid : isProductionKeyValid;
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        event.stopPropagation();
        await updateWPSettings({
          "nfd-ecommerce-captive-flow-razorpay": isTestMode ? "false" : "true",
          woocommerce_razorpay_settings: { ...rzrPaySettings, ...rzrKeys },
        });
        await onComplete();
      }}
      style={{ display: "grid", padding: "40px 40px 1em", gap: "1.5em" }}
    >
      <h1 style={{ justifySelf: "center" }}>
        {__("Connect your Razorpay Account", "wp-module-ecommerce")}
      </h1>
      <RazorPayBrand />
      <section
        style={{ padding: "0 0 1.5em", borderBottom: "solid 1px #cccccc" }}
      >
        <h2
          style={{
            color: "var(--nfd-ecommerce-accent-primary)",
            textTransform: "uppercase",
          }}
        >
          {__("Special Offer!", "wp-module-ecoomerce")}
        </h2>
        <p style={{ color: "var(--nfd-ecommerce-text-secondary)" }}>
          {__(
            "Create a Razorpay account through our link below and get up to Rs 1,50,000 credits free in your account and a lower transaction fee rate!",
            "wp-module-ecommerce"
          )}
        </p>
        <Button
          variant="secondary"
          target="_blank"
          href="https://rzp.io/i/egoPZR2rbu"
        >
          {__("Create a RazorPay Account", "wp-module-ecommerce")}
        </Button>
        <p>
          {__("Already have an account? ", "wp-module-ecommerce")}
          <a
            href="https://dashboard.razorpay.com/signin?screen=sign_in&source=bluehost"
            target="_blank"
          >
            {__("Login", "wp-module-ecommerce")}
          </a>
        </p>
        <p style={{ color: "var(--nfd-ecommerce-text-tertiary)" }}>
          {__(
            "After you successfully login and generate your key ID and key secret codes, you will then need to switch back to this tab in your browser and paste your codes into the fields below.",
            "wp-module-ecommerce"
          )}
        </p>
      </section>
      <fieldset
        disabled={isFormDisabled}
        style={{ paddingTop: "0", display: "grid", gap: "1.5em" }}
      >
        <ToggleControl
          label={__("Enable test mode", "wp-module-ecommerce")}
          className="toggle-control"
          checked={isTestMode}
          onChange={setTestMode}
        />

        <TextControl
          className="text-control"
          name="key_id"
          value={rzrKeys.key_id}
          onChange={(key_id) => updateKeys((keys) => ({ ...keys, key_id }))}
          required
          __nextHasNoMarginBottom
          label={isTestMode ? Content.keyTestIdLabel : Content.keyIdLabel}
          help={
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

        <TextControl
          className="text-control"
          name="key_secret"
          value={rzrKeys.key_secret}
          onChange={(key_secret) =>
            updateKeys((keys) => ({ ...keys, key_secret }))
          }
          required
          __nextHasNoMarginBottom
          label={
            isTestMode ? Content.keyTestSecretLabel : Content.keySecretLabel
          }
          help={
            <span dangerouslySetInnerHTML={{ __html: Content.keySecret }} />
          }
        />
      </fieldset>
      <p>
        <em>* required</em>
      </p>
      <ButtonGroup
        style={{ justifySelf: "end", display: "inline-flex", gap: "1em" }}
      >
        <Button variant="secondary" type="button" onClick={onComplete}>
          {__("Cancel", "wp-module-ecommerce")}
        </Button>
        <Button variant="primary" type="submit" disabled={!isKeyValid}>
          {__("Save", "wp-module-ecommerce")}
        </Button>
      </ButtonGroup>
      <p style={{ justifySelf: "end" }}>
        <em>
          {__("Need help?", "wp-module-ecommerce")}{" "}
          <a href="admin.php?page=bluehost#/marketplace/services/blue-sky">
            {__("Hire our experts", "wp-module-ecommerce")}
          </a>
        </em>
      </p>
    </form>
  );
}
