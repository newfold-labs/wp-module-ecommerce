import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { __ } from "@wordpress/i18n";
import { Card, Title } from "@yoast/ui-library";

export function ReportTile(props) {
  let { title } = props.text();
  let { delta, sign } = props.state.change;
  let Icon = sign > 0 ? ArrowUpIcon : ArrowDownIcon;
  return (
    <Card>
      <Card.Content className="yst-flex yst-flex-col yst-gap-4">
        <Title
          className="yst-text-[--nfd-ecommerce-text-info] yst-leading-normal yst-text-base"
          size={5}
        >
          {title}
        </Title>
        <p className="yst-text-2xl yst-text-[--nfd-ecommerce-text-info] yst-font-semibold">
          {props.state.reportValue}
        </p>
        {delta > 0 && (
          <div>
            <span
              className={sign > 0 ? "yst-text-green-600" : "yst-text-red-600"}
            >
              <Icon className="yst-inline-block yst-h-3" /> {Math.round(delta)}%
            </span>
            {__(" vs prior period", "wp-module-ecommerce")}
          </div>
        )}
      </Card.Content>
    </Card>
  );
}
