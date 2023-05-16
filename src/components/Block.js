import { Title } from "@yoast/ui-library";

export function Block({ title, subtitle, children }) {
  return (
    <div className="yst-p-0 yst-mb-8 yst-bg-white yst-rounded-lg yst-border">
      <div className="yst-bg-white yst-m-0 yst-p-8 yst-rounded-tl-lg yst-rounded-tr-lg yst-border-solid yst-border-b yst-border-[#E2E8F0]">
        <Title
          className={`yst-text-2xl yst-text-[#0F172A] ${
            subtitle ? "yst-mb-3" : ""
          } `}
          size={2}
        >
          {title}
        </Title>
        {subtitle ? (
          <span className="yst-text-sm yst-text-[#4A5567]">{subtitle}</span>
        ) : null}
      </div>
      {children}
    </div>
  );
}
