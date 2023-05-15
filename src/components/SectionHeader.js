import { Title } from "@yoast/ui-library";

function Container({ children, border = false }) {
  return (
    <div
      className={`yst-bg-white yst-p-8 ${
        border ? "yst-border yst-border-solid yst-border-[#E2E8F0]" : ""
      } `}
    >
      {children}
    </div>
  );
}

export function SectionHeader(props) {
  return (
    <Container>
      <Title size={2} className="yst-text-base">
        {props.title}
      </Title>
      <div style={{ height: "10px" }} />
      <span className="yst-text-sm yst-text-slate-600">{props.subtitle}</span>
      {props.children}
    </Container>
  );
}
SectionHeader.Container = Container;
