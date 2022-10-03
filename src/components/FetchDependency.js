import { useEffect } from "@wordpress/element";
import useSWR from "swr";

const FetchDependency = ({ onLoad, updateResponse }) => {
  let { endpoint, selector, refresh } = onLoad;
  let { data, error, mutate } = useSWR(endpoint);
  useEffect(() => {
    if (data || error) {
      updateResponse([refresh, { data, error, [refresh]: mutate, selector }]);
    }
  }, [data, error]);
  return null;
};

export default FetchDependency;
