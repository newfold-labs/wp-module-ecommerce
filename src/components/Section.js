import { Button, Title } from "@newfold/ui-component-library";
import classNames from "classnames";

const Container = ({ className, children, id = "", showShadowBox = true }) => {
  return (
    <div
      className={classNames(
        "nfd-app-section-container nfd-bg-white nfd-w-full nfd-rounded-lg",
        className
      )}
      id={id}
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
        "nfd-app-section-header nfd-p-8 nfd-border-b nfd-border-line",
        "nfd-flex nfd-flex-col xl:nfd-flex-row nfd-items-baseline nfd-gap-4",
        className
      )}
    >
      <div className="xl:nfd-w-7/12 nfd-flex nfd-flex-col nfd-gap-3">
        {title && (
          <h2 className="nfd-text-2xl nfd-font-medium nfd-text-title">
            {title}
          </h2>
        )}
        {subTitle && <p>{subTitle}</p>}
      </div>
      {(primaryAction.title || secondaryAction.title) && (
        <div className="xl:nfd-w-5/12 nfd-flex nfd-flex-row-reverse nfd-flex-wrap nfd-gap-3">
          {primaryAction.title && (
            <Button
              as="button"
              variant="primary"
              className={classNames(
                "nfd-w-full min-[400px]:nfd-w-auto",
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
                "nfd-w-full min-[400px]:nfd-w-auto",
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

const Content = ({ separator = false, className, subClassName, children }) => {
  return (
    <div
      className={classNames(
        "nfd-app-section-content nfd-p-8 nfd-pb-0",
        className
      )}
      id={className}
    >
      <div
        className={classNames(
          "nfd-pb-8",
          separator && "nfd-border-b nfd-border-[#CBD5E1]",
          subClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};

function Block({ title, subtitle, children, className }) {
  return (
    <div className={`nfd-bg-white ${className}`}>
      <Title size="4">{title}</Title>
      <div style={{ height: "10px" }} />
      <span className="nfd-text-sm">{subtitle}</span>
      {children}
    </div>
  );
}

const Settings = ({ className, children, title, description }) => {
  return (
    <section
      className={classNames(
        "nfd-grid 2xl:nfd-grid-cols-3 2xl:nfd-gap-12",
        className
      )}
    >
      <div className="nfd-col-span-1">
        <div className="nfd-max-w-screen-sm">
          <Title as="h4" size="4">
            {title}
          </Title>
          {description && <p className="nfd-mt-2">{description}</p>}
        </div>
      </div>

      <fieldset className="nfd-min-w-0 nfd-mt-8 2xl:nfd-mt-0 2xl:nfd-col-span-2">
        <legend className="nfd-sr-only">{title}</legend>
        <div className="nfd-space-y-4">{children}</div>
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
