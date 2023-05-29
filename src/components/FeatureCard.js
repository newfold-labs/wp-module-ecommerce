import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { __ } from "@wordpress/i18n";
import { Button, Card, Link, Title } from "@yoast/ui-library";

/**
 * @typedef FeatureCardState
 * @property {string} featureUrl
 * @property {boolean} isInstalling
 * @property {boolean} isDisabled
 * @property {boolean} isActive
 * @property {boolean} isQueueEmpty
 * @property {boolean} isUpsellNeeded
 * @property {{clickToBuyId: string; primaryUrl: string}?} upsellOptions
 *
 * @typedef FeatureCardActions
 * @property {(state: FeatureCardState, props: any) => void} triggerUpsell
 * @property {(state: FeatureCardState, props: any) => void} manageFeature
 * @property {(state: FeatureCardState, props: any) => void} installFeature
 *
 * @typedef FeatureCardText
 * @property {string} actionName
 * @property {string} description
 * @property {string} title
 *
 * @param {{
 *  state: FeatureCardState;
 *  actions: FeatureCardActions;
 *  text: (state: FeatureCardState) => FeatureCardText;
 *  assets: (state: FeatureCardState) => { Image: JSX.Element; ActionIcon: JSX.Element; learnMoreUrl: string; };
 * }} props
 * @returns
 */
export function FeatureCard({ state, actions, assets, text, ...props }) {
  let { Image, ActionIcon, learnMoreUrl } = assets(state);
  let { title, actionName, description } = text(state);
  const { isDisabled, isInstalling, isUpsellNeeded } = state;
  const isInstallDisabled =
    !state.isActive && !state.isQueueEmpty && !isInstalling;
  return (
    <Card>
      <Card.Content>
        <Image className="yst-w-12" />
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
      ) : state.isActive && state.featureUrl !== null ? (
        <Card.Footer>
          <Button
            className="yst-w-full yst-h-9 yst-border yst-flex yst-items-center yst-gap-2"
            variant="secondary"
            as="a"
            href={state.featureUrl}
          >
            <span>{actionName}</span>
            {ActionIcon ? <ActionIcon /> : null}
          </Button>
        </Card.Footer>
      ) : isUpsellNeeded ? (
        <Card.Footer>
          <Button
            className="yst-w-full yst-h-9 yst-border yst-flex yst-items-center yst-gap-2"
            variant="upsell"
            as="a"
            target="_blank"
            {...(state.upsellOptions?.clickToBuyId
              ? {
                  "data-action": "load-nfd-ctb",
                  "data-ctb-id": state.upsellOptions.clickToBuyId,
                }
              : {})}
            href={state.upsellOptions?.primaryUrl}
          >
            <span>{__("Purchase", "wp-module-ecommerce")}</span>
            {ActionIcon && !isInstalling ? <ArrowLongRightIcon /> : null}
          </Button>
        </Card.Footer>
      ) : (
        <Card.Footer>
          <Button
            className="yst-w-full yst-h-9 yst-border yst-flex yst-items-center yst-gap-2"
            variant="secondary"
            onClick={() =>
              state.isActive
                ? actions.manageFeature?.(state, props)
                : actions.installFeature?.(state, props)
            }
            isLoading={isInstalling}
            disabled={isDisabled}
          >
            <span>
              {isInstalling
                ? __("Installing...", "wp-module-ecommerce")
                : actionName}
            </span>
            {ActionIcon && !isInstalling ? <ArrowLongRightIcon /> : null}
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
}
