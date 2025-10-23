    // JavaScript code for form validation
	// Prevent form from submitting
    const form = document.querySelector("form");
    const message = document.createElement("p");
    form.appendChild(message);
      // Retrieve the input field value
    form.addEventListener("submit", check)

    function check(event){
      event.preventDefault();
      let letter = document.getElementById("inputField").value;
      // Regular expression pattern for alphanumeric input
      let pattern = /^[a-zA-Z0-9]+$/;
       // Check if the input value matches the pattern
       if(pattern.test(letter)){
        // Valid input: display confirmation and submit the form
          message.style.color = "Green";
          message.textContent = "input is valid. Congratulations!";

       // Invalid input: display error message
      }else{ 
          message.style.color = "Red";
          message.textContent = "input is not alphanumeric, please try again"; 
      }}