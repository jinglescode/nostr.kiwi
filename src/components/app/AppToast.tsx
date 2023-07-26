import { useSessionStore } from "@/libs/zustand/session";
import { f7 } from "framework7-react";
import { useEffect } from "react";

const clearTimeout = 5 * 1000;

export default function AppToast() {
  const toastMessage = useSessionStore((state) => state.toastMessage);
  const setToastMessage = useSessionStore((state) => state.setToastMessage);

  useEffect(() => {
    if (toastMessage.length > 0) {
      showToastBottom(toastMessage);

      setTimeout(() => {
        setToastMessage("");
      }, clearTimeout);
    }
  }, [toastMessage]);

  const showToastBottom = (toastMessage: string) => {
    const toastBottom = f7.toast.create({
      text: toastMessage,
      closeTimeout: 2000,
      on: {
        close() {},
      },
    });

    toastBottom.open();
  };

  return <></>;
}
