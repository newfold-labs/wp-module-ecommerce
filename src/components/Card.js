import { ReactComponent as Arrow } from "../icons/ArrowIcon.svg";

export function Card(props) {
  return (
    <div className="nfd-ecommerce-card" data-variant={props.variant}>
      <div className="nfd-ecommerce-card-image">{props.children}</div>
      <span className="nfd-ecommerce-card-title">
        {props.title}
        {props.variant === "extended" ? (
          <div className="nfd-ecommerce-card-subtitle">
            {props.description}
          </div>
        ) : null}
        {props.href ? (
          <a
            target="_blank"
            href={props.href}
            className="nfd-ecommerce-card-link"
          >
            {props.action}{" "}
            {props.variant === "standard" || "extended" ? <Arrow /> : null}
          </a>
        ) : null}
      </span>
    </div>
  );
}
