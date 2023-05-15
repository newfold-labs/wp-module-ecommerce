import { __ } from "@wordpress/i18n";
import { Button, Card, Link, Title } from "@yoast/ui-library";
import { ReactComponent as GotoArrow } from "../icons/goto-arrow.svg";

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
          className="yst-flex yst-mt-4 yst-items-center yst-text-primary-400 yst-no-underline yst-whitespace-pre-wrap"
          href={props.learnMoreUrl}
          target="_blank"
        >
          {__("Learn More", "wp-module-ecommerce")} <GotoArrow />
        </Link>
      </Card.Content>
      <Card.Footer>
        <Button
          className="yst-w-full yst-h-9 yst-border yst-border-primary-400 yst-whitespace-pre-wrap"
          variant="secondary"
          onClick={props.actions.buttonClick}
          disabled={disabled}
        >
          {actionName} <GotoArrow />
        </Button>
      </Card.Footer>
    </Card>
  );
}
