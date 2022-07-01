import { ReactComponent as Arrow } from "../icons/goto-arrow.svg";

export function Card(props) {
  return (
    <div className="nfd-ecommerce-card" data-variant={props.variant}>
      {props.variant === "extended" || "extended-selected" ? (
        <div className="nfd-ecommerce-card-image">
          <div className="nfd-ecommerce-card-circle">{props.children}</div>
        </div>
      ) : (
        <div className="nfd-ecommerce-card-image">{props.children}</div>
      )}

      <span className="nfd-ecommerce-card-title">
        {props.title}
        {props.variant === "extended" || "extended-selected" ? (
          <div className="nfd-ecommerce-card-subtitle">{props.description}</div>
        ) : null}
        {props.href ? (
          <a href={props.href} className="nfd-ecommerce-card-link">
            {props.action} {props.variant !== "minimal" ? <Arrow /> : null}
          </a>
        ) : null}
      </span>
    </div>
  );
}
