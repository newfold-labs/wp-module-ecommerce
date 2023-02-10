import apiFetch from "@wordpress/api-fetch";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardMedia,
  Spinner,
  TabPanel,
} from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import classnames from "classnames";

const ui = {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardMedia,
  TabPanel,
  Spinner,
};

const constants = {
  resturl: window.nfdRestRoot,
  eventendpoint: "/newfold-data/v1/events/",
  perPage: 12,
  supportsCTB: window.nfdConnected,
};

/**
 * @typedef {Object} MarketplaceProduct
 * @property {string} id UUID
 * @property {string[]} categories Categories for the product
 * @property {string} name Display name
 * @property {"plugin" | "service" | "theme"} type
 * @property {string} vendor_id UUID
 * @property {{ name: string }?} vendor Vendor for the product. Can be YITH, Yoast etc.
 */

/**
 * @typedef {Object} MarketplaceCategory
 * @property {string} name Name of the category
 * @property {number} product_count No. of products under this category
 * @property {string} title Display title for UI
 */

/**
 * @typedef {Object} MarketPlaceCollections
 * @property {{ data: MarketplaceCategory[] }} categories
 * @property {{ data: MarketplaceProduct[] }} products
 */

/**
 * @param {MarketPlaceCollections} marketplace
 */
function onlyAllowECommerceProducts(marketplace) {
  marketplace.categories.data = marketplace.categories.data.filter((category) =>
    ["ecommerce", "featured"].includes(category.name)
  );
  marketplace.products.data = marketplace?.products?.data?.filter(
    (product) => product.vendor?.name === "YITH"
  );
  return marketplace;
}

export function Marketplace({ wpModules }) {
  let [pathname, navigate] = useState("/marketplace/ecommerce");

  const methods = {
    apiFetch: (args) => apiFetch(args).then(onlyAllowECommerceProducts),
    classnames,
    useState,
    useEffect,
    // To avoid actual path changes, we'll stub these hooks with local state.
    useNavigate() {
      return navigate;
    },
    useLocation() {
      return { pathname };
    },
  };
  return (
    <wpModules.NewfoldMarketplace
      Components={ui}
      methods={methods}
      constants={constants}
    />
  );
}
