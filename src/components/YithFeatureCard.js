import { Button, Card, Link, Title } from '@newfold/ui-component-library';

export function YithFeatureCard({
  yithProducts: { name, description, primaryUrl },
}) {
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
        <a href="">Learn more</a>
      </Card.Content>
      <Card.Footer>
        <Button
          className="nfd-w-full nfd-h-9 nfd-border nfd-flex nfd-items-center nfd-gap-2"
          variant="secondary"
          as="a"
          target="_blank"
          href={primaryUrl}
        >
          <span>{__('Purchase', 'wp-module-ecommerce')}</span>
        </Button>
      </Card.Footer>
    </Card>
  );
}
