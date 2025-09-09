const input = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

// Matches valid US phone numbers
function isValidUSPhone(str) {
  const regex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s\-]?)\d{3}([\s\-]?)\d{4}$/;
  return regex.test(str);
}

checkBtn.addEventListener("click", () => {
  const phone = input.value.trim();

  if (phone === "") {
    alert("Please provide a phone number");
    return;
  }

  const valid = isValidUSPhone(phone);

  resultsDiv.textContent = valid
    ? `Valid US number: ${phone}`
    : `Invalid US number: ${phone}`;
});

clearBtn.addEventListener("click", () => {
  input.value = "";
  resultsDiv.textContent = "";
});
