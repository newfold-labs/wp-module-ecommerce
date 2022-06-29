import { ReactComponent as Arrow } from "./ArrowIcon.svg";

export function Card(props) {
  return (
    <div className="nfd-ecommerce-card" data-variant={props.variant}>
      <div className="nfd-ecommerce-card-image">{props.children}</div>
      <span className="nfd-ecommerce-card-title">
        {props.title}
        {props.href ? (
          <a
            target="_blank"
            href={props.href}
            className="nfd-ecommerce-card-link"
          >
            {props.action} {props.variant === "standard" ? <Arrow /> : null}
          </a>
        ) : null}
      </span>
    </div>
  );
}
