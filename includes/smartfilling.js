const element = document.getElementById("billing_address_1");
element?.addEventListener("keyup", function(event) {
  console.log(event.target.value)
})