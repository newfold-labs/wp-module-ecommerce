import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { __ } from "@wordpress/i18n";
import { Title } from "@newfold/ui-component-library";
import { ReactComponent as WelcomeIllustration } from "../icons/store-live.svg";
import { ReactComponent as StorePendingIllustration } from "../icons/store-pending.svg";
import { OnboardingList } from "./OnboardingList";
import { Section } from "./Section";
import { SiteStatus } from "./SiteStatus";
import classNames from "classnames";

const Text = {
  Pending: {
    title: NewfoldRuntime.hasCapability("isEcommerce")
      ? __("Congrats on your new store!", "wp-module-ecommerce")
      : __("Congrats on your new site!", "wp-module-ecommerce"),
    description: NewfoldRuntime.hasCapability("isEcommerce")
      ? __(
          "You're just a few steps away from sharing your store with the world!",
          "wp-module-ecommerce"
        )
      : __(
          "You're just a few steps away from sharing your site with the world!",
          "wp-module-ecommerce"
        ),
    Illustration: StorePendingIllustration,
  },
  Live: {
    title: __("Ready to go to the next level?", "wp-module-ecommerce"),
    description: NewfoldRuntime.hasCapability("isEcommerce")
      ? __(
          "Increase your store's performance by helping people find your store and engaging more with them once they have.",
          "wp-module-ecommerce"
        )
      : __(
          "Increase your site's performance by helping people find your site and engaging more with them once they have.",
          "wp-module-ecommerce"
        ),
    Illustration: WelcomeIllustration,
  },
};

export function OnboardingScreen({ comingSoon, toggleComingSoon, notify, showShadowBox }) {
  const { title, description, Illustration } = comingSoon
    ? Text.Pending
    : Text.Live;
  return (
    <Section.Container className="wppbh-welcome-section" showShadowBox={showShadowBox}>
      <Section.Header title="Home" />
      <Section.Content className="wppbh-app-section-home">
        <div className="nfd-flex nfd-flex-col nfd-gap-6">
          <div
            className={classNames(
              "nfd-grid nfd-gap-6 nfd-min-h-[350px]",
              "sm:nfd-grid-cols-1",
              "lg:nfd-grid-cols-2"
            )}
          >
            <div className="nfd-flex nfd-flex-col nfd-gap-4">
              <Title size={2}>{title}</Title>
              <span className="nfd-text-[--nfd-ecommerce-text-info] nfd-text-sm">
                {description}
              </span>
              <Illustration className="nfd-m-auto" />
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
