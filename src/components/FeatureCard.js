import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { __ } from "@wordpress/i18n";
import { Button, Card, Link, Title } from "@yoast/ui-library";

/**
 * @typedef FeatureCardState
 * @property {boolean} isInstalling
 * @property {boolean} isActionExternal
 * @property {boolean} isDisabled
 * @property {boolean} isActive
 * @property {boolean} isQueueEmpty
 * @property {boolean} isUpsellNeeded
 *
 * @typedef FeatureCardActions
 * @property {(state: FeatureCardState) => void} buttonClick
 *
 * @typedef FeatureCardText
 * @property {string} actionName
 * @property {string} description
 * @property {string} slug
 * @property {string} title
 *
 * @param {{
 *  state: FeatureCardState;
 *  actions: FeatureCardActions;
 *  text: (state: FeatureCardState) => FeatureCardText;
 *  assets: (state: FeatureCardState) => { image: JSX.Element; learnMoreUrl: string; };
 * }} props
 * @returns
 */
export function FeatureCard({ state, actions, assets, text }) {
  let { image: Icon, learnMoreUrl } = assets(state);
  let { title, actionName, description } = text(state);
  const { isDisabled, isInstalling, isActionExternal } = state;
  const isInstallDisabled =
    !state.isActive && !state.isQueueEmpty && !isInstalling;
  return (
    <Card>
      <Card.Content>
        <Icon />
        <Title size={4} className="yst-leading-normal yst-my-4">
          {title}
        </Title>
        {description ? <span>{description}</span> : null}
        <Link
          className="yst-flex yst-mt-4 yst-items-center yst-gap-2 yst-no-underline"
          href={learnMoreUrl}
          target="_blank"
        >
          <span>{__("Learn More", "wp-module-ecommerce")}</span>
          <ArrowLongRightIcon className="yst-h-5 yst-text-black" />
        </Link>
      </Card.Content>
      {isInstallDisabled ? (
        <Card.Footer>
          <span>
            {__(
              "please wait while other features are installed...",
              "wp-module-ecommerce"
            )}
          </span>
        </Card.Footer>
      ) : (
        <Card.Footer>
          <Button
            className="yst-w-full yst-h-9 yst-border yst-flex yst-items-center yst-gap-2"
            variant={state.isUpsellNeeded ? "upsell" : "secondary"}
            onClick={() => actions.buttonClick(state)}
            isLoading={isInstalling}
            disabled={isDisabled}
          >
            <span>
              {isInstalling
                ? __("Installing...", "wp-module-ecommerce")
                : state.isUpsellNeeded
                ? __("Purchase", "wp-module-ecommerce")
                : actionName}
            </span>
            {isActionExternal && !isInstalling ? <ArrowLongRightIcon /> : null}
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
}
