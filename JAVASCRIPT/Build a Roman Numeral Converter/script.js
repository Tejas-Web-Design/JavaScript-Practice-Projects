const input = document.getElementById("number");
const button = document.getElementById("convert-btn");
const output = document.getElementById("output");

function convertToRoman(num) {
  const romanMap = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" }
  ];

  let result = "";
  for (let i = 0; i < romanMap.length; i++) {
    while (num >= romanMap[i].value) {
      result += romanMap[i].numeral;
      num -= romanMap[i].value;
    }
  }
  return result;
}

button.addEventListener("click", () => {
  const value = input.value;

  if (value === "") {
    output.textContent = "Please enter a valid number";
    return;
  }

  const number = parseInt(value);

  if (number < 1) {
    output.textContent = "Please enter a number greater than or equal to 1";
  } else if (number >= 4000) {
    output.textContent = "Please enter a number less than or equal to 3999";
  } else {
    const roman = convertToRoman(number);
    output.textContent = roman;
  }
});
