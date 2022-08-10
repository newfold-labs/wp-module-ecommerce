import { __ } from "@wordpress/i18n";
import useSWR from "swr";
import { ReactComponent as About } from "../icons/aboutpage.svg";
import { ReactComponent as Account } from "../icons/account.svg";
import { ReactComponent as Contact } from "../icons/contactpage.svg";
import { ReactComponent as Home } from "../icons/homepage.svg";
import { ReactComponent as StoreLayout } from "../icons/storelayout.svg";
import { queuePluginInstall } from "../services";
import { Card } from "./Card";
import { DashboardContent } from "./DashboardContent";

const CustomizeList = [
  { title: __("Home Page", "wp-module-ecommerce"), dcpage: "home", Icon: Home },
  {
    title: __("About Page", "wp-module-ecommerce"),
    dcpage: "about",
    Icon: About,
  },
  {
    title: __("Contact Page", "wp-module-ecommerce"),
    dcpage: "contact",
    Icon: Contact,
  },
];

export function CustomizeStore(props) {
  let { data: pluginsOnSite } = useSWR("/newfold-ecommerce/v1/plugins/status");
  let { data: postsMeta } = useSWR("/newfold-ecommerce/v1/user/page-status");
  let postsByName = Object.fromEntries(
    postsMeta?.map((_) => [_["post_name"], _["ID"]]) ?? []
  );
  return (
    <DashboardContent
      title={__("Customize Your Store", "wp-module-ecommerce")}
      subtitle={__(
        "Setup your core store pages and add general website content to provide a complete shopping experience for your customers.",
        "wp-module-ecommerce"
      )}
    >
      <div className="nfd-ecommerce-standard-actions-container">
        {CustomizeList.map(({ title, Icon, dcpage }) => (
          <Card
            key={title}
            variant="standard"
            title={title}
            status={postsMeta === undefined ? "inprogress" : "ready"}
            action={__("Setup", "wp-module-ecommerce")}
            href={
              postsByName[dcpage]
                ? `post.php?action=edit&post=${postsByName[dcpage]}`
                : `post-new.php?dcpage=${dcpage}&dcsrc=plugin`
            }
          >
            <Icon />
          </Card>
        ))}
        <Card
          variant="standard"
          title={__("Store Layout", "wp-module-ecommerce")}
          action={__("Configure", "wp-module-ecommerce")}
          href={`customize.php?return=${encodeURIComponent(
            window.location.href.replace(window.location.origin, "")
          )}`}
        >
          <StoreLayout />
        </Card>
        <Card
          variant="standard"
          title={__("Customer Account Page", "wp-module-ecommerce")}
          action={__("Setup", "wp-module-ecommerce")}
          data-action-gutter={"s"}
          status={pluginsOnSite ? "ready" : "inprogress"}
          onClick={async () => {
            if (pluginsOnSite.yith_wcmap_panel !== "Active") {
              await queuePluginInstall(
                "nfd_slug_yith_woocommerce_customize_myaccount_page"
              );
            }
            window.location.href = "admin.php?page=yith_wcmap_panel";
          }}
        >
          <Account />
        </Card>
      </div>
    </DashboardContent>
  );
}
