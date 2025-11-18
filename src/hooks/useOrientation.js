import { createSignal, onMount, onCleanup } from "solid-js";

export function useOrientation() {
  const [isLandscape, setIsLandscape] = createSignal(
    window.innerWidth > window.innerHeight
  );

  const handleResize = () => {
    setIsLandscape(window.innerWidth > window.innerHeight);
  };

  onMount(() => {
    window.addEventListener("resize", handleResize);
  });

  onCleanup(() => {
    window.removeEventListener("resize", handleResize);
  });

  return isLandscape;
}
