import { useEffect } from "react";

/**
 * Locks body scroll when a modal/overlay is open.
 * Prevents content behind the modal from scrolling.
 */
export function useBodyLock(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
}
