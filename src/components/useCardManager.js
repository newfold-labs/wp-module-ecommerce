import useSWR from "swr";

function createDependencyTree(config) {
  let dataDependencies = config.dataDependencies ?? {};
  let tree = { dataDependencies, consumers: [] };
  for (const _ of config.cards) {
    for (const dependency of _.queries) {
      tree.consumers.push({ name: _.name, ...dependency });
    }
  }
  return tree;
}

function useLoadDependencies(tree, { refreshInterval }) {
  let endpoints = Object.keys(tree.dataDependencies);
  let { data, mutate } = useSWR(
    endpoints.length === 0 ? "no-dependencies" : endpoints.join(),
    async () => {
      let realisedTree = {};
      for (let [key, fetcher] of Object.entries(tree.dataDependencies)) {
        try {
          let response = await fetcher();
          realisedTree[key] = response;
        } catch (error) {}
      }
      return realisedTree;
    },
    { refreshInterval }
  );

  async function onRefresh(dependency) {
    // TODO: Add Checks for if path is not found.
    if (tree.dataDependencies[dependency] === undefined) {
      return;
    }
    let fetcher = tree.dataDependencies[dependency];
    let updatedResponse = await fetcher();
    await mutate(
      (realisedTree) => ({ ...realisedTree, [dependency]: updatedResponse }),
      { revalidate: false }
    );
  }
  return { realisedTree: data, onRefresh };
}

const identity = (_) => _;

function extractDependencies(tree, realisedTree, consumerName) {
  return Object.fromEntries(
    tree.consumers
      .filter((_) => _.name === consumerName)
      .map((consumer) => {
        let { key, selector = identity } = consumer;
        return [key, realisedTree?.[key] ? selector(realisedTree?.[key]) : {}];
      })
  );
}

export const useCardManager = (config, fetchOptions = {}) => {
  const tree = createDependencyTree(config);
  let { realisedTree, onRefresh } = useLoadDependencies(tree, fetchOptions);
  if (!realisedTree) {
    return [[], { onRefresh }];
  }
  return [
    config.cards
      .map((cardConfig) => {
        let { state: stateDefinition } = cardConfig;
        let dependencies = extractDependencies(
          tree,
          realisedTree,
          cardConfig.name
        );
        let state = Object.fromEntries(
          Object.entries(stateDefinition).map(([key, selector]) => [
            key,
            selector(dependencies),
          ])
        );
        return { ...cardConfig, state, onRefresh };
      })
      .filter((cardConfig) => cardConfig.shouldRender(cardConfig.state)),
    { onRefresh },
  ];
};
