import { DropdownMenu } from "@wordpress/components";
import { arrowRight } from "@wordpress/icons";
import { ReactComponent as Arrow } from "../icons/goto-arrow.svg";

export function MultipleActionsCard(props) {
  let { Icon } = props.assets(props.state);
  let { title, actionName } = props.text(props.state);
  let Action = !props.isLoading
    ? Arrow
    : () => <div className="bwa-loader nfd-ecommerce-loader-mini" />;

  return (
    <DropdownMenu
      icon={null}
      label={actionName}
      popoverProps={{
        className: "multi-actions-popover",
        position: "middle right",
        noArrow: false,
      }}
      className="nfd-ecommerce-card"
      data-variant="standard"
      toggleProps={{
        className: "nfd-ecommerce-card",
        "data-variant": "standard",
        type: "button",
        style: { fontSize: "inherit", height: "auto", border: "none" },
        children: (
          <>
            <div className="nfd-ecommerce-card-image">
              <Icon />
            </div>
            <span className="nfd-ecommerce-card-title">
              {title}
              <span className="nfd-ecommerce-card-link">
                {actionName} <Action />
              </span>
            </span>
          </>
        ),
      }}
      controls={props.state.controls.map((control) => ({
        title: control.title,
        icon: arrowRight,
        onClick: () =>
          props.actions.onSelectAction(props.state, control.action, {}),
      }))}
    />
  );
}
