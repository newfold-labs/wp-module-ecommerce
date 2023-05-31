import { __ } from "@wordpress/i18n";
import { Title } from "@yoast/ui-library";
import { ReactComponent as WelcomeIllustration } from "../icons/store-live.svg";
import { ReactComponent as StorePendingIllustration } from "../icons/store-pending.svg";
import { OnboardingList } from "./OnboardingList";
import { Section } from "./Section";
import { SiteStatus } from "./SiteStatus";

const Text = {
  Pending: {
    title: __("Congrats on your new store!", "wp-module-ecommerce"),
    description: __(
      "You're just a few steps away from sharing your site with the world!",
      "wp-module-ecommerce"
    ),
    Icon: StorePendingIllustration,
  },
  Live: {
    title: __("Ready to go to the next level?", "wp-module-ecommerce"),
    description: __(
      "Increase your store's performance by helping people find your store and engaging more with them once they have.",
      "wp-module-ecommerce"
    ),
    Icon: WelcomeIllustration,
  },
};

export function OnboardingScreen({ comingSoon, toggleComingSoon, notify }) {
  const { title, description, Icon } = comingSoon ? Text.Pending : Text.Live;
  return (
    <Section.Container>
      <Section.Header title="Home" />
      <Section.Content>
        <div className="yst-flex yst-flex-col yst-gap-6">
          <div className="yst-grid yst-grid-cols-2 yst-gap-6 yst-min-h-[350px]">
            <div className="yst-flex yst-flex-col yst-gap-4">
              <Title size={2}>{title}</Title>
              <span className="yst-text-[#495C77] yst-text-sm">
                {description}
              </span>
              <Icon className="yst-m-auto" />
            </div>
            <OnboardingList />
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
