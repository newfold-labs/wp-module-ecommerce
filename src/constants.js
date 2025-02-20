export const YITH_WOOCOMMERCE_BOOKING_APPOINTMENTS = "https://docs.yithemes.com/yith-woocommerce-booking-extended/";
export const YITH_WOOCOMMERCE_WISHLIST = "https://docs.yithemes.com/yith-woocommerce-wishlist-extended/";
export const YITH_WOOCOMMERCE_AJAX_PRODUCT_FILTER = "https://docs.yithemes.com/yith-woocommerce-ajax-product-filter-extended/";
export const YITH_WOOCOMMERCE_GIFT_CARDS = "https://docs.yithemes.com/yith-woocommerce-gift-cards-extended/";
export const YITH_WOOCOMMERCE_ACCOUNT_PAGE = "https://docs.yithemes.com/yith-woocommerce-customize-myaccount-page-extended/";

export const BH_UR_REGEX = /\b\w+(\.\w+)*\.mybluehost\.me\b/;
export const HG_UR_REGEX = /\b\w+(\.\w+)*\.temporary\.site\b/;

export const VIEW_GUIDE_LINK = {
    'bluehost': 'https://www.bluehost.com/help', 
    'hostgator': 'https://www.hostgator.com/help'
}

export const wonderCartPopularCampaignsList = [        
    {
      icon: "FreeShipping",
      title: _("Free Shipping", "wp-module-ecommerce"),
      description: __("Attract and retain customers by offering free shipping based on cart amount, location or store category.", "wp-module-ecommerce")
    },
    {
        icon: "BuyOndGetOne",
        title: _("Buy 1 Get 1", "wp-module-ecommerce"),
        description: __("Attract customers with a compelling deal where they can buy one product and get another product for free.", "wp-module-ecommerce")
    },
    {
        icon: "GiftCard",
        title: _("Gift Product in Cart", "wp-module-ecommerce"),
        description: __("Reward customers with a free gift in their cart based on total cart value, or specific products or categories.", "wp-module-ecommerce")
    },
    {
        icon: "CategoryDiscount",
        title: _("Category Discount", "wp-module-ecommerce"),
        description: __("Give your customers a discount on specific categories of products and boost sales for those categories.", "wp-module-ecommerce")
      },
      {
          icon: "ThankYouDiscount",
          title: _("Upsell in Thank You Page", "wp-module-ecommerce"),
          description: _("Maximize sales by presenting relevant upsell options after customers have completed their purchase.", "wp-module-ecommerce")
      },
      {
          icon: "LastMinuteDeal",
          title: _("Last Minute Deal", "wp-module-ecommerce"),
          description: _("Create urgency with a special time-limited deal for customers on the cart and checkout pages.", "wp-module-ecommerce")
      }
];

export const wpSolutionsPromotedPluginsList = [
    {
        "WP_SOLUTION_CREATOR": [
                        {
                            title: _("WEBPAGE CREATION", "wp-module-ecommerce"),
                            description: _("Build webpages fast with tailored block patterns and page templates included in your hosting package.", "wp-module-ecommerce"),
                            name: "Webpage Creation",
                            plsSlug: "",                           
                            plsProviderName: "",
                            download: null,
                            basename: "",
                            cta: {
                                "text": _("Add a Page to Your Site", "wp-module-ecommerce"),
                                "url" : "post-new.php?post_type=page"
                            }
                            
                        },
                        {
                            title: _("SEARCH ENGINE OPTIMIZATION", "wp-module-ecommerce"),
                            description: _("Start increasing your search result rankings today.", "wp-module-ecommerce"),
                            name:"Yoast SEO",
                            plsSlug: "wp-seo",                            
                            plsProviderName: "yoast",
                            download: "https://downloads.wordpress.org/plugin/wordpress-seo.latest-stable.zip",
                            basename: "wordpress-seo/wp-seo.php",
                            cta: {
                                    "text": _("Improve Your Search Ranking", "wp-module-ecommerce"),
                                    "url": "admin.php?page=wpseo_dashboard#top#first-time-configuration"
                            },
                        },
                        {
                            title: _("OFFER CONTENT COURSES", "wp-module-ecommerce"),
                            description: _("Create beautiful and engaging online courses, lessons, and quizzes.", "wp-module-ecommerce"),
                            name: "Offer Content Courses",
                            plsSlug: "sensei-lms",                            
                            plsProviderName: "automattic",
                            download: "https://downloads.wordpress.org/plugin/sensei-lms.latest-stable.zip",
                            basename: "sensei-lms/sensei-lms.php",
                            cta: {
                                "text": _("Create a Course", "wp-module-ecommerce"),
                                "url": "post-new.php?post_type=course"
                            },                                                     
                        },
                        {
                            title: _("ADD AN AFFILIATE PROGRAM", "wp-module-ecommerce"),
                            description: _("Grant your affiliates earnings each time someone purchases from their link.", "wp-module-ecommerce"),
                            name: "Affiliate Programs",
                            plsSlug: "yith-woocommerce-affiliates",                            
                            plsProviderName: "yith",
                            download: null,
                            basename: "yith-woocommerce-affiliates-premium/init.php",
                            cta: {
                                "text": _("Create an Affiliate Program", "wp-module-ecommerce"),
                                "url": "admin.php?page=yith_wcaf_panel&tab=settings&sub_tab=settings-general"
                            }
                        }
                    ],
        "WP_SOLUTION_SERVICE": [
                        {
                            title: _("SETUP BOOKINGS", "wp-module-ecommerce"),
                            description: _("Manage the renting or booking of services and items that you offer your customers.", "wp-module-ecommerce"),
                            name: "Bookings & Appointments",
                            plsSlug: "yith-woocommerce-booking",                            
                            plsProviderName: "yith",
                            download: null,
                            basename: "yith-woocommerce-booking-premium/init.php",
                            cta: {
                                "text": _("Setup Bookings", "wp-module-ecommerce"),
                                "url": "edit.php?post_type=yith_booking&yith-plugin-fw-panel-skip-redirect=1"
                            }
                            
                        },
                        {
                            title: _("WEBPAGE CREATION", "wp-module-ecommerce"),
                            description: _("Build webpages fast with tailored block patterns and page templates.", "wp-module-ecommerce"),
                            name: "Webpage Creation",
                            plsSlug: "",                            
                            plsProviderName: "",
                            download: null,
                            basename: "",
                            cta: {
                                "text": _("Add a Page to Your Site", "wp-module-ecommerce"),
                                "url": "post-new.php?post_type=page"
                            }
                            
                        },
                        {
                            title: _("SEARCH ENGINE OPTIMIZATION", "wp-module-ecommerce"),
                            description: _("Start increasing your search result rankings today.", "wp-module-ecommerce"),
                            name: "Yoast SEO",
                            plsSlug: "wp-seo",                            
                            plsProviderName: "yoast",
                            download: "https://downloads.wordpress.org/plugin/wordpress-seo.latest-stable.zip",
                            basename: "wordpress-seo/wp-seo.php",
                            cta: {
                                "text": _("Improve Your Search Ranking", "wp-module-ecommerce"),
                                "url": "admin.php?page=wpseo_dashboard#top#first-time-configuration"
                            }
                            
                        },
                        {
                            title: _("SETUP A LOYALTY PROGRAM", "wp-module-ecommerce"),
                            description: _("Reward customer loyalty with an effective points program.", "wp-module-ecommerce"),
                            name: "Loyalty Program",
                            plsSlug: "yith-woocommerce-points-and-rewards",                            
                            plsProviderName: "yith",
                            download: null,
                            basename: "yith-woocommerce-points-and-rewards-premium/init.php",
                            cta: {
                                "text": _("Configure Points & Rewards", "wp-module-ecommerce"),
                                "url":"admin.php?page=yith_woocommerce_points_and_rewards&tab=points&sub_tab=points-standard"
                            }                            
                        },

                    ],
        "WP_SOLUTION_COMMERCE": [
                        {
                            title: _("ENABLE PRODUCT REVIEWS", "wp-module-ecommerce"),
                            description: _("Get positive product reviews and use social proof to drive more sales.", "wp-module-ecommerce"),
                            name: "Advanced Reviews",
                            plsSlug: "yith-woocommerce-advanced-reviews",                            
                            plsProviderName: "yith",
                            download: null,
                            basename: "yith-woocommerce-advanced-reviews-premium/init.php",
                            cta: {
                                "text": _("Enable Product Reviews", "wp-module-ecommerce"),
                                "url": "admin.php?page=yith_ywar_panel"
                            }
                            
                        },
                        {
                            title: _("SETUP WISHLISTS", "wp-module-ecommerce"),
                            description: _("Let customers add products to lists and share them with family and friends.", "wp-module-ecommerce"),
                            name: "Wishlists",
                            plsSlug: "yith-woocommerce-wishlist",
                            plsProviderName: "yith",
                            download: null,
                            basename: "yith-woocommerce-wishlist-premium/init.php",
                            cta: {
                                "text": _("Setup Wishilsts", "wp-module-ecommerce"),
                                "url": "admin.php?page=yith_wcwl_panel&tab=settings&sub_tab=settings-general"
                            }                            
                        },
                        {
                            title: _("SEARCH ENGINE OPTIMIZATION", "wp-module-ecommerce"),
                            description: _("Start increasing your search result rankings today.", "wp-module-ecommerce"),
                            name: "Yoast SEO",
                            plsSlug: "wp-seo",                            
                            plsProviderName: "yoast",
                            download: "https://downloads.wordpress.org/plugin/wordpress-seo.latest-stable.zip",
                            basename: "wordpress-seo/wp-seo.php",
                            cta: {
                                "text": _("Improve Your Search Ranking", "wp-module-ecommerce"),
                                "url": "admin.php?page=wpseo_dashboard#top#first-time-configuration"
                            },
                        },
                        {
                            title: _("CREATE A SALES CAMPAIGN", "wp-module-ecommerce"),
                            description: _("Create custom upsell, cross-sell and other promotional campaigns to generate more sales.", "wp-module-ecommerce"),
                            name: "SALES CAMPAIGN",
                            plsSlug: "yith-woocommerce-dynamic-pricing-and-discounts",
                            plsProviderName: "yith",
                            download: null,
                            basename: "yith-woocommerce-dynamic-pricing-and-discounts/init.php",
                            cta: {
                                "text": _("Create a Campaign", "wp-module-ecommerce"),
                                "url": "edit.php?post_type=ywdpd_discount&yith-plugin-fw-panel-skip-redirect=1"
                            }                            
                        }
                    ],                                               
    }
]

export const myPluginsAndToolsPageLink = `${window.location.href.split('#')[0]}#/my_plugins_and_tools`;

export const solutionButtonTextObject = {
    "WP_SOLUTION_COMMERCE" : "Commerce",
    "WP_SOLUTION_SERVICE": "Service Business",
    "WP_SOLUTION_CREATOR": "Content Creator"
}