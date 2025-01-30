import { isDev } from "@/utils/constants";
import { useEffect, useRef, useState } from "react";


const useCrossTab = (pageKey, initialValue) => {
  const [sharedData, setSharedData] = useState(initialValue || "");
  const isNewSession = useRef(0);

  useEffect(() => {
    const isNewSessionCount = isDev ? 2 : 1;
    if (isNewSession.current < isNewSessionCount) {
      const savedData = localStorage.getItem(pageKey);

      if (savedData && savedData !== "undefined") {
        setSharedData(JSON.parse(savedData));
      }

      isNewSession.current += 1;
    } else {

      try {
        localStorage.setItem(pageKey, JSON.stringify(sharedData));
      } catch (e) {
        console.error(e);
      }
    }
  }, [sharedData, pageKey]);


  useEffect(() => {
    const onChangeStorage = (e) => {
      const { key, newValue } = e;
      if (key === pageKey) {
        setSharedData(JSON.parse(newValue));
      }
    };
    window.addEventListener("storage", onChangeStorage);
    return () => window.removeEventListener("storage", onChangeStorage);
  }, [pageKey]);

  return [sharedData, setSharedData];
};

export default useCrossTab;
