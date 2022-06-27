import "../styles.scss";
import { ReactComponent as Arrow } from "./ArrowIcon.svg";

export function Card(props) {
  return (
    <div className="nfd-ecommerce-card">
      <div className="nfd-ecommerce-card-image">{props.image}</div>
      <span className="nfd-ecommerce-card-title">{props.title}</span>
      <a className="nfd-ecommerce-card-link">
        Set Info <Arrow />{" "}
      </a>
    </div>
  );
}
