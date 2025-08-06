import { SparklesIcon } from "@heroicons/react/24/outline";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { __ } from "@wordpress/i18n";
import { Button, Title } from "@newfold/ui-component-library";
import classNames from "classnames";

/**
 * @typedef RestartOnboarding
 * @returns {JSX.Element}
 */
export function RestartOnboarding( ) {

  const redirectUrl = window.NewfoldRuntime?.linkTracker?.addUtmParams(`${window.NewfoldRuntime.adminUrl}index.php?page=nfd-onboarding&restart=brand-plugin`) || `${window.NewfoldRuntime.adminUrl}index.php?page=nfd-onboarding&restart=brand-plugin`;


  return (
    <div
      data-testid="restartOnboarding"
      className={classNames(
        "nfd-px-4 nfd-py-2 nfd-rounded-lg nfd-bg-canvas",
        "max-[1027px]:nfd-flex max-[1027px]:nfd-flex-col",
        "min-[1028px]:nfd-flex min-[1028px]:nfd-flex-row min-[1028px]:nfd-justify-between min-[1028px]:nfd-items-center"
      )}
    >
      <div className="nfd-flex-1">
        <Title size="4" className="nfd-leading-normal" id="ready-to-go-live">
        {NewfoldRuntime.hasCapability("isEcommerce")
          ?__("Design a custom store with AI", "wp-module-ecommerce")
          :__("Design a custom site with AI", "wp-module-ecommerce")
        }
        </Title>
        <span className="nfd-whitespace-pre-wrap nfd-leading-tight">
          {NewfoldRuntime.hasCapability("isEcommerce")
            ? __(
              "Use our AI Website Builder to begin your store a lot closer to the finish line!",
              "wp-module-ecommerce"
            )
            : __(
              "Use our AI Website Builder to begin your site a lot closer to the finish line!",
              "wp-module-ecommerce"
            )}
        </span>
      </div>
      <div
        className={classNames(
          "nfd-flex-none nfd-gap-4",
          "nfd-flex nfd-flex-col",
          "md:nfd-flex-row",
          "max-[1025px]:nfd-my-2 min-[1025px]:nfd-m-0"
        )}
      >
        <Button
          as="a"
          id="launch-onboarding"
          href={ window.NewfoldRuntime?.linkTracker?.addUtmParams( redirectUrl ) || redirectUrl}
          className="nfd-flex nfd-gap-2 nfd-items-center"
        >
          <SparklesIcon />
          {__("Generate a Theme", "wp-module-ecommerce")}
        </Button>
      </div>
    </div>
  );
}
