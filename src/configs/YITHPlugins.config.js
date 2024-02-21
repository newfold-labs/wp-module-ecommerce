import { NewfoldRuntime } from '../sdk/NewfoldRuntime';
import { __ } from '@wordpress/i18n';
import { FeatureCard } from '../components/FeatureCard';
import { ReactComponent as Ecomdash } from '../icons/brands/ecomdash.svg';
import { ReactComponent as Filter } from '../icons/brands/yith-woocommerce-ajax-product-filter.svg';
import { ReactComponent as Search } from '../icons/brands/yith-woocommerce-ajax-search.svg';
import { ReactComponent as Booking } from '../icons/brands/yith-woocommerce-booking.svg';
import { ReactComponent as CustomizeAccount } from '../icons/brands/yith-woocommerce-customize-myaccount-page.svg';
import { ReactComponent as Gift } from '../icons/brands/yith-woocommerce-gift-card.svg';
import { ReactComponent as SalesFunnelLicense } from '../icons/brands/yith-woocommerce-sales-funnel.svg';
import { ReactComponent as WishList } from '../icons/brands/yith-woocommerce-wishlist.svg';
import { MarketplaceSdk } from '../sdk/marketplace';
import { PluginsSdk } from '../sdk/plugins';
import { createPluginInstallAction } from './actions';
import { findUpsellWithName, wcPluginStatusParser } from './selectors';
import { RuntimeSdk } from '../sdk/runtime';

export function defineFeatureState() {
  return {
    upsellOptions: (data) => data?.upsellOptions,
    featureUrl: (data) =>
      data?.plugins?.isInstalled ? data.plugins?.pluginUrl : null,
    isActive: (data) => data?.plugins?.isInstalled,
    isDisabled: (data) => data?.plugins?.isWCActive === false,
    isInstalling: (data) => data?.plugins?.isInstalling,
    isQueueEmpty: (data) => data?.plugins?.isQueueEmpty,
    isUpsellNeeded: () => !NewfoldRuntime.hasCapability('hasYithExtended'),
  };
}

const isBluehost = RuntimeSdk?.brandSettings?.brand?.includes('bluehost');

export const YITHPluginsDefinitions = (props) => ({
  dataDependencies: {
    plugins: async () => PluginsSdk.queries.status('all'),
    upsellOptions: MarketplaceSdk.eCommerceOptions,
  },
  cards: [
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: 'nfd_slug_yith_woocommerce_booking',
      assets: () => ({
        Image: Booking,
        ActionIcon: null,
        learnMoreUrl:
          isBluehost &&
          'https://www.bluehost.com/help/article/yith-booking-and-appointment-for-woocommerce',
      }),
      text: ({ isActive }) => ({
        title: __(
          'YITH Booking and Appointment for WooCommerce',
          'wp-module-ecommerce'
        ),
        description: __(
          'Enable a booking/appointment system to manage renting or booking of services, rooms, houses, cars, accommodation and more to make it easy for your customers to do business with you.',
          'wp-module-ecommerce'
        ),
        actionName: isActive ? __('Manage') : __('Enable'),
      }),
      state: defineFeatureState(),
      actions: {
        installFeature: createPluginInstallAction(
          'nfd_slug_yith_woocommerce_booking',
          10,
          props
        ),
      },
      queries: [
        {
          key: 'plugins',
          selector: wcPluginStatusParser('nfd_slug_yith_woocommerce_booking'),
        },
        {
          key: 'upsellOptions',
          selector: findUpsellWithName(
            'YITH Booking and Appointment for WooCommerce'
          ),
        },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: 'yith-woocommerce-ajax-search',
      assets: () => ({
        Image: Search,
      }),
      text: ({ isActive }) => ({
        title: __('YITH WooCommerce AJAX Search', 'wp-module-ecommerce'),
        description: __(
          'YITH WooCommerce AJAX Search is an effective and predictive real-time search engine on your store so users can quickly find products they want. Speed up your search and boost your sales.',
          'wp-module-ecommerce'
        ),
        actionName: isActive ? 'Manage' : 'Enable',
        slug: 'yith_wcas_panel',
      }),
      state: defineFeatureState(),
      actions: {
        installFeature: createPluginInstallAction(
          'yith-woocommerce-ajax-search',
          11,
          props
        ),
      },
      queries: [
        {
          key: 'plugins',
          selector: wcPluginStatusParser('yith-woocommerce-ajax-search'),
        },
        {
          key: 'upsellOptions',
          selector: findUpsellWithName('YITH WooCommerce AJAX Search'),
        },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: 'nfd_slug_yith_woocommerce_wishlist',
      assets: () => ({
        Image: WishList,
        learnMoreUrl:
          isBluehost &&
          'https://www.bluehost.com/help/article/yith-woocommerce-wishlist',
      }),
      text: ({ isActive }) => ({
        title: __('YITH WooCommerce Wishlist', 'wp-module-ecommerce'),
        description: __(
          'Allow your customers to create lists of products they want and share them with family and friends.',
          'wp-module-ecommerce'
        ),
        actionName: isActive ? 'Manage' : 'Enable',
        slug: 'yith_wcwl_panel',
      }),
      state: defineFeatureState(),
      actions: {
        installFeature: createPluginInstallAction(
          'nfd_slug_yith_woocommerce_wishlist',
          12,
          props
        ),
      },
      queries: [
        {
          key: 'plugins',
          selector: wcPluginStatusParser('nfd_slug_yith_woocommerce_wishlist'),
        },
        {
          key: 'upsellOptions',
          selector: findUpsellWithName('YITH WooCommerce Wishlist'),
        },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: 'nfd_slug_yith_woocommerce_ajax_product_filter',
      assets: () => ({
        Image: Filter,
        learnMoreUrl:
          isBluehost &&
          'https://www.bluehost.com/help/article/yith-woocommerce-ajax-product-filter',
      }),
      text: ({ isActive }) => ({
        title: __(
          'YITH WooCommerce AJAX Product Filter',
          'wp-module-ecommerce'
        ),
        description: __(
          'YITH WooCommerce Ajax Product Filter is the perfect way to add an advanced filter to all products in your store by size, color, price, and more to find the right product or gift with ease.',
          'wp-module-ecommerce'
        ),
        actionName: isActive ? 'Manage' : 'Enable',
        slug: 'yith_wcan_panel',
      }),
      state: defineFeatureState(),
      actions: {
        installFeature: createPluginInstallAction(
          'nfd_slug_yith_woocommerce_ajax_product_filter',
          13,
          props
        ),
      },
      queries: [
        {
          key: 'plugins',
          selector: wcPluginStatusParser(
            'nfd_slug_yith_woocommerce_ajax_product_filter'
          ),
        },
        {
          key: 'upsellOptions',
          selector: findUpsellWithName('YITH WooCommerce Ajax Product Filter'),
        },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: 'nfd_slug_yith_woocommerce_gift_cards',
      assets: () => ({
        Image: Gift,
        learnMoreUrl:
          isBluehost &&
          'https://www.bluehost.com/help/article/yith-woocommerce-gift-cards',
      }),
      text: ({ isActive }) => ({
        title: __('YITH WooCommerce Gift Cards', 'wp-module-ecommerce'),
        description: __(
          "Sell gift cards to increase your store's revenue and win new customers.",
          'wp-module-ecommerce'
        ),
        actionName: isActive ? 'Manage' : 'Enable',
        slug: 'yith_woocommerce_gift_cards_panel',
      }),
      state: defineFeatureState(),
      actions: {
        installFeature: createPluginInstallAction(
          'nfd_slug_yith_woocommerce_gift_cards',
          14,
          props
        ),
      },
      queries: [
        {
          key: 'plugins',
          selector: wcPluginStatusParser(
            'nfd_slug_yith_woocommerce_gift_cards'
          ),
        },
        {
          key: 'upsellOptions',
          selector: findUpsellWithName('YITH WooCommerce Gift Cards'),
        },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: 'nfd_slug_yith_woocommerce_customize_myaccount_page',
      assets: () => ({
        Image: CustomizeAccount,
        learnMoreUrl:
          isBluehost &&
          'https://www.bluehost.com/help/article/yith-woocommerce-customize-my-account-page',
      }),
      text: ({ isActive }) => ({
        title: __(
          'YITH WooCommerce Customize My Account Page',
          'wp-module-ecommerce'
        ),
        description: __(
          'Customize the My Account page of your customers by creating custom sections with promotions and ad-hoc content based on your needs.',
          'wp-module-ecommerce'
        ),
        actionName: isActive ? 'Manage' : 'Enable',
        slug: 'yith_wcmap_panel',
      }),
      state: defineFeatureState(),
      actions: {
        installFeature: createPluginInstallAction(
          'nfd_slug_yith_woocommerce_customize_myaccount_page',
          15,
          props
        ),
      },
      queries: [
        {
          key: 'plugins',
          selector: wcPluginStatusParser(
            'nfd_slug_yith_woocommerce_customize_myaccount_page'
          ),
        },
        {
          key: 'upsellOptions',
          selector: findUpsellWithName(
            'YITH WooCommerce Customize My Account Page'
          ),
        },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: (state) => state?.isAvailable,
      name: 'nfd_slug_ecomdash_wordpress_plugin',
      assets: () => ({ Image: Ecomdash }),
      text: ({ isActive }) => ({
        title: __('Ecomdash', 'wp-module-ecommerce'),
        description: __(
          'All your sales channels and products, managed in one place. See how this dashboard puts selling, updating, and inventory all at your fingertips. Perfect for selling on Amazon, Etsy, eBay and more.',
          'wp-module-ecommerce'
        ),
        actionName: isActive ? 'Manage' : 'Enable',
        slug: 'nfd_slug_ecomdash_wordpress_plugin',
      }),
      state: {
        ...defineFeatureState(),
        isUpsellNeeded: () => false,
        isAvailable: () => NewfoldRuntime.hasCapability('hasEcomdash'),
      },
      actions: {
        installFeature: createPluginInstallAction(
          'nfd_slug_ecomdash_wordpress_plugin',
          16,
          props
        ),
      },
      queries: [
        {
          key: 'plugins',
          selector: wcPluginStatusParser('nfd_slug_ecomdash_wordpress_plugin'),
        },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: () => false,
      name: 'nfd_slug_wonder_cart',
      assets: () => ({
        Image: SalesFunnelLicense,
      }),
      text: ({ isActive }) => ({
        title: __(
          'Complete Upsell, Cross sell & Promotions Solution',
          'wp-module-ecommerce'
        ),
        description: __(
          'Create and manage deals, sales promotions and upsell campaigns like Buy-One-Get-One and more.',
          'wp-module-ecommerce'
        ),
        actionName: isActive ? 'Manage' : 'Enable',
      }),
      state: {
        ...defineFeatureState(),
        isUpsellNeeded: () => false,
        isAvailable: () => NewfoldRuntime.hasCapability('hasYithExtended'),
        featureUrl: (data) =>
          data?.plugins?.isInstalled ? `#/store/sales_discounts` : null,
      },
      actions: {
        installFeature: createPluginInstallAction(
          'nfd_slug_wonder_cart',
          17,
          props
        ),
      },
      queries: [
        {
          key: 'plugins',
          selector: wcPluginStatusParser('nfd_slug_wonder_cart'),
        },
      ],
    },
  ],
});
