import { Button, Title } from "@yoast/ui-library";
import classNames from "classnames";

const Container = ({ className, children, showShadowBox = true }) => {
  return (
    <div
      className={classNames({"yst-shadow": showShadowBox},
        "wppb-app-section-container yst-bg-white yst-w-full yst-rounded-lg ",
        className
      )}
    >
      {children}
    </div>
  );
};

const Header = ({
  title,
  subTitle,
  className,
  primaryAction = { title: false, className: false, onClick: false },
  secondaryAction = { title: false, className: false, onClick: false },
}) => {
  return (
    <div
      className={classNames(
        "wppb-app-section-header yst-p-8 yst-border-b yst-border-line",
        "yst-flex yst-flex-col xl:yst-flex-row yst-items-baseline yst-gap-4",
        className
      )}
    >
      <div className="xl:yst-w-7/12 yst-flex yst-flex-col yst-gap-3">
        {title && (
          <h2 className="yst-text-2xl yst-font-medium yst-text-title">
            {title}
          </h2>
        )}
        {subTitle && <p>{subTitle}</p>}
      </div>
      {(primaryAction.title || secondaryAction.title) && (
        <div className="xl:yst-w-5/12 yst-flex yst-flex-row-reverse yst-flex-wrap yst-gap-3">
          {primaryAction.title && (
            <Button
              as="button"
              variant="primary"
              className={classNames(
                "yst-w-full min-[400px]:yst-w-auto",
                primaryAction.className
              )}
              onClick={primaryAction.onClick}
            >
              {primaryAction.title}
            </Button>
          )}
          {secondaryAction.title && (
            <Button
              as="button"
              variant="secondary"
              className={classNames(
                "yst-w-full min-[400px]:yst-w-auto",
                secondaryAction.className
              )}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.title}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

const Content = ({ separator = false, className, children }) => {
  return (
    <div
      className={classNames(
        "wppb-app-section-content yst-p-8 yst-pb-0",
        className
      )}
    >
      <div
        className={classNames(
          "yst-pb-8",
          separator && "yst-border-b yst-border-[#CBD5E1]"
        )}
      >
        {children}
      </div>
    </div>
  );
};

function Block({ title, subtitle, children, className }) {
  return (
    <div className={`yst-bg-white ${className}`}>
      <Title size={4}>{title}</Title>
      <div style={{ height: "10px" }} />
      <span className="yst-text-sm">{subtitle}</span>
      {children}
    </div>
  );
}

const Settings = ({ className, children, title, description }) => {
  return (
    <section
      className={classNames(
        "yst-grid 2xl:yst-grid-cols-3 2xl:yst-gap-12",
        className
      )}
    >
      <div className="yst-col-span-1">
        <div className="yst-max-w-screen-sm">
          <Title as="h4" size="4">
            {title}
          </Title>
          {description && <p className="yst-mt-2">{description}</p>}
        </div>
      </div>

      <fieldset className="yst-min-w-0 yst-mt-8 2xl:yst-mt-0 2xl:yst-col-span-2">
        <legend className="yst-sr-only">{title}</legend>
        <div className="yst-space-y-4">{children}</div>
      </fieldset>
    </section>
  );
};

export const Section = {
  Block,
  Container,
  Content,
  Header,
  Settings,
};
