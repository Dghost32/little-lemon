import { useEffect, useState } from "react";

const useModal = (initialState = false) => {
  const [visible, setVisible] = useState(initialState);

  function handleClose() {
    setVisible(false);
  }

  return {visible, handleClose};
};

export default useModal;
