import { ArrowUpIcon } from "@heroicons/react/20/solid";
import { Card, Title } from "@yoast/ui-library";

export function ReportTile(props) {
  let { title } = props.text();
  return (
    <Card>
      <Card.Content className="yst-flex yst-flex-col yst-gap-4">
        <Title
          className="yst-text-[#495C77] yst-leading-normal yst-text-base"
          size={5}
        >
          {title}
        </Title>
        <p className="yst-text-2xl yst-text-[#495C77] yst-font-semibold">
          {props.state.reportValue}
        </p>
        <div>
          <span className="yst-text-green-600">
            <ArrowUpIcon className="yst-inline-block yst-h-3" /> 12.1%
          </span>{" "}
          vs prior period
        </div>
      </Card.Content>
    </Card>
  );
}
