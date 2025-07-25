import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { __ } from "@wordpress/i18n";
import { Card, Title } from "@newfold/ui-component-library";

export function ReportTile(props) {
  let { title } = props.text();
  let { delta, sign } = props.state.change;
  let Icon = sign > 0 ? ArrowUpIcon : ArrowDownIcon;
  return (
    <Card className="nfd-border-gray-300">
      <Card.Content className="nfd-flex nfd-flex-col nfd-gap-4">
        <Title
          className="nfd-text-[--nfd-ecommerce-text-info] nfd-leading-normal nfd-text-base"
          size="5"
        >
          {title}
        </Title>
        <div className="nfd-flex nfd-flex-row nfd-gap-2 nfd-items-center">
          <p className="nfd-text-2xl nfd-text-[--nfd-ecommerce-text-info] nfd-font-semibold">
            {(props.state.reportValue === "$0.00" || props.state.reportValue === "0.00" || props.state.reportValue === 0) ? "-" : props.state.reportValue}
          </p>
          {delta > 0 && (
            <div>
              <span
                className={sign > 0 ? "nfd-text-green-600" : "nfd-text-red-600"}
              >
                <Icon className="nfd-inline-block nfd-h-3" /> {Math.round(delta)}%
              </span>
            </div>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}
