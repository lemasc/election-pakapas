const headerOffset = 80;

export function scrollToTarget(element: HTMLElement | null | undefined) {
  if (!element) return null;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}
