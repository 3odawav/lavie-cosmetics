{% comment %}
  Cart Notification Button - Shows confirmation when item added to cart
{% endcomment %}

<button 
  type="button" 
  class="cart-notification-button"
  aria-label="{{ 'accessibility.close' | t }}"
  onclick="closeCartNotification()">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
</button>

<style>
.cart-notification-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  transition: color 0.3s ease;
}

.cart-notification-button:hover {
  color: #1F2937;
}

.dark .cart-notification-button {
  color: #9CA3AF;
}

.dark .cart-notification-button:hover {
  color: #E5E7EB;
}
</style>

<script>
function closeCartNotification() {
  const notification = document.querySelector('.cart-notification');
  if (notification) {
    notification.classList.add('hidden');
    notification.classList.remove('active');
  }
}
</script>

{% schema %}
{
  "name": "Cart Notification Button",
  "settings": []
}
{% endschema %}
