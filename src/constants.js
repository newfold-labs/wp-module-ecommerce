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


export const wpSolutionsPluginsList = [
    {
        "Creator": [
                        {
                            title: "WEBPAGE CREATION",
                            description: "Build webpages fast with tailored block patterns and page templates included in your hosting package.",
                            buttonText: "Add a Page to Your Site",
                            href: ""
                        },
                        {
                            title: "SEARCH ENGINE OPTIMIZATION",
                            description: "Start increasing your search result rankings today.",
                            buttonText: "Improve Your Search Ranking",
                            href: ""
                        },
                        {
                            title: "OFFER CONTENT COURSES",
                            description: "Create beautiful and engaging online courses, lessons, and quizzes.",
                            buttonText: "Create a Course",
                            href: "" 
                        },
                        {
                            title: "ADD AN AFFILIATE PROGRAM",
                            description: "Grant your affiliates earnings each time someone purchases from their link.",
                            buttonText: "Create an Affiliate Program",
                            href: ""
                        }
                    ],
        "Agency": [
                        {
                            title: "SETUP BOOKINGS",
                            description: "Manage the renting or booking of services and items that you offer your customers.",
                            buttonText: "Setup Bookings",
                            href: ""
                        },
                        {
                            title: "WEBPAGE CREATION",
                            description: "Build webpages fast with tailored block patterns and page templates.",
                            buttonText: "Add a Page to Your Site",
                            href: ""
                        },
                        {
                            title: "SEARCH ENGINE OPTIMIZATION",
                            description: "Start increasing your search result rankings today.",
                            buttonText: "Improve Your Search Ranking",
                            href: ""
                        },
                        {
                            title: "SETUP A LOYALTY PROGRAM",
                            description: "Reward customer loyalty with an effective points program.",
                            buttonText: "Configure Points & Rewards",
                            href: ""
                        },

                    ],
        "Commerce": [
                        {
                            title: "SETUP WISHLISTS",
                            description: "Let customers add products to lists and share them with family and friends.",
                            buttonText: "Setup Wishilsts",
                            href: ""
                        },
                        {
                            title: "ENABLE PRODUCT REVIEWS",
                            description: "Get positive product reviews and use social proof to drive more sales.",
                            buttonText: "Enable Product Reviews",
                            href: ""
                        },
                        {
                            title: "CREATE A SALES CAMPAIGN",
                            description: "Create custom upsell, cross-sell and other promotional campaigns to generate more sales.",
                            buttonText: "Create a Campaign",
                            href: ""
                        },
                        {
                            title: "SEARCH ENGINE OPTIMIZATION",
                            description: "Start increasing your search result rankings today.",
                            buttonText: "Improve Your Search Ranking",
                            href: ""
                        },

                    ],                    
        "none":     [
                        {
                            title: "SETUP WISHLISTS",
                            description: "Let customers add products to lists and share them with family and friends.",
                            buttonText: "Setup Wishilsts",
                            href: ""
                        },
                        {
                            title: "ENABLE PRODUCT REVIEWS",
                            description: "Get positive product reviews and use social proof to drive more sales.",
                            buttonText: "Enable Product Reviews",
                            href: ""
                        },
                        {
                            title: "CREATE A SALES CAMPAIGN",
                            description: "Create custom upsell, cross-sell and other promotional campaigns to generate more sales.",
                            buttonText: "Create a Campaign",
                            href: ""
                        },
                        {
                            title: "SEARCH ENGINE OPTIMIZATION",
                            description: "Start increasing your search result rankings today.",
                            buttonText: "Improve Your Search Ranking",
                            href: ""
                        },
                    ],           
        
    }
]


export const solutionsMockAPIResponse = {
    "solution": null,
    "entitlements": [],
    "categories": [],
    "solutions": [
        {
            "name": "Commerce",
            "sku": "SOLUTIONS_COMMERCE",
            "description": "Promote, sell, and grow your online store with powerful eCommerce tools.",
            "price": "$22.92",
            "fullPrice": "$35.08",
            "url": "http://www.schumm.info/quaerat-asperiores-velit-consequuntur-iure-sequi-aut-deleniti",
            "ctbId": null,
            "features": ["Monetize Content with Ease", "4 Exclusive Social Media Plugins", "6 Exclusive Marketing Plugins", "Secure Payment Gateway Included"]
        },
        {
            "name": "Agency",
            "sku": "SOLUTIONS_SERVICE",
            "description": "Boost local visibility and streamline your business operations with specialized tools.",
            "price": "$24.09",
            "fullPrice": "$33.30",
            "url": "http://boyer.com/odit-nobis-ut-est",
            "ctbId": null,
            "features": ["Includes the Content Creator bundle", "8 Exclusive Local Business Plugins", "Integrated Invoicing", "Local Social Media and SEO Plugins"]
        },
        {
            "name": "Creator",
            "sku": "SOLUTIONS_CONTENT",
            "description": "Manage your site, build your brand, and monetize your content with essential tools.",
            "price": "$27.29",
            "fullPrice": "$39.76",
            "url": "https://www.hegmann.com/maxime-odit-blanditiis-cumque-qui",
            "ctbId": null,
            "features": ["Includes the Service Business bundle", "Express 1-Click Checkout", "24 Exclusive eCommerce Plugins", "Customizable Customer Account Creation"]
        }
    ]
}