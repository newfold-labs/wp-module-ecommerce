export function DashboardContent(props) {
  return (
    <>
      <h2 className="nfd-ecommerce-dashboard-title">{props.title}</h2>
      <div style={{ height: "10px" }} />
      <span className="nfd-ecommerce-dashboard-subtitle">{props.subtitle}</span>
      {props.children}
    </>
  );
}
