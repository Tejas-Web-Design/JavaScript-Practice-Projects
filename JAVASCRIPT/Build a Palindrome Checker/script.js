const input = document.getElementById("text-input");
const button = document.getElementById("check-btn");
const result = document.getElementById("result");

button.addEventListener("click", () => {
  const rawText = input.value;

  if (rawText.trim() === "") {
    alert("Please input a value.");
    return;
  }

  // Clean input: remove non-alphanumerics, convert to lowercase
  const cleaned = rawText.replace(/[^a-z0-9]/gi, "").toLowerCase();
  const reversed = cleaned.split("").reverse().join("");

  const isPalindrome = cleaned === reversed;

  if (isPalindrome) {
    result.textContent = `${rawText} is a palindrome.`;
    result.className = "result-palindrome";
  } else {
    result.textContent = `${rawText} is not a palindrome.`;
    result.className = "result-not";
  }
});

