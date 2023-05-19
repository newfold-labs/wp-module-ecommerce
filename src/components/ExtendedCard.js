import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { __ } from "@wordpress/i18n";
import { Button, Card, Link, Title } from "@yoast/ui-library";

export function ExtendedCard(props) {
  let { image: Icon } = props.assets();
  let { title, actionName, description } = props.text(props.state);
  const disabled = props.state.isDisabled;

  return (
    <Card>
      <Card.Content>
        <Icon />
        <Title size={4} className="yst-leading-normal yst-my-4">
          {title}
        </Title>
        {description ? <span>{description}</span> : null}
        <Link
          className="yst-flex yst-mt-4 yst-items-center yst-gap-2"
          href={props.learnMoreUrl}
          target="_blank"
        >
          <span>{__("Learn More", "wp-module-ecommerce")}</span>
          <ArrowLongRightIcon className="yst-h-5 yst-text-black" />
        </Link>
      </Card.Content>
      <Card.Footer>
        <Button
          className="yst-w-full yst-h-9 yst-border yst-flex yst-items-center yst-gap-2"
          variant="secondary"
          onClick={props.actions.buttonClick}
          disabled={disabled}
        >
          <span>{actionName}</span> <ArrowLongRightIcon />
        </Button>
      </Card.Footer>
    </Card>
  );
}
