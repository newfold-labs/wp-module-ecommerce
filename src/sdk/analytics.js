import {
  HiiveAnalytics,
  HiiveEvent,
} from "@newfold-labs/js-utility-ui-analytics";
import { NewfoldRuntime } from "@newfold-labs/wp-module-runtime";

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