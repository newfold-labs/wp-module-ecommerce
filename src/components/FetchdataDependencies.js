import { useEffect } from "@wordpress/element";
import useSWR from "swr";

const FetchDataDependencies = ({ onLoad, updateResponse }) => {
  let { endpoint, parser, refresh } = onLoad;
  let { data, error, mutate } = useSWR(endpoint);
  useEffect(() => {
    if (data || error) {
      updateResponse([refresh, { data, error, [refresh]: mutate, parser }]);
    }
  }, [data, error]);
  return null;
};

export default FetchDataDependencies;
