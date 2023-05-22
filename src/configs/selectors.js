export const wcTasksParser = (title) => (data) => {
  const isCompleted = (data?.[0]?.tasks ?? []).find(
    (task) => task.id === title
  )?.isComplete;
  return { isCompleted };
};

export const yithOnboardingParser = (title) => (data) => {
  return { isCompleted: data?.[title] == "true" };
};

export const razorpaySelector = (response) => {
  return {
    settings: response?.woocommerce_razorpay_settings,
  };
};

export const wcProductsSelector = (products) => products;

export const wcGiftCardsSelector = (products) =>
  products.filter((product) => product.type === "gift-card");

export const wcBookings = (products) =>
  products.filter((product) => product.type === "booking");

export const wcPluginStatusParser = (slug) => (data) => {
  const isInstalled = data?.details?.[slug].status === "active";
  const isInstalling = data?.queue?.some((queue) => queue.slug === slug);
  const isQueueEmpty = data?.queue?.length === 0;
  const isWCActive = data?.details?.woocommerce.status === "active";
  const pluginUrl = data?.details?.[slug].url;
  return { isInstalled, isInstalling, isQueueEmpty, isWCActive, pluginUrl };
};
