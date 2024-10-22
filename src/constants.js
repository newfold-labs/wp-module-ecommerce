export const YITH_WOOCOMMERCE_BOOKING_APPOINTMENTS =
	'https://docs.yithemes.com/yith-woocommerce-booking-extended/';
export const YITH_WOOCOMMERCE_WISHLIST =
	'https://docs.yithemes.com/yith-woocommerce-wishlist-extended/';
export const YITH_WOOCOMMERCE_AJAX_PRODUCT_FILTER =
	'https://docs.yithemes.com/yith-woocommerce-ajax-product-filter-extended/';
export const YITH_WOOCOMMERCE_GIFT_CARDS =
	'https://docs.yithemes.com/yith-woocommerce-gift-cards-extended/';
export const YITH_WOOCOMMERCE_ACCOUNT_PAGE =
	'https://docs.yithemes.com/yith-woocommerce-customize-myaccount-page-extended/';

export const BH_UR_REGEX = /\b\w+(\.\w+)*\.mybluehost\.me\b/;
export const HG_UR_REGEX = /\b\w+(\.\w+)*\.temporary\.site\b/;

export const VIEW_GUIDE_LINK = {
	bluehost: 'https://www.bluehost.com/help',
	hostgator: 'https://www.hostgator.com/help',
};

export const wonderCartPopularCampaignsList = [
	{
		icon: 'FreeShipping',
		title: 'Free Shipping',
		description:
			'Attract and retain customers by offering free shipping based on cart amount, location or store category.',
	},
	{
		icon: 'BuyOndGetOne',
		title: 'Buy 1 Get 1',
		description:
			'Attract customers with a compelling deal where they can buy one product and get another product for free.',
	},
	{
		icon: 'GiftCard',
		title: 'Gift Product in Cart',
		description:
			'Reward customers with a free gift in their cart based on total cart value, or specific products or categories.',
	},
	{
		icon: 'CategoryDiscount',
		title: 'Category Discount',
		description:
			'Give your customers a discount on specific categories of products and boost sales for those categories.',
	},
	{
		icon: 'ThankYouDiscount',
		title: 'Upsell in Thank You Page',
		description:
			'Maximize sales by presenting relevant upsell options after customers have completed their purchase.',
	},
	{
		icon: 'LastMinuteDeal',
		title: 'Last Minute Deal',
		description:
			'Create urgency with a special time-limited deal for customers on the cart and checkout pages.',
	},
];

export const wpSolutionsPromotedPluginsList = [
	{
		WP_SOLUTION_CREATOR: [
			{
				title: 'WEBPAGE CREATION',
				description:
					'Build webpages fast with tailored block patterns and page templates included in your hosting package.',
				name: 'Webpage Creation',
				plsSlug: null,
				plsProviderName: null,
				download: null,
				basename: 'post-new.php?post_type=page',
				cta: {
					url: '{siteUrl}/wp-admin/post-new.php?post_type=page',
					text: 'Add a Page to Your Site',
				},
			},
			{
				title: 'SEARCH ENGINE OPTIMIZATION',
				description:
					'Start increasing your search result rankings today.',
				name: 'Yoast SEO',
				plsSlug: null,
				plsProviderName: null,
				download:
					'https://downloads.wordpress.org/plugin/wordpress-seo.latest-stable.zip',
				basename: 'wordpress-seo/wp-seo.php',
				cta: {
					url: '{siteUrl}/wp-admin/admin.php?page=wpseo_dashboard#top#first-time-configuration',
					text: 'Improve Your Search Ranking',
				},
			},
			{
				title: 'OFFER CONTENT COURSES',
				description:
					'Create beautiful and engaging online courses, lessons, and quizzes.',
				name: 'Offer Content Courses',
				plsSlug: 'sensei-lms',
				plsProviderName: 'automattic',
				download:
					'https://downloads.wordpress.org/plugin/sensei-lms.latest-stable.zip',
				basename: 'sensei-lms/sensei-lms.php',
				cta: {
					url: '{siteUrl}/wp-admin/post-new.php?post_type=course',
					text: 'Create a Course',
				},
			},
			{
				title: 'ADD AN AFFILIATE PROGRAM',
				description:
					'Grant your affiliates earnings each time someone purchases from their link.',
				name: 'Affiliate Programs',
				plsSlug: 'yith-woocommerce-affiliates',
				plsProviderName: 'yith',
				download: null,
				basename: 'yith-woocommerce-affiliates-premium/init.php',
				cta: {
					url: '{siteUrl}/wp-admin/admin.php?page=yith_wcaf_panel&tab=settings&sub_tab=settings-general',
					text: 'Create an Affiliate Program',
				},
			},
		],
		WP_SOLUTION_SERVICE: [
			{
				title: 'SETUP BOOKINGS',
				description:
					'Manage the renting or booking of services and items that you offer your customers.',
				name: 'Bookings & Appointments',
				plsSlug: 'yith-woocommerce-booking',
				plsProviderName: 'yith',
				download: null,
				basename: 'yith-woocommerce-booking-premium/init.php',
				cta: {
					url: '{siteUrl}/wp-admin/edit.php?post_type=yith_booking&yith-plugin-fw-panel-skip-redirect=1',
					text: 'Setup Bookings',
				},
			},
			{
				title: 'WEBPAGE CREATION',
				description:
					'Build webpages fast with tailored block patterns and page templates.',
				name: 'Webpage Creation',
				plsSlug: null,
				plsProviderName: null,
				download: null,
				basename: 'post-new.php?post_type=page',
				cta: {
					url: '{siteUrl}/wp-admin/post-new.php?post_type=page',
					text: 'Add a Page to Your Site',
				},
			},
			{
				title: 'SEARCH ENGINE OPTIMIZATION',
				description:
					'Start increasing your search result rankings today.',
				name: 'Yoast SEO',
				plsSlug: null,
				plsProviderName: null,
				download:
					'https://downloads.wordpress.org/plugin/wordpress-seo.latest-stable.zip',
				basename: 'wordpress-seo/wp-seo.php',
				cta: {
					url: '{siteUrl}/wp-admin/admin.php?page=wpseo_dashboard#top#first-time-configuration',
					text: 'Improve Your Search Ranking',
				},
			},
			{
				title: 'SETUP A LOYALTY PROGRAM',
				description:
					'Reward customer loyalty with an effective points program.',
				name: 'Loyalty Program',
				plsSlug: 'yith-woocommerce-points-and-rewards',
				plsProviderName: 'yith',
				download: null,
				basename:
					'yith-woocommerce-points-and-rewards-premium/init.php',
				cta: {
					url: '{siteUrl}/wp-admin/admin.php?page=yith_woocommerce_points_and_rewards&tab=points&sub_tab=points-standard',
					text: 'Configure Points & Rewards',
				},
			},
		],
		WP_SOLUTION_COMMERCE: [
			{
				title: 'ENABLE PRODUCT REVIEWS',
				description:
					'Get positive product reviews and use social proof to drive more sales.',
				name: 'Advanced Reviews',
				plsSlug: 'yith-woocommerce-advanced-reviews',
				plsProviderName: 'yith',
				download: null,
				basename: 'yith-woocommerce-advanced-reviews-premium/init.php',
				cta: {
					url: '{siteUrl}/wp-admin/admin.php?page=yith_ywar_panel',
					text: 'Enable Product Reviews',
				},
			},
			{
				title: 'SETUP WISHLISTS',
				description:
					'Let customers add products to lists and share them with family and friends.',
				name: 'Wishlists',
				plsSlug: 'yith-woocommerce-wishlist',
				plsProviderName: 'yith',
				download: null,
				basename: 'yith-woocommerce-wishlist-premium/init.php',
				cta: {
					url: '{siteUrl}/wp-admin/admin.php?page=yith_wcwl_panel&tab=settings&sub_tab=settings-general',
					text: 'Setup Wishilsts',
				},
			},
			{
				title: 'SEARCH ENGINE OPTIMIZATION',
				description:
					'Start increasing your search result rankings today.',
				name: 'Yoast SEO',
				plsSlug: null,
				plsProviderName: null,
				download:
					'https://downloads.wordpress.org/plugin/wordpress-seo.latest-stable.zip',
				basename: 'wordpress-seo/wp-seo.php',
				cta: {
					url: '{siteUrl}/wp-admin/admin.php?page=wpseo_dashboard#top#first-time-configuration',
					text: 'Improve Your Search Ranking',
				},
			},
			{
				title: 'CREATE A SALES CAMPAIGN',
				description:
					'Create custom upsell, cross-sell and other promotional campaigns to generate more sales.',
				name: 'SALES CAMPAIGN',
				plsSlug: 'yith-woocommerce-dynamic-pricing-and-discounts',
				plsProviderName: 'yith',
				download: null,
				basename:
					'yith-woocommerce-dynamic-pricing-and-discounts/init.php',
				cta: {
					url: '{siteUrl}/wp-admin/edit.php?post_type=ywdpd_discount&yith-plugin-fw-panel-skip-redirect=1',
					text: 'Create a Campaign',
				},
			},
		],
	},
];

export const myPluginsAndToolsPageLink = `${
	window.location.href.split( '#' )[ 0 ]
}#/my_plugins_and_tools`;

export const solutionButtonTextObject = {
	WP_SOLUTION_COMMERCE: 'Commerce',
	WP_SOLUTION_SERVICE: 'Service Business',
	WP_SOLUTION_CREATOR: 'Content Creator',
};
