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

export const wcPluginStatusParser = (slug, title) => (data) => {
  const isInstalled = data.status?.[title] === "Active";
  const isInstalling = data?.status?.["queue-status"].some(
    (queue) => queue.slug === slug
  );
  const isQueueEmpty = data.status?.["queue-status"].length === 0;
  return { isInstalled, isInstalling, isQueueEmpty };
};
