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
  return useSWR(endpoints, async () => {
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

export const CardManager = ({ config }) => {
  const tree = createDependencyTree(config);
  let { data: realisedTree, mutate } = useLoadDependencies(tree);
  const requiredConfigs = config.filter((config) => config.shouldRender());
  return requiredConfigs.map((cardConfig) => {
    let { Card, state: stateDefinition, title } = cardConfig;
    let dependencies = extractDependencies(realisedTree, cardConfig);
    let state = Object.fromEntries(
      Object.entries(stateDefinition).map(([key, selector]) => [
        key,
        selector(dependencies),
      ])
    );
    return (
      <Card
        key={title}
        {...cardConfig}
        state={state}
        isLoading={!!realisedTree}
        onRefresh={async (refresh) => {
          let [path] = Object.entries(tree).find(([, deps]) =>
            deps.include(refresh)
          );
          let updatedResponse = await apiFetch({ path });
          await mutate(
            (realisedTree) => ({ ...realisedTree, [path]: updatedResponse }),
            { revalidate: false }
          );
        }}
      />
    );
  });
};
