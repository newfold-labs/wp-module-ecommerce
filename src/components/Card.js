import { ReactComponent as Arrow } from "../icons/goto-arrow.svg";

export function Card({
  children,
  title,
  description,
  action,
  href,
  variant,
  ...props
}) {
  return (
    <div className="nfd-ecommerce-card" data-variant={variant} {...props}>
      {variant === "extended" ? (
        <div className="nfd-ecommerce-card-image">
          <div className="nfd-ecommerce-card-circle">{children}</div>
        </div>
      ) : (
        <div className="nfd-ecommerce-card-image">{children}</div>
      )}
      <span className="nfd-ecommerce-card-title">
        {title}
        {description && variant === "extended" ? (
          <div className="nfd-ecommerce-card-subtitle">{description}</div>
        ) : null}
        {href ? (
          <a href={href} className="nfd-ecommerce-card-link">
            {action} {variant !== "minimal" ? <Arrow /> : null}
          </a>
        ) : null}
      </span>
    </div>
  );
}
