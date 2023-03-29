const offsetSelectors = [
  '#wpadminbar',
  '.woocommerce-mobile-app-banner',
  '.woocommerce-layout__header-tasks-reminder-bar',
];
const heightSelectors = ['.woocommerce-layout__header-wrapper'];

function updateBacklink() {
  let offsets = {};
  offsetSelectors.forEach((selector) => {
    const node = document.querySelector(selector);
    if (node !== null) {
      offsets[selector] = node.getBoundingClientRect().height;
    }
  });
  let offset = Object.values(offsets).reduce((a, b) => a + b, 0);
  let backlink = document.querySelector('.nfd-woocommerce-link');
  if (backlink !== null) {
    let wcHeader = document.querySelector('.woocommerce-layout__header-wrapper');
    if (wcHeader) {
      wcHeader.dataset.backlink = 'true';
    }
    let heightSource = heightSelectors
      .map((selector) => document.querySelector(selector))
      .find((node) => node !== null);
    if (heightSource) {
      let height = heightSource.getBoundingClientRect().height;
      backlink.style.height = `${height}px`;
    }
  }
  backlink.style.top = `${offset}px`;
}

function observeAndAdjustBacklink(event) {
  updateBacklink();
  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
        updateBacklink();
      }
    }
  };
  const layoutContainer = document.querySelector('.woocommerce-layout__header');
  if (layoutContainer !== null) {
    new MutationObserver(callback).observe(layoutContainer, {
      childList: true,
      subtree: true,
    });
  }
}

(function () {
  let pluginId = nfdEcommerce.pluginId;
  let section = new URLSearchParams(window.location.search);
  if (section.has('return_to_nfd')) {
    let goBack = document.createElement('a');
    goBack.ariaRoleDescription = `Go Back to ${pluginId} WordPress Plugin`;
    goBack.className = 'nfd-woocommerce-link';
    goBack.innerText = '← Back';
    goBack.href = `admin.php?page=${pluginId}#${section.get('return_to_nfd')}`;
    let wcRoot = document.getElementById('wpbody-content');
    wcRoot.insertAdjacentElement('beforebegin', goBack);
    updateBacklink();
    window.addEventListener('DOMContentLoaded', observeAndAdjustBacklink);
  }
})();
