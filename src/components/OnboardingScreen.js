import { __ } from "@wordpress/i18n";
import { Title } from "@yoast/ui-library";
import { ReactComponent as WelcomeIllustration } from "../icons/store-live.svg";
import { ReactComponent as StorePendingIllustration } from "../icons/store-pending.svg";
import { RuntimeSdk } from "../sdk/runtime";
import { OnboardingList } from "./OnboardingList";
import { Section } from "./Section";
import { SiteStatus } from "./SiteStatus";

const Text = {
  Pending: {
    title: RuntimeSdk.hasCapability("isEcommerce")
      ? __("Congrats on your new store!", "wp-module-ecommerce")
      : __("Congrats on your new site!", "wp-module-ecommerce"),
    description: RuntimeSdk.hasCapability("isEcommerce")
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
    description: RuntimeSdk.hasCapability("isEcommerce")
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

export function OnboardingScreen({ comingSoon, toggleComingSoon, notify }) {
  const { title, description, Illustration } = comingSoon
    ? Text.Pending
    : Text.Live;
  return (
    <Section.Container className="wppbh-welcome-section">
      <Section.Header title="Home" />
      <Section.Content className="wppbh-app-section-home">
        <div className="yst-flex yst-flex-col yst-gap-6">
          <div className="yst-grid yst-gap-6 yst-min-h-[350px] sm:yst-grid-cols-1 lg:yst-grid-cols-2">
            <div className="yst-flex yst-flex-col yst-gap-4">
              <Title size={2}>{title}</Title>
              <span className="yst-text-[#495C77] yst-text-sm">
                {description}
              </span>
              <Illustration className="yst-m-auto" />
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
