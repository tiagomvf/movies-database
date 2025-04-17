function isUndefinedCustomElement(element) {
  const tagName = element.tagName.toLowerCase();
  return (
    tagName.includes('-') && // Custom element naming rule
    !window.customElements.get(tagName) // Check if not registered
  );
}

function checkElement(element) {
  if (isUndefinedCustomElement(element)) {
    console.warn('Undefined custom element:', element.tagName.toLowerCase(), element);
  }
}

// Initial check
document.addEventListener('DOMContentLoaded', () => {
  // Check all existing elements
  document.querySelectorAll('*').forEach(checkElement);

  // Set up MutationObserver
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Check the node itself
          checkElement(node);
          // Check all children recursively
          node.querySelectorAll('*').forEach(checkElement);
        }
      });
    });
  });

  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
  });
});
