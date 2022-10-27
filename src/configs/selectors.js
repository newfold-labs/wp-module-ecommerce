export const wcTasksParser = (title) => (data) => {
  const isCompleted = (data?.[0]?.tasks ?? []).find(
    (task) => task.id === title
  )?.isComplete;
  return { isCompleted };
};

export const yithOnboardingParser = (title) => (data) => {
  return { isCompleted: data?.[title] == "true" };
};

export const wcProductsSelector = (products) => products;

export const wcGiftCardsSelector = (products) =>
  products.filter((product) => product.type === "gift-card");

export const wcBookings = (products) =>
  products.filter((product) => product.type === "booking");
