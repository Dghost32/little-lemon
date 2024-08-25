import { useEffect } from "react";

function useLog(value: React.ComponentState, name: string = "value") {
  useEffect(() => {
    console.log(name, value);
  }, [value]);
}

export default useLog;
