import { useCallback, useState } from "react";

const useLoading = (callback) => {
  const [loading, setLoading] = useState(false);

  const actionFunction = useCallback(
    (...args) => {
      setLoading(true);
      return callback(...args).finally(() => setLoading(false));
    },
    [callback],
  );

  return [actionFunction, loading];
};

export default useLoading;
