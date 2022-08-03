import useSWR from "swr";
import { ReactComponent as About } from "../icons/aboutpage.svg";
import { ReactComponent as Account } from "../icons/account.svg";
import { ReactComponent as Contact } from "../icons/contactpage.svg";
import { ReactComponent as Home } from "../icons/homepage.svg";
import { ReactComponent as StoreLayout } from "../icons/storelayout.svg";
import { Card } from "./Card";
import { DashboardContent } from "./DashboardContent";

const CustomizeList = [
  { title: "Home Page", dcpage: "home", Icon: Home },
  { title: "About Page", dcpage: "about", Icon: About },
  { title: "Contact Page", dcpage: "contact", Icon: Contact },
];

export function CustomizeStore(props) {
  let { data: pluginsOnSite } = useSWR("/newfold-ecommerce/v1/plugins/status");
  let { data: postsMeta } = useSWR("/newfold-ecommerce/v1/user/page-status");
  let postsByName = Object.fromEntries(
    postsMeta?.map((_) => [_["post_name"], _["ID"]]) ?? []
  );
  return (
    <DashboardContent
      title="Customize Your Store"
      subtitle="Setup your core store pages and add general website content to provide a complete shopping experience for your customers."
    >
      <div className="nfd-ecommerce-standard-actions-container">
        {CustomizeList.map(({ title, Icon, dcpage }) => (
          <Card
            key={title}
            variant="standard"
            title={title}
            status={postsMeta === undefined ? "inprogress" : "ready"}
            action="Setup"
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
          title="Store Layout"
          action="Configure"
          href={`customize.php?return=${encodeURIComponent(
            window.location.href.replace(window.location.origin, "")
          )}`}
        >
          <StoreLayout />
        </Card>
        <Card
          variant="standard"
          title="Customer Account Page"
          action="Setup"
          status={pluginsOnSite ? "ready" : "inprogress"}
          onClick={async () => {
            if (pluginsOnSite.yith_wcmap_panel !== "Active") {
              await props.wpModules
                .apiFetch({
                  path: "/newfold-ecommerce/v1/plugins/install",
                  method: "POST",
                  data: { plugin: "yith_wcmap_panel" },
                })
                .catch((error) => {});
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
