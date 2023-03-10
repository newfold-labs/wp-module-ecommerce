import apiFetch from '@wordpress/api-fetch';
import { useEffect } from '@wordpress/element';

async function createPage(page) {
  apiFetch({
    path: '/wp/v2/pages',
    method: 'POST',
    data: {
      status: 'draft',
      meta: { nf_dc_page: page.slug },
      ...page,
    },
  });
}

function getPage(slug, template) {
  switch (slug) {
    case 'home':
      return {
        title: 'Homepage',
        content: `<!-- wp:pattern {"slug":"${template}/homepage-1"} /-->`,
        template: 'no-title',
      };
    case 'contact':
      return {
        title: 'Contact Us',
        content: `<!-- wp:pattern {"slug":"${template}/contact-us"} /-->`,
      };
    case 'about':
      return {
        title: 'About Us',
        content: `<!-- wp:pattern {"slug":"${template}/company-page"} /-->`,
      };
    default:
      break;
  }
}

let PagesToBeCreated = ['home', 'about', 'contact'];

export function useSetupYITHWonderTheme(user) {
  useEffect(async () => {
    if (user !== undefined) {
      let { theme, pages } = user;
      if (
        theme.name?.toLowerCase() !== 'yith wonder' ||
        theme.manage === false
      ) {
        return;
      }
      let postNames = pages.map((post) => post.meta_value);
      let pendingPages = PagesToBeCreated.filter(
        (name) => !postNames.includes(name)
      );
      for (const slug of pendingPages) {
        await createPage({ slug, ...getPage(slug, 'yith-wonder') });
      }
    }
  }, [user]);
}
