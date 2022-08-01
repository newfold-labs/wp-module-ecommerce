import { ReactComponent as Arrow } from "../icons/goto-arrow.svg";

export function Card({
  children,
  title,
  description,
  action,
  href,
  variant,
  status = "ready",
  ...props
}) {
  let Action =
    status === "ready"
      ? Arrow
      : () => <div className="bwa-loader nfd-ecommerce-loader-mini" />;
  return (
    <button
      className="nfd-ecommerce-card"
      data-variant={variant}
      type="button"
      disabled={status !== "ready"}
      onClick={() => {
        let [page, qs] = href.split("?");
        let query = new URLSearchParams(qs);
        if (query.get("page")?.startsWith("bluehost") || page.startsWith("customize")) {
          window.location.href = href;
        } else {
          query.set("return_to_nfd", window.location.hash.replace("#", ""));
          window.location.href = `${page}?${query}`;
        }
      }}
      {...props}
    >
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
        {action ? (
          <span className="nfd-ecommerce-card-link">
            {action} {variant !== "minimal" ? <Action /> : null}
          </span>
        ) : null}
      </span>
    </button>
  );
}
