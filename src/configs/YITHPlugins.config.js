import { NewfoldRuntime } from '../sdk/NewfoldRuntime';
import { __ } from '@wordpress/i18n';
import { FeatureCard } from '../components/FeatureCard';
import Ecomdash from '../icons/ecomdash.svg';
import Filter from '../icons/brands/yith-woocommerce-ajax-product-filter.svg';
import Search from '../icons/brands/yith-woocommerce-ajax-search.svg';
import Booking from '../icons/brands/yith-woocommerce-booking.svg';
import CustomizeAccount from '../icons/brands/yith-woocommerce-customize-myaccount-page.svg';
import Gift from '../icons/brands/yith-woocommerce-gift-card.svg';
import WonderCart from '../icons/wonder-cart.svg';
import WishList from '../icons/brands/yith-woocommerce-wishlist.svg';
import { MarketplaceSdk } from '../sdk/marketplace';
import { PluginsSdk } from '../sdk/plugins';
import { createPluginInstallAction } from './actions';
import { findUpsellWithName, wcPluginStatusParser } from './selectors';
import {
  YITH_WOOCOMMERCE_ACCOUNT_PAGE,
  YITH_WOOCOMMERCE_AJAX_PRODUCT_FILTER,
  YITH_WOOCOMMERCE_BOOKING_APPOINTMENTS,
  YITH_WOOCOMMERCE_GIFT_CARDS,
  YITH_WOOCOMMERCE_WISHLIST
} from '../constants';

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

export const YITHPluginsDefinitions = (props) => ({
  dataDependencies: {
    plugins: async () => PluginsSdk.queries.status('all'),
    upsellOptions: MarketplaceSdk.eCommerceOptions,
  },
  cards: [
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: 'nfd_slug_yith_woocommerce_gift_cards',
      assets: () => ({
        Image: Gift,
        learnMoreUrl: YITH_WOOCOMMERCE_GIFT_CARDS,
      }),
      text: ({ isActive }) => ({
        title: __('Gift Cards', 'wp-module-ecommerce'),
        description: __(
          "Offer customizable gift cards with personalized messages for the recipient.",
          'wp-module-ecommerce'
        ),
        actionName: isActive ? __('Configure Gift Cards', 'wp-module-ecommerce') : __('Create a Gift Card', 'wp-module-ecommerce'),
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
      name: 'nfd_slug_yith_woocommerce_wishlist',
      assets: () => ({
        Image: WishList,
        learnMoreUrl: YITH_WOOCOMMERCE_WISHLIST,
      }),
      text: ({ isActive }) => ({
        title: __('Wishlist', 'wp-module-ecommerce'),
        description: __(
          'Let customers add products to lists and share them with family and friends.',
          'wp-module-ecommerce'
        ),
        actionName: isActive ? __('Manage', 'wp-module-ecommerce') : __('Setup Wishlists', 'wp-module-ecommerce'),
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
      name: 'nfd_slug_wonder_cart',
      assets: () => ({
        Image: WonderCart,
      }),
      text: ({ isActive }) => ({
        title: __(
          'WonderCart',
          'wp-module-ecommerce'
        ),
        primaryUrl: "admin.php?page=bluehost#/store/sales_discounts",
        description: __(
          'Create custom upsell, cross-sell and other promotional campaigns to generate more sales.',
          'wp-module-ecommerce'
        ),
        actionName: isActive ? __('Configure Campaign', 'wp-module-ecommerce') : __('Create a Campaign', 'wp-module-ecommerce'),
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
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: 'nfd_slug_yith_woocommerce_booking',
      assets: () => ({
        Image: Booking,
        ActionIcon: null,
        learnMoreUrl: YITH_WOOCOMMERCE_BOOKING_APPOINTMENTS,
      }),
      text: ({ isActive }) => ({
        title: __(
          'Booking and Appointments',
          'wp-module-ecommerce'
        ),
        description: __(
          'Manage renting or booking of services and items so customers can do business with you.',
          'wp-module-ecommerce'
        ),
        actionName: isActive ? __('Setup Now', 'wp-module-ecommerce') : __('Setup Bookings & Appointments', 'wp-module-ecommerce'),
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
      name: 'nfd_slug_yith_woocommerce_ajax_product_filter',
      assets: () => ({
        Image: Filter,
        learnMoreUrl: YITH_WOOCOMMERCE_AJAX_PRODUCT_FILTER,
      }),
      text: ({ isActive }) => ({
        title: __(
          'Product Filter',
          'wp-module-ecommerce'
        ),
        description: __(
          'Add an advanced filter to help customers find the right product with ease.',
          'wp-module-ecommerce'
        ),
        actionName: isActive ? __('Manage', 'wp-module-ecommerce') : __('Setup Product Filters', 'wp-module-ecommerce'),
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
      name: 'yith-woocommerce-ajax-search',
      assets: () => ({
        Image: Search,
      }),
      text: ({ isActive }) => ({
        title: __('Product Search', 'wp-module-ecommerce'),
        description: __(
          'Speed up search for your customers with a predictive real-time search engine.',
          'wp-module-ecommerce'
        ),
        actionName: isActive ? __('Configure Product Search', 'wp-module-ecommerce') : __('Enable', 'wp-module-ecommerce'),
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
      name: 'nfd_slug_yith_woocommerce_customize_myaccount_page',
      assets: () => ({
        Image: CustomizeAccount,
        learnMoreUrl: YITH_WOOCOMMERCE_ACCOUNT_PAGE,
      }),
      text: ({ isActive }) => ({
        title: __(
          'Customize My Account Page',
          'wp-module-ecommerce'
        ),
        description: __(
          'Add custom content like videos, files, discount codes, and more to your customers account page.',
          'wp-module-ecommerce'
        ),
        actionName: isActive ? __('Manage', 'wp-module-ecommerce') : __('Customize the My Account Page', 'wp-module-ecommerce'),
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
      shouldRender: () => true,
      name: 'nfd_slug_ecomdash_wordpress_plugin',
      assets: () => ({ Image: Ecomdash }),
      text: ({ isActive }) => ({
        title: __('ecomdash', 'wp-module-ecommerce'),
        description: __(
          'Boost sales by selling your products and services across multiple marketplaces.',
          'wp-module-ecommerce'
        ),
        actionName: isActive ? __('Manage', 'wp-module-ecommerce') : __('Setup Sales Channels', 'wp-module-ecommerce'),
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

  ],
});
