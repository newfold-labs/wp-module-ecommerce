import { Icon } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Button, Modal, Title } from "@yoast/ui-library";
import useSWRMutation from "swr/mutation";
import { ReactComponent as StoreOnlineIllustration } from "../icons/launch-store.svg";
import { ReactComponent as LaunchStore } from "../icons/launch.svg";

export function SiteStatus(props) {
  let { wp } = props.state;
  let [isOpen, setOpen] = useState(false);
  let comingSoon = useSWRMutation("coming-soon", async () => {
    await props.actions.toggleComingSoon();
    let $statusText = document.getElementById("nfd-site-status-text");
    if ($statusText) {
      $statusText.textContent = __("Live", "wp-module-ecommerce");
      $statusText.style.setProperty("color", "#048200");
    }
    setOpen(true);
  });
  if (isOpen) {
    return (
      <Modal isOpen onClose={() => setOpen(false)}>
        <Modal.Description className="yst-bg-white yst-w-[900px] yst-shadow-md yst-py-6">
          <div className="yst-flex yst-flex-col yst-items-center yst-mb-12">
            <StoreOnlineIllustration />
            <Title
              size={1}
              className="yst-text-primary-400 yst-text-3xl yst-mt-6"
            >
              {__(
                "Your store is online and ready for business!",
                "wp-module-ecommerce"
              )}
            </Title>
            <span className="yst-leading-normal yst-text-[#425466] yst-mt-2 yst-mb-12">
              {__(
                `Not ready? You can re-enable the "Coming Soon" mode if you need.`,
                "wp-module-ecommerce"
              )}
            </span>
            <Button
              className="yst-text-white"
              variant="primary"
              size="large"
              onClick={() => setOpen(false)}
            >
              {__("Okay", "wp-module-ecommerce")}
            </Button>
          </div>
        </Modal.Description>
      </Modal>
    );
  }
  if (!wp.comingSoon) {
    return null;
  }
  return (
    <div className="yst-px-4 yst-py-2 yst-flex yst-rounded-lg yst-items-center yst-bg-slate-100">
      <div className="yst-flex-1">
        <Title size={4} className="yst-leading-normal">
          {__("Ready to go live?", "wp-module-ecommerce")}
        </Title>
        <span className="yst-whitespace-pre-wrap yst-leading-tight">
          {__(
            "Preview your store before setting it live to make sure everything is how you want it.\nOnce you're ready, set your store live!",
            "wp-module-ecommerce"
          )}
        </span>
      </div>
      <div className="yst-flex-none yst-flex">
        <Button
          className="yst-border-primary-400 yst-bg-slate-100 yst-mr-4"
          variant="secondary"
          onClick={() => window.open(props.user?.site.url, "_blank")}
        >
          {__("Preview your store", "wp-module-ecommerce")}
        </Button>
        <Button
          className="yst-flex yst-items-center"
          variant="upsell"
          isLoading={comingSoon.isMutating}
          onClick={comingSoon.trigger}
        >
          <Icon icon={LaunchStore} />{" "}
          {__("Launch your store", "wp-module-ecommerce")}
        </Button>
      </div>
    </div>
  );
}
