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
      title: "Free Shipping",
      description: "Attract and retain customers by offering free shipping based on cart amount, location or store category."
    },
    {
        icon: "BuyOndGetOne",
        title: "Buy 1 Get 1",
        description: "Attract customers with a compelling deal where they can buy one product and get another product for free."
    },
    {
        icon: "GiftCard",
        title: "Gift Product in Cart",
        description: "Reward customers with a free gift in their cart based on total cart value, or specific products or categories."
    },
    {
        icon: "CategoryDiscount",
        title: "Category Discount",
        description: "Give your customers a discount on specific categories of products and boost sales for those categories."
      },
      {
          icon: "ThankYouDiscount",
          title: "Upsell in Thank You Page",
          description: "Maximize sales by presenting relevant upsell options after customers have completed their purchase."
      },
      {
          icon: "LastMinuteDeal",
          title: "Last Minute Deal",
          description: "Create urgency with a special time-limited deal for customers on the cart and checkout pages."
      }
];

//TODO: To add slug & providerName information for all plugins once it is available
export const wpSolutionsPromotedPluginsList = [
    {
        "WP_SOLUTION_CREATOR": [
                        {
                            title: "WEBPAGE CREATION",
                            description: "Build webpages fast with tailored block patterns and page templates included in your hosting package.",
                            buttonText: "Add a Page to Your Site",
                            slug: "",
                            providerName: ""
                        },
                        {
                            title: "SEARCH ENGINE OPTIMIZATION",
                            description: "Start increasing your search result rankings today.",
                            buttonText: "Improve Your Search Ranking",
                            slug: "wp-seo",
                            providerName: ""
                        },
                        {
                            title: "OFFER CONTENT COURSES",
                            description: "Create beautiful and engaging online courses, lessons, and quizzes.",
                            buttonText: "Create a Course",
                            slug: "sensei-lms",
                            providerName: "" 
                        },
                        {
                            title: "ADD AN AFFILIATE PROGRAM",
                            description: "Grant your affiliates earnings each time someone purchases from their link.",
                            buttonText: "Create an Affiliate Program",
                            slug: "",
                            providerName: ""
                        }
                    ],
        "WP_SOLUTION_SERVICE": [
                        {
                            title: "SETUP BOOKINGS",
                            description: "Manage the renting or booking of services and items that you offer your customers.",
                            buttonText: "Setup Bookings",
                            slug: "",
                            providerName: ""
                        },
                        {
                            title: "WEBPAGE CREATION",
                            description: "Build webpages fast with tailored block patterns and page templates.",
                            buttonText: "Add a Page to Your Site",
                            slug: "",
                            providerName: ""
                        },
                        {
                            title: "SEARCH ENGINE OPTIMIZATION",
                            description: "Start increasing your search result rankings today.",
                            buttonText: "Improve Your Search Ranking",
                            slug: "wp-seo",
                            providerName: ""
                        },
                        {
                            title: "SETUP A LOYALTY PROGRAM",
                            description: "Reward customer loyalty with an effective points program.",
                            buttonText: "Configure Points & Rewards",
                            slug: "",
                            providerName: ""
                        },

                    ],
        "WP_SOLUTION_COMMERCE": [
                        {
                            title: "SETUP WISHLISTS",
                            description: "Let customers add products to lists and share them with family and friends.",
                            buttonText: "Setup Wishilsts",
                            slug: "",
                            providerName: ""
                        },
                        {
                            title: "ENABLE PRODUCT REVIEWS",
                            description: "Get positive product reviews and use social proof to drive more sales.",
                            buttonText: "Enable Product Reviews",
                            slug: "",
                            providerName: ""
                        },
                        {
                            title: "CREATE A SALES CAMPAIGN",
                            description: "Create custom upsell, cross-sell and other promotional campaigns to generate more sales.",
                            buttonText: "Create a Campaign",
                            slug: "nfd_slug_wonder_cart",
                            providerName: ""
                        },
                        {
                            title: "SEARCH ENGINE OPTIMIZATION",
                            description: "Start increasing your search result rankings today.",
                            buttonText: "Improve Your Search Ranking",
                            slug: "wp-seo",
                            providerName: ""
                        },

                    ],                                               
    }
]

export const myPluginsAndToolsPageLink = `${window.location.href.split('#')[0]}#/my_plugins_and_tools`;

export const solutionButtonTextObject = {
    "WP_SOLUTION_COMMERCE" : "Commerce",
    "WP_SOLUTION_SERVICE": "Service Business",
    "WP_SOLUTION_CREATOR": "Content Creator"
}