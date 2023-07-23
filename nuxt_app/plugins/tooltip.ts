export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("tooltip", {
    mounted(el) {
      const tooltip_el = document.createElement("span");
      tooltip_el.classList.add("tooltip");
      document.body.appendChild(tooltip_el);

      let timeout = null;

      function showTooltip(event) {
        tooltip_el.textContent = el.getAttribute("aria-label");

        const touchEvent = event.touches ? event.touches[0] : event;
        tooltip_el.style.left = touchEvent.pageX + "px";
        tooltip_el.style.top = touchEvent.pageY + "px";

        tooltip_el.style.display = "block";
      }
      function showTooltipDelayed(event) {
        timeout = setTimeout(() => {
          if (tooltip_el.style.display === "block") return; // if tooltip is already shown - do nothing
          showTooltip(event);
        }, 500);
      }

      function hideTooltip() {
        clearTimeout(timeout);
        tooltip_el.style.display = "none";
      }

      el.addEventListener("click", showTooltip); // on mobile on touch - show tooltip immediately
      // mouseleave doesn't work when mouse already above element and tooltip disappears under mouse
      el.addEventListener("mouseenter", showTooltipDelayed);
      el.addEventListener("mouseleave", hideTooltip);

      el.destroyEvents = () => {
        el.removeEventListener("click", showTooltip);
        el.removeEventListener("mouseenter", showTooltipDelayed);
        el.removeEventListener("mouseleave", hideTooltip);

        hideTooltip();
      };
    },
    beforeUnmount(el) {
      el.destroyEvents();
    },
  });
});
