export const observeAndScrollTo = (
  observer: string,
  observee: string,
  options?: {
    focus: boolean
  }
) => {
  const targetNode = document.querySelector(observer);
  const config = { attributes: true, childList: true, subtree: true };

  const callback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
      if (mutation.type === 'childList') {
          const el = document.querySelector(observee)
          el.scrollIntoView({ behavior: 'smooth' })
          if (options.focus) (el as HTMLElement)?.focus({ preventScroll: true })
          observer.disconnect();
      }
    }
  };

  const mutationObserver = new MutationObserver(callback);
  mutationObserver.observe(targetNode, config);
};
