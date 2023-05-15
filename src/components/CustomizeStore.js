import { __ } from "@wordpress/i18n";
import useSWR from "swr";
import { ReactComponent as About } from "../icons/aboutpage.svg";
import { ReactComponent as Account } from "../icons/account.svg";
import { ReactComponent as AddNewPage } from "../icons/add-card.svg";
import { ReactComponent as Contact } from "../icons/contactpage.svg";
import { ReactComponent as Home } from "../icons/homepage.svg";
import { ReactComponent as StoreLayout } from "../icons/storelayout.svg";
import { Endpoints, syncPluginInstall } from "../services";
import { Card } from "./Card";
import { SectionHeader } from "./SectionHeader";

let CustomizeList = [
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

export function CustomizeStore({ plugins }) {
  let { data: status, error } = useSWR(Endpoints.PAGE_STATUS);
  let { pages, theme } = status ?? {};
  let pagesByName = Object.fromEntries(
    pages?.map((_) => [_["meta_value"], _["ID"]]) ?? []
  );
  let WCUnavailable = plugins?.status?.woocommerce !== "Active";
  if (Object.keys(pagesByName).length > 0) {
    CustomizeList = CustomizeList.filter((page) =>
      pagesByName?.hasOwnProperty(page.dcpage)
    );
  }
  if (status === undefined && !WCUnavailable) {
    return (
      <div style={{ height: "100%", display: "grid", placeContent: "center" }}>
        {error ? (
          <h2>
            {__(
              "There was an error while loading this information",
              "wp-module-ecommerce"
            )}
          </h2>
        ) : (
          <div className="nfd-ecommerce-loader" />
        )}
      </div>
    );
  }
  return (
    <SectionHeader
      title={__("Pages", "wp-module-ecommerce")}
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
            disable={WCUnavailable}
            status={status === undefined ? "inprogress" : "ready"}
            action={__("Setup", "wp-module-ecommerce")}
            href={`post.php?action=edit&post=${pagesByName[dcpage]}`}
          >
            <Icon />
          </Card>
        ))}
        <Card
          variant="standard"
          title={__("Add a Page", "wp-module-ecommerce")}
          disable={WCUnavailable}
          action={__("Setup", "wp-module-ecommerce")}
          href={`post-new.php?post_type=page`}
        >
          <AddNewPage style={{ transform: "scale(1.5)" }} />
        </Card>
        <Card
          variant="standard"
          title={__("Store Layout", "wp-module-ecommerce")}
          disable={WCUnavailable}
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
          disable={WCUnavailable}
          action={__("Setup", "wp-module-ecommerce")}
          data-action-gutter={"s"}
          status={plugins.status !== undefined ? "ready" : "inprogress"}
          onClick={async () => {
            if (plugins.status?.yith_wcmap_panel !== "Active") {
              await syncPluginInstall(
                "nfd_slug_yith_woocommerce_customize_myaccount_page",
                plugins.token
              );
            }
            window.location.href = "admin.php?page=yith_wcmap_panel";
          }}
        >
          <Account />
        </Card>
      </div>
    </SectionHeader>
  );
}
