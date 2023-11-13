import { Button, Card, Link, Title } from '@newfold/ui-component-library';
import { __ } from '@wordpress/i18n';
import { AnalyticsSdk } from '../sdk/analytics';
import { ArrowLongRightIcon } from '@heroicons/react/20/solid';
import { defineFeatureState } from '../configs/YITHPlugins.config';

export function YithFeatureCard({
  yithProducts: { name, description, primaryUrl },
}) {
  const state = defineFeatureState();
  console.log(name);
  return (
    <Card>
      <Card.Content>
        <Title size={4} className="nfd-leading-normal nfd-my-4">
          {name}
        </Title>
        {description ? <span>{description}</span> : null}
        <br />
        <br />
        <Link
          className="nfd-flex nfd-mt-4 nfd-items-center nfd-gap-2 nfd-no-underline"
          href=""
          target="_blank"
          onClick={() =>
            AnalyticsSdk.track('commerce', name, {
              value: 'clicked on the learn more url',
            })
          }
        >
          <span>{__('Learn More', 'wp-module-ecommerce')}</span>
          <ArrowLongRightIcon className="nfd-h-5 nfd-text-black" />
        </Link>
      </Card.Content>
      <Card.Footer>
        {!state.isActive && !state.isQueueEmpty && !isInstalling ? (
          <span>
            {__(
              'please wait while other features are installed...',
              'wp-module-ecommerce'
            )}
          </span>
        ) : (
          <Button
            className="nfd-w-full nfd-h-9 nfd-border nfd-flex nfd-items-center nfd-gap-2"
            variant={
              state.isActive && state.featureUrl !== null
                ? 'secondary'
                : 'upsell'
            }
            as="a"
            target="_blank"
            href={
              state.isActive && state.featureUrl !== null
                ? state.featureUrl
                : primaryUrl
            }
          >
            {state.isInstalling ? (
              __('Installing...', 'wp-module-ecommerce')
            ) : state.isActive ? (
              actionName
            ) : (
              <span>{__('Purchase', 'wp-module-ecommerce')}</span>
            )}
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
}
