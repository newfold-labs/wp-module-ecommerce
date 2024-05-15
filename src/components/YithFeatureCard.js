import { Button, Card, Title } from "@newfold/ui-component-library";
import { __ } from "@wordpress/i18n";

export function YithFeatureCard({
  setIsOpen,
  setPluginName,
  yithPluginsMap,
  id,
  cards,
}) {
  const cardsInfo = cards.filter(
    (card) => card.name === yithPluginsMap.get(id).title
  )[0];
  const state = cardsInfo?.state;

  useEffect(() => {
    setPluginName(cardsInfo?.text(state)?.title);
    state?.isInstalling ? setIsOpen(true) : setIsOpen(false)
  }, [state?.isInstalling])

  return (
    <Card id={yithPluginsMap.get(id).title}>
      <Card.Content className={"nfd-flex nfd-flex-col nfd-gap-3"}>
        <div className={"nfd-flex nfd-flex-row nfd-gap-3 nfd-items-center"}>
          <img
            src={cardsInfo?.assets().Image}
            className="nfd-w-12 nfd-text-[--nfd-ecommerce-text-dark]"
          />
          <Title size="4" className="nfd-leading-normal nfd-my-4">
            {cardsInfo?.text(state)?.title}
          </Title>
        </div>
        <span>{cardsInfo?.text(state)?.description}</span>
      </Card.Content>
      <Card.Footer className={"nfd-border-0 nfd-p-0"}>
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
          as="a"
          href={state?.featureUrl}
          isLoading={state?.isInstalling}
          disabled={state?.isDisabled}
          id={state?.isInstalling
            ? "installing_" + yithPluginsMap.get(id).title
            : state?.isActive
              ? "manage_" + yithPluginsMap.get(id).title
              : "enable_" + yithPluginsMap.get(id).title}
        >
          <span>
            {state?.isInstalling
              ? __("Installing...", "wp-module-ecommerce")
              : cardsInfo?.text(state).actionName}
          </span>
        </Button>
      </Card.Footer>
    </Card>
  );
}
