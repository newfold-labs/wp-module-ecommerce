import { __ } from '@wordpress/i18n';
import useSWRImmutable from 'swr/immutable';
import { ReactComponent as WIPIllustration } from '../icons/store-in-progress.svg';
import { ReactComponent as StoreLiveIllustration } from '../icons/store-live-illustration.svg';
import { ReactComponent as NewStoreIllustration } from '../icons/store-online.svg';
import { Endpoints } from '../services';

const BannerContent = {
  firstTime: {
    title: __('Congrats on your new store!', 'wp-module-ecommerce'),
    notice: __(
      "You're just a few steps away from sharing your site with the world!",
      'wp-module-ecommerce'
    ),
    Illustration: NewStoreIllustration,
  },
  comingSoon: {
    title: __('Keep up the good work!', 'wp-module-ecommerce'),
    notice: __(
      'Your website is currently displaying a "Coming Soon" page.\nFollow the steps below to get your store ready to launch.',
      'wp-module-ecommerce'
    ),
    Illustration: WIPIllustration,
  },
  live: {
    title: __('Ready to go to the next level?', 'wp-module-ecommerce'),
    notice: __(
      "Increase your store's performance by helping people find your store and engaging more with them once they have.",
      'wp-module-ecommerce'
    ),
    Illustration: StoreLiveIllustration,
  },
};

export function Banner({ state }) {
  let { data: settings } = useSWRImmutable(Endpoints.WP_SETTINGS);
  let { title, notice, Illustration } = state.wp.comingSoon
    ? Number(settings?.['nfd-ecommerce-counter'] ?? 0) <= 1
      ? BannerContent.firstTime
      : BannerContent.comingSoon
    : BannerContent.live;
  return (
    <>
      <div className='nfd-ecommerce-banner'>
        <div>
          <h1>{title}</h1>
          <div style={{ height: '24px' }} />
          <span className='status-notice'>{notice}</span>
        </div>
        <Illustration className='illustration' />
      </div>
      <div style={{ height: '32px' }} />
    </>
  );
}
