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
    customizeIcon: Home,
  },
  {
    title: "About Page",
    customizeUrl: "post-new.php?dcpage=about&dcsrc=plugin",
    customizeIcon: About,
  },
  {
    title: "Contact Page",
    customizeUrl: "post-new.php?dcpage=contact&dcsrc=plugin",
    customizeIcon: Contact,
  },
  {
    title: "Store Layout",
    customizeUrl:
      "/wp-admin/customize.php?return=%2Fwp-admin%2Fadmin.php%3Fpage%3Dbluehost",
    customizeIcon: StoreLayout,
  },
  {
    title: "Customize the 'My Account' Page",
    customizeUrl: "/wp-admin/admin.php?page=yith_wcmap_panel",
    customizeIcon: Account,
  },
];

export function CustomizeStore(props) {
  return (
    <DashboardContent
      title="Customize Your Store"
      subtitle="Setup your core store pages and add general website content to provide a complete shopping experience for your customers."
    >
      <div className="nfd-ecommerce-standard-actions-container">
        {CustomizeList.map((task) => {
          let CustomizeIcon = task.customizeIcon;
          return (
            <Card
              key={task.title}
              variant="standard"
              title={task.title}
              action="Customize"
              href={task.customizeUrl}
            >
              <CustomizeIcon />
            </Card>
          );
        })}
      </div>
    </DashboardContent>
  );
}
