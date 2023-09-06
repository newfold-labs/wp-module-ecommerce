export const wcTasksParser = (title) => (data) => {
  const isCompleted = (data?.[0]?.tasks ?? []).find(
    (task) => task.id === title
  )?.isComplete;
  return { isCompleted };
};

export const yithOnboardingParser = (title) => (data) => {
  return { isCompleted: data?.[title] == "true" };
};

export const yithOnboardingPaymentParser = (titles) => (data) => {
  let isCompleted = false;
  titles.forEach(val => {
    if(data?.[val] == "true")  isCompleted = true;
  });
  return { isCompleted: isCompleted };
};

export const yithOnboardingStoreParser = () => (data) => {
  if(data["woocommerce_store_address"] && data["woocommerce_store_city"] && data["woocommerce_store_postcode"]) return true;
  return false
}

export const razorpaySelector = (response) => {
  return {
    settings: response?.woocommerce_razorpay_settings,
  };
};

export const wcProductsParser = (type) => (products) => {
  return type === "all"
    ? products
    : products.filter((product) => product.type === type);
};

export const wcPluginStatusParser = (slug) => (data) => {
  const isInstalled = data?.details?.[slug].status === "active";
  const isQueueEmpty = data?.queue?.length === 0;
  const isInstalling = data?.queue?.includes(slug);
  const isWCActive = data?.details?.woocommerce.status === "active";
  const pluginUrl = data?.details?.[slug].url;
  return { isInstalled, isInstalling, isQueueEmpty, isWCActive, pluginUrl };
};

export const findUpsellWithName = (name) => (upsellOptions) => {
  return upsellOptions?.find((option) => option.name === name);
};
