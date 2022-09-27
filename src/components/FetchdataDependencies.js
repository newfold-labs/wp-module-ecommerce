import useSWR from "swr";

const FetchDataDependencies = ({ onLoad, updateResponse }) => {
  let { endpoint, parser, refresh } = onLoad;
    let { data, error, mutate } = useSWR(endpoint);
    if (data || error) {
      updateResponse([refresh, { data, error, [refresh]: mutate, parser }]);
    }
  return null;
};

export default FetchDataDependencies;
