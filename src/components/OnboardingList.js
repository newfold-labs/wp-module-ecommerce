import {
  ArrowLongRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Card, Link, Spinner, Title } from "@newfold/ui-component-library";
import useSWRMutation from "swr/mutation";
import { OnboardingListDefinition } from "../configs/OnboardingList.config";
import { useCardManager } from "./useCardManager";
import { BH_UR_REGEX, HG_UR_REGEX } from "../constants";

function OnboardingCheckListItem({ children, actions, state, ...props }) {
  let manageAction = useSWRMutation(props.name, async () => {
    if (actions.manage) {
      await actions.manage(state, props);
    }
  });
  return (
    <li
      className={classNames(
        "nfd-p-[2px]",
        "nfd-m-0 nfd-border-b nfd-border-line last:nfd-border-b-0",
        state.className,
        "hover:nfd-bg-canvas"
      )}
    >
      <Link
        className={classNames(
          "nfd-rounded-t-md",
          "nfd-flex nfd-items-center nfd-gap-3",
          "nfd-py-4 nfd-px-5",
          "nfd-text-sm nfd-no-underline"
        )}
        target={state?.target || "_self"}
        href={state.url}
        {...(actions.manage && !manageAction.isMutating
          ? { onClick: manageAction.trigger }
          : {})}
      >
        {!state.hideCheck && <CheckCircleIcon
          className={classNames(
            "nfd-w-[1.125rem]",
            state.isCompleted
              ? "nfd-text-[--nfd-ecomemerce-text-success]"
              : "nfd-text-[--nfd-ecommerce-text-light]"
          )}
        />}
        <span className="nfd-flex-1 nfd-text-black" {...(props["data-nfdhelpcenterquery"] 
        ? {"data-nfdhelpcenterquery": props["data-nfdhelpcenterquery"]} 
        : {}
    )} >{props.text}</span>
        {manageAction.isMutating ? (
          <Spinner size="4" className="nfd-text-primary" />
        ) : (
          (state.showText || <ArrowLongRightIcon className="nfd-text-black nfd-w-[1.125rem]" />)
        )}
      </Link>
    </li>
  );
}

const check_url_match = () => {
  const brandName = (NewfoldRuntime?.sdk?.ecommerce?.brand_settings?.name).toLowerCase();
  switch (brandName){
    case "bluehost": 
      return !(BH_UR_REGEX.test(window.location.origin));
    case "hostgator":
      return !(HG_UR_REGEX.test(window.location.origin));
    default: 
     return true;
  }
}

export function OnboardingList(props) {
  let [view, setView] = useState("incomplete");
  let [items] = useCardManager(OnboardingListDefinition(props));
  if (items.length === 0) {
    return (
      <div className="nfd-flex-1 nfd-flex nfd-items-center nfd-text-center nfd-justify-center">
        <Spinner size="8" className="nfd-text-primary" />
      </div>
    );
  }
  let completedItems = items.filter((item) => item.state.isCompleted);
  let incompleteItems = items.filter((item) => !item.state.isCompleted);
  let itemsToDisplay =
    props.isMigrationCompleted ? items.slice(0, 3) : (view === "incomplete" ? incompleteItems.slice(0, 5) : completedItems);

  const migration_text = {
    title: check_url_match() && props.webServersUpdated ? __("Good job!", "wp-module-ecommerce") : __("One last thing to do...", "wp-module-ecommerce"),
    description: check_url_match() && props.webServersUpdated ? __("Your site is now ready for public visitors!", "wp-module-ecommerce") : __("Finish this last step so your migrated site is ready for visitors.", "wp-module-ecommerce")
  }

  return (
    <div className="nfd-grid nfd-grid-rows-[repeat(3,_min-content)] nfd-gap-4">
      <Title size="2">
        {props.isMigrationCompleted ? migration_text.title : NewfoldRuntime.hasCapability("isEcommerce")
          ? __("Next steps for your store", "wp-module-ecommerce")
          : __("Next steps for your site", "wp-module-ecommerce")}
      </Title>
      <p>
        {props.isMigrationCompleted ? migration_text.description : __(
          "You're just a few steps away from sharing your store with the world!",
          "wp-module-ecommerce"
        )}
      </p>
      {view === "incomplete" && itemsToDisplay.length === 0 && (
        <div>
          <p>
            {NewfoldRuntime.hasCapability("isEcommerce")
              ? __(
                  "Great job! You've completed all the current tasks to get your store up and running successfully!",
                  "wp-module-ecommerce"
                )
              : __(
                  "Great job! You've completed all the current tasks to get your site up and running successfully!",
                  "wp-module-ecommerce"
                )}
          </p>
          <br />
          <p>
            {__(
              `If you want to edit any of the info from the steps you've completed, simply click on the "View completed tasks" link below.`,
              "wp-module-ecommerce"
            )}
          </p>
        </div>
      )}
      {itemsToDisplay.length > 0 && (
        <Card as="ul" className="nfd-p-0">
          {itemsToDisplay.map((item) => (
            <OnboardingCheckListItem key={item.name} {...item} />
          ))}
        </Card>
      )}
      {completedItems.length > 0 && (
        <Link
          as="button"
          type="button"
          className="nfd-w-fit nfd-justify-self-end nfd-no-underline"
          onClick={() =>
            setView(view === "completed" ? "incomplete" : "completed")
          }
        >
          {!props.isMigrationCompleted && (view === "completed"
            ? __("View remaining tasks", "wp-module-ecommerce")
            : __("View completed tasks", "wp-module-ecommerce"))}
        </Link>
      )}
    </div>
  );
}
