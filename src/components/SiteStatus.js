import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { __ } from "@wordpress/i18n";
import { Button, Title } from "@newfold/ui-component-library";
import classNames from "classnames";
import useSWRMutation from "swr/mutation";

const getTitle = (comingSoon) =>
  comingSoon
    ? __("Coming Soon activated", "wp-module-ecommerce")
    : NewfoldRuntime.hasCapability("isEcommerce")
    ? __("Your store is online and ready for business!", "wp-module-ecommerce")
    : __("Your site is online now!", "wp-module-ecommerce");

const getDescription = (comingSoon) =>
  comingSoon
    ? ""
    : __(
        `You can re-enable the 'Coming Soon' mode in “Settings”.`,
        "wp-module-ecommerce"
      );

/**
 * @typedef SiteStatusProps
 * @property {boolean} comingSoon
 * @property {() => Promise<void>} toggleComingSoon
 *
 * @param {SiteStatusProps} props
 * @returns {JSX.Element}
 */
export function SiteStatus({ comingSoon, toggleComingSoon, notify }) {
  let comingSoonAction = useSWRMutation("coming-soon", async () => {
    let newComingSoon = !comingSoon;
    await toggleComingSoon();
    notify.push("coming-soon-toggle-notice", {
      title: getTitle(newComingSoon),
      description: <span>{getDescription(newComingSoon)}</span>,
      variant: "success",
      autoDismiss: 5000,
    });
    let $statusText = document.getElementById("nfd-site-status-text");
    if ($statusText) {
      $statusText.textContent = __("Live", "wp-module-ecommerce");
      $statusText.style.setProperty("color", "var(--nfd-ecommerce-text-dark-success)");
    }
  });
  if (!comingSoon) {
    return null;
  }
  return (
    <div
      className={classNames(
        "nfd-px-4 nfd-py-2 nfd-rounded-lg nfd-bg-canvas",
        "max-[1027px]:nfd-flex max-[1027px]:nfd-flex-col",
        "min-[1028px]:nfd-flex min-[1028px]:nfd-flex-row min-[1028px]:nfd-justify-between min-[1028px]:nfd-items-center"
      )}
    >
      <div className="nfd-flex-1">
        <Title size="4" className="nfd-leading-normal">
          {__("Ready to go live?", "wp-module-ecommerce")}
        </Title>
        <span className="nfd-whitespace-pre-wrap nfd-leading-tight">
          {NewfoldRuntime.hasCapability("isEcommerce")
            ? __(
                "Preview your store before setting it live to make sure everything is how you want it.\nOnce you're ready, set your store live!",
                "wp-module-ecommerce"
              )
            : __(
                "Preview your Site before setting it live to make sure everything is how you want it.\nOnce you're ready, set your site live!",
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
          className="nfd-bg-canvas"
          href={NewfoldRuntime.hasCapability("isEcommerce") && window.location.href.includes('store') ? `${NewfoldRuntime.siteDetails.url}/shop` : NewfoldRuntime.siteDetails.url}
          target="_blank"
          variant="secondary"
        >
          {NewfoldRuntime.hasCapability("isEcommerce")
            ? __("View your store", "wp-module-ecommerce")
            : __("View your site", "wp-module-ecommerce")}
        </Button>
        <Button
          className="nfd-flex nfd-gap-2 nfd-items-center"
          variant="upsell"
          isLoading={comingSoonAction.isMutating}
          onClick={comingSoonAction.trigger}
        >
          <RocketLaunchIcon />
          {NewfoldRuntime.hasCapability("isEcommerce")
            ? __("Launch your store", "wp-module-ecommerce")
            : __("Launch your site", "wp-module-ecommerce")}
        </Button>
      </div>
    </div>
  );
}
