import { ReactComponent as Arrow } from "./ArrowIcon.svg";

export function Card(props) {
  return (
    <div className="nfd-ecommerce-card">
      <div className="nfd-ecommerce-card-image">{props.children}</div>
      <span className="nfd-ecommerce-card-title">{props.title}</span>
      <a target="_blank" href={props.href} className="nfd-ecommerce-card-link">
        {props.action} <Arrow />
      </a>
    </div>
  );
}
