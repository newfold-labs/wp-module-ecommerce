import { Title } from "@yoast/ui-library";

function Container({ children, border = false }) {
  return (
    <div
      className={`yst-bg-white yst-p-8 yst-rounded-lg ${
        border ? "yst-border yst-border-solid yst-border-[#E2E8F0]" : ""
      } `}
    >
      {children}
    </div>
  );
}

export function SectionHeader({ title, subtitle, children, ...props }) {
  return (
    <Container {...props}>
      <Title size={2} className="yst-text-base">
        {title}
      </Title>
      <div style={{ height: "10px" }} />
      <span className="yst-text-sm yst-text-slate-600">{subtitle}</span>
      {children}
    </Container>
  );
}
SectionHeader.Container = Container;
