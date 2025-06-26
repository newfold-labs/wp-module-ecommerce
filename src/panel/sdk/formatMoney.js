/**
 * @typedef FormatCurrency
 * @property {number?} cost
 * @property {string} currency
 * @property {"code" | "symbol"} currencyDisplay
 */

const CURRENCY_LOCALE = { USD: "en-US", INR: "hi-IN" };

const getLocaleFromCurrency = (currencySymbol) =>
  CURRENCY_LOCALE[currencySymbol] ?? "en-US";

/**
 *
 * @param {FormatCurrency & Intl.NumberFormatOptions} formattingDetails
 * @returns {string}
 */
export const formatMoney = (formattingDetails) => {
  let { currency, cost, currencyDisplay } = formattingDetails;

  let currencyDetails = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  if (currency && currencyDisplay !== null) {
    currencyDetails = {
      ...currencyDetails,
      ...formattingDetails,
      style: "currency",
    };
  }
  let numberFormat = new Intl.NumberFormat(
    getLocaleFromCurrency(currency),
    currencyDetails
  );
  // if cost present return amount with currencySymbol
  if (cost >= 0) {
    return numberFormat.format(cost);
  }
  // if cost not present return only currencySymbol
  else {
    return numberFormat
      .formatToParts(cost)
      .filter((cost) => cost.type === "currency")[0]?.value;
  }
};
