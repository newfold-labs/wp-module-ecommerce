import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { __ } from "@wordpress/i18n";
import { Button, Title, Alert } from "@newfold/ui-component-library";
import { ReactComponent as WelcomeIllustration } from "../icons/store-live.svg";
import { ReactComponent as ComingSoonIllustration } from "../icons/coming-soon.svg";
import { OnboardingList } from "./OnboardingList";
import { Section } from "./Section";
import { SiteStatus } from "./SiteStatus";
import classNames from "classnames";
import { useState } from "@wordpress/element";

const Text = {
  Pending: {
    title: NewfoldRuntime.hasCapability("isEcommerce")
      ? __("Congrats on your new store!", "wp-module-ecommerce")
      : __("Congrats on your new site!", "wp-module-ecommerce"),
    description: __(
      "Your site is currently displaying a \"Coming Soon\" page.",
      "wp-module-ecommerce"
    ),
    Illustration: ComingSoonIllustration,
  },
  Live: {
    title: __("Ready to go to the next level?", "wp-module-ecommerce"),
    description: __("Your site is live to the world!", "wp-module-ecommerce"),
    Illustration: WelcomeIllustration,
  },
};

export function OnboardingScreen({
  comingSoon,
  toggleComingSoon,
  notify,
  showShadowBox,
}) {
  const { title, description, Illustration } = comingSoon
    ? Text.Pending
    : Text.Live;

  const [hovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const media = {
    '@media (max-width: 640px)':{
        width: "420px" ,
    },
    '@media (min-width: 641px) and (max-width: 1024px)':{
      width: "520px" ,
  }
}
  return (
    <Section.Container
      className="nfd-welcome-section"
      showShadowBox={showShadowBox}
    >
      <Section.Header title={__("Home", "wp-module-ecommerce")} />
      <Section.Content className="nfd-app-section-home">
        <div className="nfd-flex nfd-flex-col nfd-gap-6">
          <div
            className={classNames(
              "nfd-grid nfd-gap-6 nfd-min-h-[350px]",
              "sm:nfd-grid-cols-1",
              "xl:nfd-grid-cols-2"
            )}
          >
            <div className="nfd-flex nfd-flex-col nfd-justify-start nfd-items-start nfd-gap-4">
              <Title size={2}>{title}</Title>
              <p>
                {comingSoon ? (
                  <Alert
                    variant="warning"
                    className="nfd-text-red-600 nfd-text-sm nfd-bg-transparent nfd-p-0 "
                  >
                    {description}
                  </Alert>
                ) : (
                  <span className="nfd-text-[--nfd-ecommerce-text-info] nfd-text-sm">
                    {description}
                  </span>
                )}
              </p>
              <div
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseLeave}
                className="nfd-relative  nfd-flex-col nfd-justify-center nfd-items-center nfd-rounded-lg nfd-border-[#CBD5E1]"
              >
                <div className="nfd-flex nfd-justify-center nfd-items-center nfd-bg-gray-200">
                  <p className="nfd-font-bold">{__("SITE PREVIEW", "wp-module-ecommerce")}</p>
                </div>
                {comingSoon ? (
                  <div className="nfd-flex-col" style={{
                    media}}>
                    <Illustration />
                  </div>
                ) : (
                  <div className="nfd-flex-col">
                    <div
                      style={{
                        media,
                        height: "216px",
                        boxSizing: "content-box",
                        zIndex: "2",
                        opacity: "1",
                        border: "solid 1px #000",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems:"center"
                      }}
                    >
                      <iframe
                        className="mini-preview-frame"
                        src={window.location.origin}
                        scrolling="no"
                        style={{width: "400%", minHeight: "400%", transform: "scale(0.25)", backgroundColor: "rgb(255, 255, 255)", flexBasis: "fit-content", overflow: "hidden"}}
                      ></iframe>
                    </div>
                  </div>
                )}
                <div
                  className="nfd-absolute"
                  style={{
                    top: "43%",
                    left: "38%",
                    visibility: hovered ? "visible" : "hidden",
                    transition: "all 0.8s ease-in-out 0.4s",
                  }}
                >
                  <Button
                    as="a"
                    className="nfd-bg-canvas"
                    href={
                      NewfoldRuntime.hasCapability("isEcommerce")
                        ? `${NewfoldRuntime.siteDetails.url}/shop`
                        : NewfoldRuntime.siteDetails.url
                    }
                    target="_blank"
                    variant="secondary"
                  >
                    {__("View your site", "wp-module-ecommerce")}
                  </Button>
                </div>
              </div>
            </div>
            <OnboardingList notify={notify} />
          </div>
          <SiteStatus
            comingSoon={comingSoon}
            notify={notify}
            toggleComingSoon={toggleComingSoon}
          />
        </div>
      </Section.Content>
    </Section.Container>
  );
}
