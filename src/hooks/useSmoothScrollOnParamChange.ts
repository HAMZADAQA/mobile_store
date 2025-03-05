import { useEffect, useRef } from "react";

const useSmoothScrollOnParamChange = (param: string) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      window.scrollTo(0, 0);
      isInitialMount.current = false;
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [param]);
};

export default useSmoothScrollOnParamChange;
