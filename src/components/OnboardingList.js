import {
  ArrowLongRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { NewfoldRuntime } from "@newfold-labs/wp-module-runtime";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Card, Link, Spinner, Title } from "@yoast/ui-library";
import useSWRMutation from "swr/mutation";
import { OnboardingListDefinition } from "../configs/OnboardingList.config";
import { useCardManager } from "./useCardManager";

function OnboardingCheckListItem({ children, actions, state, ...props }) {
  let manageAction = useSWRMutation(props.name, async () => {
    if (actions.manage) {
      await actions.manage(state, props);
    }
  });
  return (
    <li
      className={classNames(
        "yst-p-[2px]",
        "yst-m-0 yst-border-b yst-border-line last:yst-border-b-0",
        "hover:yst-bg-canvas"
      )}
    >
      <Link
        className={classNames(
          "yst-rounded-t-md",
          "yst-flex yst-items-center yst-gap-3",
          "yst-py-4 yst-px-5",
          "yst-text-sm yst-no-underline"
        )}
        href={state.url}
        {...(actions.manage && !manageAction.isMutating
          ? { onClick: manageAction.trigger }
          : {})}
      >
        <CheckCircleIcon
          className={classNames(
            "yst-w-[1.125rem]",
            state.isCompleted ? "yst-text-[--nfd-ecomemerce-text-success]" : "yst-text-[--nfd-ecommerce-text-light]"
          )}
        />
        <span className="yst-flex-1 yst-text-black">{props.text}</span>
        {manageAction.isMutating ? (
          <Spinner size={4} className="yst-text-primary" />
        ) : (
          <ArrowLongRightIcon className="yst-text-black yst-w-[1.125rem]" />
        )}
      </Link>
    </li>
  );
}

export function OnboardingList(props) {
  let [view, setView] = useState("incomplete");
  let [items] = useCardManager(OnboardingListDefinition(props));
  if (items.length === 0) {
    return (
      <div className="yst-flex-1 yst-flex yst-items-center yst-text-center yst-justify-center">
        <Spinner size={8} className="yst-text-primary" />
      </div>
    );
  }
  let completedItems = items.filter((item) => item.state.isCompleted);
  let incompleteItems = items.filter((item) => !item.state.isCompleted);
  let itemsToDisplay =
    view === "incomplete" ? incompleteItems.slice(0, 5) : completedItems;
  return (
    <div className="yst-grid yst-grid-rows-[repeat(3,_min-content)] yst-gap-4">
      <Title size={2}>
        {NewfoldRuntime.hasCapability("isEcommerce")
          ? __("Next steps for your store", "wp-module-ecommerce")
          : __("Next steps for your site", "wp-module-ecommerce")}
      </Title>
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
        <Card as="ul" className="yst-p-0">
          {itemsToDisplay.map((item) => (
            <OnboardingCheckListItem key={item.name} {...item} />
          ))}
        </Card>
      )}
      {completedItems.length > 0 && (
        <Link
          as="button"
          type="button"
          className="yst-w-fit yst-justify-self-end yst-no-underline"
          onClick={() =>
            setView(view === "completed" ? "incomplete" : "completed")
          }
        >
          {view === "completed"
            ? __("View remaining tasks", "wp-module-ecommerce")
            : __("View completed tasks", "wp-module-ecommerce")}
        </Link>
      )}
    </div>
  );
}
