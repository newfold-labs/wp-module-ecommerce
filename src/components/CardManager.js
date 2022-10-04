import apiFetch from '@wordpress/api-fetch';
import useSWR from 'swr';

function createDependencyTree(config) {
  return config
    .map((_) => _.dataDependencies)
    .flat()
    .reduce(
      (tree, { endpoint, refresh }) => ({
        ...tree,
        [endpoint]: tree[endpoint] ? [...tree[endpoint], refresh] : [refresh],
      }),
      {}
    );
}

function useLoadDependencies(tree) {
  let endpoints = Object.keys(tree);
  let { data, mutate } = useSWR(endpoints, async () => {
    let realisedTree = {};
    for (let path of endpoints) {
      try {
        let response = await apiFetch({ path });
        realisedTree[path] = response;
      } catch (error) {
        //
      }
    }
    return realisedTree;
  });
  async function onRefresh(refresh) {
    let [path] = Object.entries(tree).find(([, deps]) => deps.include(refresh));
    let updatedResponse = await apiFetch({ path });
    await mutate(
      (realisedTree) => ({ ...realisedTree, [path]: updatedResponse }),
      { revalidate: false }
    );
  }
  return { realisedTree: data, onRefresh };
}

function extractDependencies(realisedTree, cardConfig) {
  return Object.fromEntries(
    cardConfig.dataDependencies.map((dependency) => [
      dependency.refresh,
      realisedTree?.[dependency.endpoint]
        ? dependency.selector(realisedTree[dependency.endpoint])
        : {},
    ])
  );
}

export const useCardManager = (config) => {
  const tree = createDependencyTree(config);
  let { realisedTree, onRefresh } = useLoadDependencies(tree);
  // TODO: Complete logic to actually filter Cards using `shouldRender`
  return config.map((cardConfig) => {
    let { state: stateDefinition } = cardConfig;
    let dependencies = extractDependencies(realisedTree, cardConfig);
    let state = Object.fromEntries(
      Object.entries(stateDefinition).map(([key, selector]) => [
        key,
        selector(dependencies),
      ])
    );
    return { ...cardConfig, state, onRefresh, isLoading: !!realisedTree };
  });
};
