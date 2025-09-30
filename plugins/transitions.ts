export default defineNuxtPlugin((nuxtApp) => {
  // The offset value controls when the animation triggers
  const intersectionOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Negative margin means trigger slightly before element is in view
  };
  
  // Page load bottom-up transition
  nuxtApp.vueApp.directive('bottom-up', {
    mounted(el, binding) {
      // Initial state - out of view
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      
      // Apply delay if specified in binding
      if (binding.value) {
        el.style.transitionDelay = `${binding.value * 0.1}s`;
      }
      
      // Use intersection observer to trigger animation when element enters viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Element is in view, apply animation
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            
            // Disconnect after animation is triggered
            observer.disconnect();
          }
        });
      }, intersectionOptions);
      
      observer.observe(el);
    }
  });
  
  // Section navigation transition
  nuxtApp.vueApp.directive('section-wipe', {
    mounted(el, binding) {
      // Set up the wipe effect container
      el.style.position = 'relative';
      el.style.overflow = 'hidden';
      
      // Create overlay for wipe effect
      const overlay = document.createElement('div');
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = binding.value || 'rgba(255, 255, 255, 0.9)';
      overlay.style.transform = 'translateX(-100%)';
      overlay.style.pointerEvents = 'none';
      overlay.style.zIndex = '1';
      
      el.appendChild(overlay);
      
      // Trigger wipe animation when element enters viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Create the animation
            const animation = overlay.animate([
              { transform: 'translateX(-100%)' },
              { transform: 'translateX(0%)' },
              { transform: 'translateX(100%)' }
            ], {
              duration: 1000,
              easing: 'ease-in-out'
            });
            
            animation.onfinish = () => {
              overlay.style.transform = 'translateX(100%)';
            };
            
            // Disconnect after animation is triggered
            observer.disconnect();
          }
        });
      }, intersectionOptions);
      
      observer.observe(el);
    }
  });
});