import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { NewfoldRuntime } from "@newfold-labs/wp-module-runtime";
import { __ } from "@wordpress/i18n";
import { Button, Title } from "@yoast/ui-library";
import useSWRMutation from "swr/mutation";

const getTitle = (comingSoon) =>
  comingSoon
    ? __("Coming Soon activated", "wp-module-ecommerce")
    : RuntimeSdk.hasCapability("isEcommerce")
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
      $statusText.style.setProperty("color", "#048200");
    }
  });
  if (!comingSoon) {
    return null;
  }
  return (
    <div className="yst-px-4 yst-py-2 yst-rounded-lg yst-bg-canvas min-[270px]:yst-flex min-[270px]:yst-flex-col min-[1028px]:yst-flex min-[1028px]:yst-flex-row min-[1028px]:yst-justify-between min-[1028px]:yst-items-center ">
      <div className="yst-flex-1">
        <Title size={4} className="yst-leading-normal">
          {__("Ready to go live?", "wp-module-ecommerce")}
        </Title>
        <span className="yst-whitespace-pre-wrap yst-leading-tight">
          {__(
            "Preview your store before setting it live to make sure everything is how you want it.\nOnce you're ready, set your store live!",
            "wp-module-ecommerce"
          )}
        </span>
      </div>
      <div className="yst-flex-none yst-gap-4 yst-flex yst-flex-col md:yst-flex-row max-[1025px]:yst-my-2 min-[1025px]:yst-m-0">
        <Button
          as="a"
          className="yst-bg-canvas"
          href={NewfoldRuntime.siteDetails.url}
          target="_blank"
          variant="secondary"
        >
          {NewfoldRuntime.hasCapability("isEcommerce")
            ? __("Preview your store", "wp-module-ecommerce")
            : __("Preview your site", "wp-module-ecommerce")}
        </Button>
        <Button
          className="yst-flex yst-gap-2 yst-items-center"
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
