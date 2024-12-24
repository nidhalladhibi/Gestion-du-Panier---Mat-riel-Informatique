let totalPrice = 0;

function addToCart() {
    const productSelect = document.getElementById("productSelect");
    const quantityInput = document.getElementById("quantity");
    const cartItems = document.getElementById("cartItems");
    const totalPriceContainer = document.getElementById("totalPrice");

    // Récupérer le produit sélectionné et sa quantité
    const productPrice = parseFloat(productSelect.value);
    const productName = productSelect.options[productSelect.selectedIndex].text;
    const quantity = parseInt(quantityInput.value);

    // Validation des entrées
    if (isNaN(productPrice) || quantity < 1) {
        alert("Veuillez sélectionner un produit valide et entrer une quantité valide.");
        return;
    }

    // Calculer le total de l'article
    const itemTotal = productPrice * quantity;

    // Ajouter une ligne au tableau
    const ligne = document.createElement("tr");
    ligne.innerHTML = `
        <td class="p-3 text-gray-700">${productName}</td>
        <td class="p-3 text-gray-700">${quantity}</td>
        <td class="p-3 text-gray-700">${itemTotal} dt</td>
    `;
    cartItems.appendChild(ligne);

    // Mettre à jour le total général
    totalPrice += itemTotal;
    totalPriceContainer.textContent = `Total : ${totalPrice} dt`;

    // Réinitialiser le formulaire
    document.getElementById("productForm").reset();
}
paypal.Buttons({
  createOrder: function(data, actions) {
     return actions.order.create({
        purchase_units: [{
           amount: {
              value: '10.00' // Replace with the total cart value
           }
        }]
     });
  },
  onApprove: function(data, actions) {
     return actions.order.capture().then(function(details) {
        alert('Transaction completed by ' + details.payer.name.given_name);
     });
  },
  onError: function(err) {
     console.error('Payment error:', err);
     alert('Payment failed. Please try again.');
  }
}).render('#paypal-button-container');
