import { Button, Card, Link, Title } from "@newfold/ui-component-library";
import { __ } from "@wordpress/i18n";
import { AnalyticsSdk } from "../sdk/analytics";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";

export function YithFeatureCard({
  yithProducts: { name, description, primaryUrl, clickToBuyId },
  yithPluginsMap,
  id,
  cards,
}) {
  const cardsInfo = cards.filter(
    (card) => card.name === yithPluginsMap.get(id).title
  )[0];
  const state = cardsInfo?.state;
  const isInstallDisabled =
    !state?.isActive && !state?.isQueueEmpty && !state?.isInstalling;
  return (
    <Card>
      <Card.Content>
        <img
          src={yithPluginsMap.get(id).image}
          className="nfd-w-12 nfd-text-[--nfd-ecommerce-text-dark]"
        />
        <Title size="4" className="nfd-leading-normal nfd-my-4">
          {name}
        </Title>
        {description ? <span>{description}</span> : null}
        <br />
        <br />
        {yithPluginsMap.get(id).learnMore && (
          <Link
            className="nfd-flex nfd-mt-4 nfd-items-center nfd-gap-2 nfd-no-underline"
            href={yithPluginsMap.get(id).learnMore}
            target="_blank"
            onClick={() =>
              AnalyticsSdk.track("commerce", name, {
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
      ) : state?.isActive && state?.featureUrl !== null ? (
        <Card.Footer>
          <Button
            className="nfd-w-full nfd-h-9 nfd-border nfd-flex nfd-items-center nfd-gap-2"
            variant="secondary"
            as="a"
            href={state?.featureUrl}
          >
            <span>{state?.isActive ? __("Manage") : __("Enable")}</span>
          </Button>
        </Card.Footer>
      ) : state?.isUpsellNeeded ? (
        <Card.Footer>
          {id !== "e307cb8f-24b5-46e1-81e3-83de32c62c78" ? (
            <Button
              className="nfd-w-full nfd-h-9 nfd-border nfd-flex nfd-items-center nfd-gap-2"
              variant="upsell"
              as="a"
              target="_blank"
              data-action="load-nfd-ctb"
              data-ctb-id={clickToBuyId}
              href={primaryUrl}
            >
              {__("Purchase", "wp-module-ecommerce")}
            </Button>
          ) : (
            <Button
              className="nfd-w-full nfd-h-9 nfd-border nfd-flex nfd-items-center nfd-gap-2"
              variant="upsell"
              as="a"
              target="_blank"
              href={primaryUrl}
            >
              {__("Purchase", "wp-module-ecommerce")}
            </Button>
          )}
        </Card.Footer>
      ) : (
        <Card.Footer>
          <Button
            className="nfd-w-full nfd-h-9 nfd-border nfd-flex nfd-items-center nfd-gap-2"
            variant="secondary"
            onClick={() =>
              state?.isActive
                ? cardsInfo?.actions?.manageFeature?.(
                    cardsInfo?.state,
                    cardsInfo
                  )
                : cardsInfo?.actions?.installFeature?.(
                    cardsInfo?.state,
                    cardsInfo
                  )
            }
            isLoading={state?.isInstalling}
            disabled={state?.isDisabled}
          >
            <span>
              {state?.isInstalling
                ? __("Installing...", "wp-module-ecommerce")
                : state?.isActive
                ? __("Manage")
                : __("Enable")}
            </span>
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
}
