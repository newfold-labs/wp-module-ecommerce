import {
  HiiveAnalytics,
  HiiveEvent,
} from "@newfold/js-utility-ui-analytics";
import { NewfoldRuntime } from "@newfold/wp-module-runtime";
import data from "@wordpress/data"; // added to keep dependency for js-utility-ui-analytics

export const AnalyticsSdk = {
  track(category, action, value) {
    const hiiveEvent = new HiiveEvent(
      category,
      action,
      value,
      "wp-module-ecommerce"
    );
    HiiveAnalytics.send(hiiveEvent);
  },
  initialize() {
    HiiveAnalytics.initialize({
      namespace: "wp-module-ecommerce",
      urls: {
        single: NewfoldRuntime.createApiUrl("/newfold-data/v1/events"),
        batch: NewfoldRuntime.createApiUrl("/newfold-data/v1/events/batch"),
      },
      settings: {
        debounce: {
          time: 3000,
        },
      },
    });
  },
};