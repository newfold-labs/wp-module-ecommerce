import { Alert, Button, Title } from "@newfold/ui-component-library";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import classNames from "classnames";
import { ReactComponent as ComingSoonIllustration } from "../icons/coming-soon.svg";
import { ReactComponent as WelcomeIllustration } from "../icons/store-live.svg";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { RuntimeSdk } from "../sdk/runtime";
import { OnboardingList } from "./OnboardingList";
import { Section } from "./Section";
import { SiteStatus } from "./SiteStatus";
import { WordPressSdk } from "../sdk/wordpress";

const Text = {
  Pending: {
    title: NewfoldRuntime.hasCapability("isEcommerce")
      ? __("Congrats on your new store!", "wp-module-ecommerce")
      : __("Congrats on your new site!", "wp-module-ecommerce"),
    description: __(
      'Your site is currently displaying a "Coming Soon" page.',
      "wp-module-ecommerce"
    ),
    Illustration: ComingSoonIllustration,
  },
  Live: {
    title: __("Ready to go to the next level?", "wp-module-ecommerce"),
    description: __("Your site is live to the world!", "wp-module-ecommerce"),
    Illustration: WelcomeIllustration,
  },
  isMigrated: {
    title: __("Welcome home!", "wp-module-ecommerce"),
    description: __("Your site has been successfully migrated.", "wp-module-ecommerce"),
  }
};

export function OnboardingScreen({
  comingSoon,
  toggleComingSoon,
  notify,
  showShadowBox,
}) {
  const { title, description, Illustration } = comingSoon
    ? Text.Pending
    : Text.Live;

  const [hovered, setIsHovered] = useState(false);
  const [editUrl, setEditUrl] = useState("");
  const [isMigrationCompleted, setIsMigrationCompleted] = useState(false);
  const [ webServersUpdated, setWebServersUpdated ] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const iframeOnLoad = () => {
    if(window.frames["iframe-preview"].document.getElementById("wpadminbar")){
      window.frames["iframe-preview"].document.getElementById(
        "wpadminbar"
      ).style.display = "none";
    }
  };

  useEffect(() => {
    WordPressSdk.settings.get().then((res) => {
      setIsMigrationCompleted( res.nfd_show_migration_steps || false );
      setWebServersUpdated( res.update_site_server_clicked );
      if ( !res.is_fse_theme ) {
        setEditUrl( RuntimeSdk.adminUrl( "customize.php" ) )
      } else if ( res?.page_on_front && res?.show_on_front === "page" ) {
        setEditUrl(
          RuntimeSdk.adminUrl(
            `post.php?post=${res?.page_on_front}&action=edit`,
            false
          )
        );
      } else {
        setEditUrl(RuntimeSdk.adminUrl("site-editor.php?canvas=edit"));
      }
    });
  }, []);

  return (
    <Section.Container
      className="nfd-welcome-section"
      showShadowBox={showShadowBox}
    >
      <Section.Header title={__("Home", "wp-module-ecommerce")} />
      <Section.Content className="nfd-app-section-home">
        <div className="nfd-flex nfd-flex-col nfd-gap-6">
          <div
            className={classNames(
              "nfd-grid nfd-gap-6 nfd-min-h-[350px]",
              "sm:nfd-grid-cols-1",
              "xl:nfd-grid-cols-2"
            )}
          >
            <div className="nfd-flex nfd-flex-col nfd-justify-start nfd-items-start nfd-gap-4">
              <Title size="2">{isMigrationCompleted ? Text.isMigrated.title : title}</Title>
              <div>
                {comingSoon ? (
                  <Alert
                    variant="warning"
                    className="nfd-text-sm nfd-bg-transparent nfd-p-0 "
                  >
                    <span className="nfd-text-red-700">{isMigrationCompleted ? Text.isMigrated.description : description}</span>
                  </Alert>
                ) : (
                  <span className="nfd-text-[--nfd-ecommerce-text-info] nfd-text-sm">
                    {isMigrationCompleted ? Text.isMigrated.description : description}
                  </span>
                )}
              </div>
              <div
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseLeave}
                className={classNames(
                  "nfd-relative  nfd-flex-col nfd-justify-center nfd-items-center",
                  "nfd-border-[#CBD5E1] nfd-border-[1px] nfd-border-solid nfd-rounded-md"
                )}
              >
                <div className="nfd-flex nfd-justify-center nfd-items-center nfd-bg-gray-200 nfd-border-b nfd-border-[#dbd1d1] nfd-relative nfd-z-10 nfd-rounded-t-md">
                  <p className="nfd-font-bold">
                    {__("SITE PREVIEW", "wp-module-ecommerce")}
                  </p>
                </div>
                <div className="nfd-flex-col">
                  <div
                    className={classNames(
                      "nfd-h-[216px] nfd-box-content",
                      "nfd-box-content nfd-z-[2] nfd-opacity-100",
                      "nfd-flex nfd-flex-col nfd-justify-center nfd-items-center",
                      "md:nfd-w-[520px] md:min-[783px]:nfd-w-[387px] md:min-[768px]:nfd-w-[670px]",
                      "lg:min-[1024px]:nfd-w-[486px] lg:nfd-w-[520px] lg:nfd-h-[245px]",
                      "xl:min-[1280px]:nfd-w-[360px]",
                      "2xl:nfd-w-[520px]"
                    )}
                  >
                    <iframe
                      onLoad={iframeOnLoad}
                      id="iframe-preview"
                      title="Preview"
                      className="nfd-w-[400%] nfd-min-h-[400%] nfd-basis-full nfd-scale-[0.25] nfd-overflow-hidden nfd-relative nfd-top-[-9px]"
                      src={
                        !comingSoon
                          ? NewfoldRuntime.homeUrl
                          : NewfoldRuntime.homeUrl + "/?preview=coming_soon"
                      }
                      scrolling="no"
                      name="iframe-preview"
                      sandbox="allow-scripts allow-same-origin"
                      seamless
                    ></iframe>
                  </div>
                </div>
                <div
                  className={classNames(
                    "nfd-absolute nfd-top-0 nfd-left-0 nfd-bottom-0 nfd-right-0 nfd-flex nfd-items-center nfd-justify-center nfd-gap-4 nfd-flex-col ",
                    "hover:nfd-animate-[wiggle_1s_ease-in-out_infinite]"
                  )}
                >
                  <Button
                    style={{
                      display: hovered ? "inline-block" : "none",
                    }}
                    as="a"
                    className="nfd-bg-canvas "
                    href={NewfoldRuntime.siteUrl}
                    target="_blank"
                    variant="secondary"
                    data-cy="view-site"
                  >
                    {__("View your site", "wp-module-ecommerce")}
                  </Button>
                  <Button
                    style={{
                      display: hovered ? "inline-block" : "none",
                    }}
                    as="a"
                    className="nfd-bg-canvas "
                    href={editUrl}
                    target="_blank"
                    variant="secondary"
                    data-cy="edit-site"
                  >
                    {__("Edit your site", "wp-module-ecommerce")}
                  </Button>
                </div>
              </div>
            </div>
            <OnboardingList notify={notify}
            isMigrationCompleted={isMigrationCompleted}
            setIsMigrationCompleted={setIsMigrationCompleted} 
            setWebServersUpdated={setWebServersUpdated}
            webServersUpdated={webServersUpdated}
            />
          </div>
          <SiteStatus
            comingSoon={comingSoon}
            notify={notify}
            toggleComingSoon={toggleComingSoon}
          />
        </div>
      </Section.Content>
    </Section.Container>
  );
}
