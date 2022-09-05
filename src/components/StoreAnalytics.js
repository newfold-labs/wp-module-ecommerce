import { __ } from "@wordpress/i18n";
export default function StoreAnalytics(props) {
    if (props?.plugins?.status?.woocommerce !== "Active" || props?.state?.wp.comingSoon === true) {
        return null;
    }
    return (
        <>
            <div className="nfd-ecommerce-store-analytics">
                <h2>
                    {__(
                        "Store Analytics",
                        "wp-module-ecommerce"
                    )}
                </h2>
                <div style={{height: "8px"}}/>
                <span className="store-analytics-notice">
                    {__(
                        "Get a detailed view of all your store performance analytics via the WooCommerce Analytics page.",
                        "wp-module-ecommerce"
                    )}
                </span>
                <div style={{height: "16px"}}/>
                <a href="admin.php?page=wc-admin&path=/analytics/overview">
                    {__("View Analytics", "wp-module-ecommerce")}
                </a>
            </div>
            <div style={{height: "32px"}}/>
        </>
    )
}