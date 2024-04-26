import { BH_UR_REGEX, HG_UR_REGEX } from "../constants";

export const check_url_match = (brandName) => {
    switch (brandName) {
      case "bluehost":
        return !(BH_UR_REGEX.test(window.location.origin));
      case "hostgator":
        return !(HG_UR_REGEX.test(window.location.origin));
      default:
        return true;
    }
  }