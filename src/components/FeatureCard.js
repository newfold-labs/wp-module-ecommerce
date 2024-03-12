import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { __ } from "@wordpress/i18n";
import { Button, Card, Link, Title } from "@newfold/ui-component-library";
import { AnalyticsSdk } from "../sdk/analytics";

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
        <Image className="nfd-w-12 nfd-text-[--nfd-ecommerce-text-dark]" />
        <Title size="4" className="nfd-leading-normal nfd-my-4">
          {title}
        </Title>
        {description ? <span>{description}</span> : null}
        {learnMoreUrl && (
          <Link
            className="nfd-flex nfd-mt-4 nfd-items-center nfd-gap-2 nfd-no-underline"
            href={learnMoreUrl}
            target="_blank"
            onClick={() =>
              AnalyticsSdk.track("commerce", title, {
                value: "clicked on the learn more url",
              })
            }
          >
            <span>{__("Learn More", "wp-module-ecommerce")}</span>
            <ArrowLongRightIcon className="nfd-h-5 nfd-text-black" />
          </Link>
        )}
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
            className="nfd-w-full nfd-h-9 nfd-border nfd-flex nfd-items-center nfd-gap-2"
            variant="secondary"
            as="a"
            href={state.featureUrl}
          >
            <span>{actionName}</span>
            {ActionIcon ? <ArrowLongRightIcon /> : null}
          </Button>
        </Card.Footer>
      ) : isUpsellNeeded ? (
        <Card.Footer>
          <Button
            className="nfd-w-full nfd-h-9 nfd-border nfd-flex nfd-items-center nfd-gap-2"
            variant="upsell"
            as="a"
            target="_blank"
            data-action="load-nfd-ctb"
            data-ctb-id={state?.upsellOptions?.clickToBuyId}
            href={state.upsellOptions?.primaryUrl}
          >
            {__("Purchase", "wp-module-ecommerce")}
            {ActionIcon && !isInstalling ? <ArrowLongRightIcon /> : null}
          </Button>
        </Card.Footer>
      ) : (
        <Card.Footer>
          <Button
            className="nfd-w-full nfd-h-9 nfd-border nfd-flex nfd-items-center nfd-gap-2"
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
