import { __ } from "@wordpress/i18n";
import { FeatureCard } from "../components/FeatureCard";
import { ReactComponent as CreativeMail } from "../icons/creativemail.svg";
import { ReactComponent as Jetpack } from "../icons/jetpack.svg";
import { ReactComponent as MonsterInsights } from "../icons/monsterinsights.svg";
import { ReactComponent as OptinMonster } from "../icons/optinmonster.svg";
import { ReactComponent as WPForms } from "../icons/wpforms.svg";
import { ReactComponent as YoastSEO } from "../icons/yoast.svg";
import { PluginsSdk } from "../sdk/plugins";
import { createPluginInstallAction } from "./actions";
import { wcPluginStatusParser } from "./selectors";

function defineFeatureState() {
  return {
    featureUrl: (data) =>
      data?.plugins?.isInstalled ? data.plugins?.pluginUrl : null,
    isActive: (data) => data?.plugins?.isInstalled,
    isDisabled: () => false,
    isInstalling: (data) => data?.plugins?.isInstalling,
    isQueueEmpty: (data) => data?.plugins?.isQueueEmpty,
    isUpsellNeeded: (data) => false,
  };
}

export const FreePluginsDefinition = (props) => ({
  dataDependencies: {
    plugins: async () =>
      PluginsSdk.queries.status(
        "woocommerce",
        "jetpack",
        "wpforms-lite",
        "google-analytics-for-wordpress",
        "wordpress-seo",
        "creative-mail-by-constant-contact",
        "optinmonster"
      ),
  },
  cards: [
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: "jetpack",
      assets: () => ({
        Image: Jetpack,
        ActionIcon: null,
      }),
      text: ({ isActive }) => ({
        title: __(
          "Jetpack Boost - Website Speed, Performance and Critical CSS",
          "wp-module-ecommerce"
        ),
        description: __(
          "Speed up your WordPress site by optimizing page performance with Jetpack Boost.",
          "wp-module-ecommerce"
        ),
        actionName: isActive ? __("Manage") : __("Enable"),
      }),
      state: defineFeatureState(),
      actions: {
        installFeature: createPluginInstallAction("jetpack", 10, props),
      },
      queries: [
        {
          key: "plugins",
          selector: wcPluginStatusParser("jetpack"),
        },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: "wpforms-lite",
      assets: () => ({
        Image: WPForms,
      }),
      text: ({ isActive }) => ({
        title: __(
          "Contact Form by WPForms - Drag & Drop Form Builder for WordPress",
          "wp-module-ecommerce"
        ),
        description: __(
          "The best WordPress contact form plugin. Drag & Drop online form builder to create beautiful contact forms, payment forms, & other custom forms.",
          "wp-module-ecommerce"
        ),
        actionName: isActive ? "Manage" : "Enable",
      }),
      state: defineFeatureState(),
      actions: {
        installFeature: createPluginInstallAction("wpforms-lite", 11, props),
      },
      queries: [
        {
          key: "plugins",
          selector: wcPluginStatusParser("wpforms-lite"),
        },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: "google-analytics-for-wordpress",
      assets: () => ({
        Image: MonsterInsights,
      }),
      text: ({ isActive }) => ({
        title: __(
          "MonsterInsights - Google Analytics Dashboard for WordPress (Website Stats Made Easy)",
          "wp-module-ecommerce"
        ),
        description: __(
          "The best free Google Analytics plugin for WordPress. See how visitors find and use your website, so you can grow your business.",
          "wp-module-ecommerce"
        ),
        actionName: isActive ? "Manage" : "Enable",
      }),
      state: defineFeatureState(),
      actions: {
        installFeature: createPluginInstallAction(
          "google-analytics-for-wordpress",
          12,
          props
        ),
      },
      queries: [
        {
          key: "plugins",
          selector: wcPluginStatusParser("google-analytics-for-wordpress"),
        },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: "wordpress-seo",
      assets: () => ({
        Image: YoastSEO,
      }),
      text: ({ isActive }) => ({
        title: __("Yoast SEO", "wp-module-ecommerce"),
        description: __(
          "Improve your WordPress SEO: Write better content and have a fully optimized WordPress site using the Yoast SEO plugin.",
          "wp-module-ecommerce"
        ),
        actionName: isActive ? "Manage" : "Enable",
      }),
      state: defineFeatureState(),
      actions: {
        installFeature: createPluginInstallAction("wordpress-seo", 13, props),
      },
      queries: [
        {
          key: "plugins",
          selector: wcPluginStatusParser("wordpress-seo"),
        },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: "creative-mail-by-constant-contact",
      assets: () => ({
        Image: CreativeMail,
      }),
      text: ({ isActive }) => ({
        title: __(
          "Creative Mail - Easier WordPress & WooCommerce Email Marketing",
          "wp-module-ecommerce"
        ),
        description: __(
          "Creative Mail was designed specifically for WordPress and WooCommerce. Our intelligent (and super fun) email editor simplifies email marketing campaign.",
          "wp-module-ecommerce"
        ),
        actionName: isActive ? "Manage" : "Enable",
      }),
      state: defineFeatureState(),
      actions: {
        installFeature: createPluginInstallAction(
          "creative-mail-by-constant-contact",
          14,
          props
        ),
      },
      queries: [
        {
          key: "plugins",
          selector: wcPluginStatusParser("creative-mail-by-constant-contact"),
        },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: "optinmonster",
      assets: () => ({
        Image: OptinMonster,
      }),
      text: ({ isActive }) => ({
        title: __("OptinMonster - Lead Generation", "wp-module-ecommerce"),
        description: __(
          "OptinMonster is the best WordPress popup builder plugin that helps you grow your email newsletter list and sales with email popups, exit intent popups, floating bars and more!",
          "wp-module-ecommerce"
        ),
        actionName: isActive ? "Manage" : "Enable",
      }),
      state: defineFeatureState(),
      actions: {
        installFeature: createPluginInstallAction("optinmonster", 15, props),
      },
      queries: [
        {
          key: "plugins",
          selector: wcPluginStatusParser("optinmonster"),
        },
      ],
    },
  ],
});
