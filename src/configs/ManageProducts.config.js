import { MultipleActionsCard } from "../components/MultipleActionsCard";
import { StandardCard } from "../components/StandardCard";
import { ReactComponent as AddProducts } from "../icons/add-products.svg";
import { ReactComponent as GiftCard } from "../icons/gift.svg";
import { ReactComponent as Booking } from "../icons/booking.svg";
import { ReactComponent as ImportProducts } from "../icons/import-products.svg";
import {
  wcBookings,
  wcGiftCardsSelector,
  wcProductsSelector,
} from "./selectors";

const getUrl = (href) => {
  let [page, qs] = href.split("?");
  let query = new URLSearchParams(qs);
  query.set("return_to_nfd", window.location.hash.replace("#", ""));
  return `${page}?${query}`;
};

const withBaseColor = (Icon) => (props) =>
  <Icon {...props} style={{ color: "#000", fill: "none" }} />;

const GiftCardIcon = withBaseColor(GiftCard);
const BookingIcon = withBaseColor(Booking);

const ManageProducts = (plugins) => [
  {
    Card: StandardCard,
    shouldRender: () => true,
    title: "add_products",
    assets: (state) => ({ Icon: AddProducts }),
    text: (state) => ({
      title: state.hasAddedProduct ? "Manage Products" : "Add a Product",
      actionName: state.hasAddedProduct ? "Manage" : "Add now",
    }),
    state: {
      hasAddedProduct: (data) => data?.wcProductsList?.length > 0,
      showCompletedIcon: (data) => false,
    },
    actions: {
      buttonClick: (state, setShowModal) => {
        window.location.href = getUrl(
          state.hasAddedProduct
            ? "edit.php?post_type=product"
            : "admin.php?page=wc-admin&task=products"
        );
      },
    },
    dataDependencies: [
      {
        endpoint: "/wc/v3/products",
        selector: wcProductsSelector,
        refresh: "wcProductsList",
      },
    ],
  },
  {
    Card: StandardCard,
    shouldRender: () => true,
    title: "import_products",
    assets: (state) => ({ Icon: ImportProducts }),
    text: (state) => ({
      title: "Import Products",
      actionName: "Import via CSV",
    }),
    state: {
      showCompletedIcon: (data) => false,
    },
    actions: {
      buttonClick: (state, setShowModal) => {
        window.location.href = getUrl("edit.php?post_type=product&page=product_importer");
      },
    },
    dataDependencies: [],
  },
  {
    Card: StandardCard,
    shouldRender: (state) =>
      plugins?.status.yith_woocommerce_gift_cards_panel !== "Not Installed" &&
      state?.hasUsedPlugin === false,
    title: "create_gift_card",
    assets: (state) => ({ Icon: GiftCardIcon }),
    text: (state) => ({
      title: "Create a Gift Card",
      actionName: "Create now",
    }),
    state: {
      showCompletedIcon: (data) => false,
      hasUsedPlugin: (data) =>
        data.yith_woocommerce_gift_cards_panel.length > 0,
    },
    actions: {
      buttonClick: (state, setShowModal) => {
        window.location.href = getUrl("post-new.php?post_type=gift_card");
      },
    },
    dataDependencies: [
      {
        endpoint: "/wc/v3/products",
        selector: wcGiftCardsSelector,
        refresh: "yith_woocommerce_gift_cards_panel",
      },
    ],
  },
  {
    Card: MultipleActionsCard,
    shouldRender: (state) =>
      plugins?.status.yith_woocommerce_gift_cards_panel !== "Not Installed" &&
      state?.hasAddedGiftCards === true,
    title: "manage_gift_card",
    assets: (state) => ({ Icon: GiftCardIcon }),
    text: (state) => ({ title: "Manage Gift Cards", actionName: "Manage" }),
    state: {
      hasAddedGiftCards: (data) =>
        data.yith_woocommerce_gift_cards_panel.length > 0,
      controls: (data) => [
        { title: "Create a gift card", action: "create_gift_card" },
        { title: "View/Edit a gift card", action: "view_gift_card" },
        { title: "Manage gift card settings", action: "manage_gift_card" },
      ],
    },
    actions: {
      onSelectAction: (state, action, opts) => {
        let url =
          action === "create_gift_card"
            ? "post-new.php?post_type=gift_card"
            : action === "view_gift_card"
            ? "admin.php?page=yith_woocommerce_gift_cards_panel"
            : "admin.php?page=yith_woocommerce_gift_cards_panel&tab=general";
        window.location.href = getUrl(url);
      },
    },
    dataDependencies: [
      {
        endpoint: "/wc/v3/products",
        selector: wcGiftCardsSelector,
        refresh: "yith_woocommerce_gift_cards_panel",
      },
    ],
  },
  {
    Card: StandardCard,
    shouldRender: () =>
      plugins?.status.nfd_slug_yith_woocommerce_booking !== "Not Installed",
    title: "nfd_slug_yith_woocommerce_booking",
    assets: (state) => ({ Icon: BookingIcon }),
    text: (state) => ({
      title: state.hasUsedPlugin ? "Manage Bookings" : "Setup Bookings",
      actionName: state.hasUsedPlugin ? "Manage" : "Create now",
    }),
    state: {
      hasUsedPlugin: (data) =>
        data.nfd_slug_yith_woocommerce_booking.length > 0,
      showCompletedIcon: (data) => false,
    },
    actions: {
      buttonClick: (state, setShowModal) => {
        window.location.href = getUrl("admin.php?page=yith_wcbk_panel");
      },
    },
    dataDependencies: [
      {
        endpoint: "/wc/v3/products",
        selector: wcBookings,
        refresh: "nfd_slug_yith_woocommerce_booking",
      },
    ],
  },
];

export default ManageProducts;
