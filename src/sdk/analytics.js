import {
  HiiveAnalytics,
  HiiveEvent,
} from "@newfold-labs/js-utility-ui-analytics";

export const AnalyticsSdk = {
  track(action, value) {
    const hiiveEvent = new HiiveEvent(
      "wp-module-ecommerce",
      action,
      {
        value,
        timestamp: Date.now(),
      },
      "wp-module-ecommerce"
    );
    HiiveAnalytics.send(hiiveEvent);
  },
};

export const AnalyticsBatchSdk = {
  track(action, value) {
    const hiiveEvent = new HiiveEvent(
      "wp-module-ecommerce",
      action,
      {
        value,
        timestamp: Date.now(),
      },
      "wp-module-ecommerce"
    );
    HiiveAnalytics.track(hiiveEvent);
  },
};


