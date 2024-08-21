import { useEffect } from "react";

function useLog(value: React.ComponentState) {
  useEffect(() => {
    console.log("value", value);
  }, [value]);
}

export default useLog;
