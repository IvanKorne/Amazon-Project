import { formatCurrency } from "../scripts/utils/money.js";

console.log("test suite: formatCurrency");

console.log("the code rounds number");
if (formatCurrency(2095) == "20.95") {
  console.log("true");
} else {
  console.log("failed");
}
console.log("the code works with 0");
if (formatCurrency(0) == "0.00") {
  console.log("true");
} else {
  console.log("failed");
}
console.log("the code rounds to nearest cent");
if (formatCurrency(2000.6) == "20.01") {
  console.log("true");
} else {
  console.log("failed");
}
