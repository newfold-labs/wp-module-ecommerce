//div1
// alert("hello");
// const element = document.getElementById("billing-address_1");
// element.addEventListener("keyup", function (event) {
//   console.log(event.target.value);
// });

document.addEventListener("DOMContentLoaded", function () {
  const addressInput = document.getElementById("billing_address_1");
  var newElement = document.createElement("div");

  newElement.setAttribute("id", "suggestions");
  if (addressInput.nextSibling) {
    addressInput.parentNode.insertBefore(newElement, addressInput.nextSibling);
  } else {
    addressInput.parentNode.appendChild(newElement);
  }
  const suggestionsContainer = document.getElementById("suggestions");
  let suggestions = [];

  const apiUrl = "https://nominatim.openstreetmap.org/search";

  addressInput.addEventListener("input", function () {
    const address = addressInput.value.trim();
    fetchSuggestions(address);
  });

  function fetchSuggestions(address) {
    if (!address) {
      clearSuggestions();
      return;
    }

    fetch(`${apiUrl}?q=${encodeURIComponent(address)}&format=json`)
      .then((response) => response.json())
      .then((data) => {
        suggestions = data;
        renderSuggestions();
      })
      .catch((error) => {
        console.error("Error fetching address suggestions:", error);
      });
  }

  function renderSuggestions() {
    console.log(suggestions);
    suggestionsContainer.innerHTML = "";
    suggestions.forEach((suggestion, index) => {
      const suggestionDiv = document.createElement("div");
      suggestionDiv.textContent = suggestion.display_name;
      suggestionDiv.style.cursor = "pointer";
      suggestionDiv.style.padding = "5px";
      suggestionDiv.addEventListener("click", function () {
        handleSuggestionClick(suggestion);
      });
      suggestionsContainer.appendChild(suggestionDiv);
    });
  }

  function clearSuggestions() {
    suggestions = [];
    suggestionsContainer.innerHTML = "";
  }

  function handleSuggestionClick(suggestion) {
    addressInput.value = suggestion.display_name;
    clearSuggestions();
  }
});
