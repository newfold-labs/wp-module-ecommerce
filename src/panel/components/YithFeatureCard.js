import { Button, Card, Title } from "@newfold/ui-component-library";
import { useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useInstallWonderCart } from "./useInstallWonderCart";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { AnalyticsSdk } from "../sdk/analytics";

export function YithFeatureCard({
  setIsOpen,
  setPluginName,
  yithPluginsMap,
  id,
  cards,
  wpModules
}) {
  const cardsInfo = cards.filter(
    (card) => card.name === yithPluginsMap.get(id).title
  )[0];
  const state = cardsInfo?.state;
  let [installWonderCart, isInstalling] = useInstallWonderCart({ wpModules });

  useEffect(() => {
    setPluginName(cardsInfo?.text(state)?.title);
    (state?.isInstalling && !state?.isActive) ? setIsOpen(true) : setIsOpen(false)
  }, [state?.isInstalling])

  useEffect(() => {
    setPluginName(cardsInfo?.text(state)?.title);
    isInstalling ? setIsOpen(true) : setIsOpen(false)
  }, [isInstalling])

  const handleWonderCart = () => {
    installWonderCart();
  }

  const clickExclusiveToolsCTA = (action, url, ele, btnLabel, pluginProvider) => {  
    const elementUrl = url ?? "" 
    AnalyticsSdk.track("Store", action, {
      href: elementUrl,
      element: ele,
      label: btnLabel,
      provider: pluginProvider,    
    }) 
    return yithPluginsMap.get(id).title === "nfd_slug_wonder_cart" && !state?.isActive ? handleWonderCart() :
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

  const pluginTitleString = cardsInfo?.text(state)?.title.toLowerCase().replace(/ /g, "-") === "ecomdash" ? "newfold" : "yith"
  
  if (yithPluginsMap.get(id).title === "nfd_slug_ecomdash_wordpress_plugin") {
    if (!NewfoldRuntime.hasCapability("hasEcomdash"))
      return;
  }

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
          onClick={(e) => clickExclusiveToolsCTA(`ecommerce-exclusive-tools-${pluginTitleString}-clicked`, 
                                                  state?.featureUrl,
                                                  "a",
                                                  cardsInfo?.text(state).actionName,
                                                  pluginTitleString
                                                ) 
                  }
          as="a"
          href={ window.NewfoldRuntime?.linkTracker?.addUtmParams( state?.featureUrl ) || state?.featureUrl }
          isLoading={state?.isInstalling && !state?.isActive}
          disabled={state?.isDisabled}
          id={state?.isInstalling
            ? "installing_" + yithPluginsMap.get(id).title
            : state?.isActive
              ? "manage_" + yithPluginsMap.get(id).title
              : "enable_" + yithPluginsMap.get(id).title}
        >
          <span>
            {(state?.isInstalling && !state?.isActive)
              ? __("Installing...", "wp-module-ecommerce")
              : cardsInfo?.text(state).actionName}
          </span>
        </Button>
      </Card.Footer>
    </Card>
  );
}
