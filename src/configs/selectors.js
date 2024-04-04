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
  let isCompleted = titles.some(key => data?.[key] === "true");
  return { isCompleted: isCompleted };
};

export const yithOnboardingStoreParser = () => (data) => {
  return data.woocommerce_store_address && data.woocommerce_store_city && data.woocommerce_store_postcode
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

export const mediaUploadedSelector = () => (mediaData) => {
  return mediaData.filter(media => media?.media_details?.file?.includes("/")).length > 0
};

export const getAcademyEnrollmentDetails = () => (data) => {
  return {
    isNovice: data.onboarding_experience_level == "1",
    BH_signed_up: data.bluehost_academy_signup_clicked,
    Yoast_signed_up: data.yoast_seo_signup_status,
  };
};

export const getOrderList = () => (ordersList) => {
  return {
    pendingOrders: ordersList.filter(order => (order.status === 'processing') || (order.status === 'on-hold') || (order.status === 'pending')), 
    ordersCount: ordersList.length
  }
}

export const get_tax_configured = (list) => {
  return list.woocommerce_calc_taxes === "yes"
}
