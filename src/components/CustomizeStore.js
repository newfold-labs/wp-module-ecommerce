import { Card } from "./Card";
import { DashboardContent } from "./DashboardContent";
import { ReactComponent as Home } from "../icons/homepage.svg";
import { ReactComponent as About } from "../icons/aboutpage.svg";
import { ReactComponent as Contact } from "../icons/contactpage.svg";
import { ReactComponent as StoreLayout } from "../icons/storelayout.svg";
import { ReactComponent as Account } from "../icons/account.svg";

const CustomizeList = [
  {
    title: "Home Page",
    customizeUrl: "post-new.php?dcpage=home&dcsrc=plugin",
    Icon: Home,
  },
  {
    title: "About Page",
    customizeUrl: "post-new.php?dcpage=about&dcsrc=plugin",
    Icon: About,
  },
  {
    title: "Contact Page",
    customizeUrl: "post-new.php?dcpage=contact&dcsrc=plugin",
    Icon: Contact,
  },
  {
    title: "Store Layout",
    customizeUrl:
      "/wp-admin/customize.php?return=%2Fwp-admin%2Fadmin.php%3Fpage%3Dbluehost",
    action: "Configure",
    Icon: StoreLayout,
  },
  {
    title: "Customize 'My Account'",
    customizeUrl: "/wp-admin/admin.php?page=yith_wcmap_panel",
    Icon: Account,
  },
];

export function CustomizeStore(props) {
  return (
    <DashboardContent
      title="Customize Your Store"
      subtitle="Setup your core store pages and add general website content to provide a complete shopping experience for your customers."
    >
      <div className="nfd-ecommerce-standard-actions-container">
        {CustomizeList.map(({ title, action, Icon, customizeUrl }) => (
          <Card
            key={title}
            variant="standard"
            title={title}
            action={action ?? "Setup"}
            href={customizeUrl}
          >
            <Icon />
          </Card>
        ))}
      </div>
    </DashboardContent>
  );
}
