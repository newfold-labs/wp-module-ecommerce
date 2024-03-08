import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { __ } from "@wordpress/i18n";
import { Card, Title } from "@newfold/ui-component-library";

export function ReportTile(props) {
  let { title } = props.text();
  let { delta, sign } = props.state.change;
  let Icon = sign > 0 ? ArrowUpIcon : ArrowDownIcon;
  return (
    <Card>
      <Card.Content className="nfd-flex nfd-flex-col nfd-gap-4">
        <Title
          className="nfd-text-[--nfd-ecommerce-text-info] nfd-leading-normal nfd-text-base"
          size="5"
        >
          {title}
        </Title>
        <p className="nfd-text-2xl nfd-text-[--nfd-ecommerce-text-info] nfd-font-semibold">
          {props.state.reportValue}
        </p>
        {delta > 0 && (
          <div>
            <span
              className={sign > 0 ? "nfd-text-green-600" : "nfd-text-red-600"}
            >
              <Icon className="nfd-inline-block nfd-h-3" /> {Math.round(delta)}%
            </span>
            {__(" vs prior period", "wp-module-ecommerce")}
          </div>
        )}
      </Card.Content>
    </Card>
  );
}
