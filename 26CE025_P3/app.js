
"use strict";

// 1. var, let and const
function Variables() {

    var bankName = "My Bank";
    let customerName = "Ananya";
    const country = "India";

    let message = bankName + " | Customer: " + customerName +
                  " | Country: " + country;

    console.log(message);

    if (true) {

        var varInsideBlock = "var is visible outside this block";

        let letInsideBlock = "let works only inside this block";

        message += "<br>Inside block: " + letInsideBlock;
    }

    message += "<br>Outside block: " + varInsideBlock;

    document.getElementById("variableDemo").innerHTML = message;
}


// 2. Arithmetic, relational, logical, assignment and conditional operators
function useOperators() {

    let a = Number(document.getElementById("num1").value);
    let b = Number(document.getElementById("num2").value);

    let total = a;
    total += b;

    let status = a > b ? "Number 1 is greater" : "Number 1 is not greater";

    let output = "Addition: " + (a + b) +
        "<br>Subtraction: " + (a - b) +
        "<br>Multiplication: " + (a * b) +
        "<br>Division: " + (b !== 0 ? a / b : "Cannot divide by zero") +
        "<br>a > b: " + (a > b) +
        "<br>a > 0 AND b > 0: " + (a > 0 && b > 0) +
        "<br>After total += b: " + total +
        "<br>Conditional operator: " + status;

    document.getElementById("operatorResult").innerHTML = output;

    console.log(output);
}


// 3. if, if-else and nested if
function checkLoanEligibility() {

    let age = Number(document.getElementById("age").value);
    let income = Number(document.getElementById("income").value);
    let creditScore = Number(document.getElementById("creditScore").value);

    let result = "";

    if (age < 18) {

        result = "Not eligible: age must be at least 18.";

    }
    else {

        if (income >= 30000 && creditScore >= 700) {

            result = "Eligible for the loan.";

        }
        else {

            result = "Not eligible: income should be at least ₹30,000 and credit score at least 700.";

        }
    }

    document.getElementById("loanResult").textContent = result;

    console.log(result);
}


// 4. switch statement
function showAccountBenefit() {

    let accountType = document.getElementById("accountType").value;

    let message = "";

    switch (accountType) {

        case "savings":
            message = "Savings Account: suitable for saving money and earning interest.";
            break;

        case "current":
            message = "Current Account: suitable for frequent business transactions.";
            break;

        case "salary":
            message = "Salary Account: commonly used for monthly salary deposits.";
            break;

        default:
            message = "Please select a valid account type.";

    }

    document.getElementById("accountResult").textContent = message;

    console.log(message);
}


// 5. for loop
function generateInterestTable() {

    let principal = Number(document.getElementById("principal").value);
    let rate = Number(document.getElementById("rate").value);

    let output = "<table border='1' cellpadding='6'>" +
        "<tr><th>Year</th><th>Simple Interest</th><th>Total Amount</th></tr>";

    for (let year = 1; year <= 5; year++) {

        let interest = (principal * rate * year) / 100;

        let amount = principal + interest;

        output += "<tr><td>" + year +
            "</td><td>₹" + interest.toFixed(2) +
            "</td><td>₹" + amount.toFixed(2) +
            "</td></tr>";

    }

    output += "</table>";

    document.getElementById("interestResult").innerHTML = output;

    console.log(output);
}


// 6. while and do-while loops
function runLoopDemo() {

    let whileText = "";
    let count = 1;

    while (count <= 3) {

        whileText += "Transaction " + count + " processed. ";

        count++;
    }

    let doWhileText = "";
    let attempt = 1;

    do {

        doWhileText += "Attempt " + attempt + " checked. ";

        attempt++;

    } while (attempt <= 3);

    document.getElementById("loopResult").innerHTML =
        "<b>while:</b> " + whileText +
        "<br><b>do-while:</b> " + doWhileText;

    console.log(doWhileText);
}


// 7. Reusable function with parameters and return value
function calculateEMI(loanAmount1, annualRate, months) {

    let monthlyRate = annualRate / 12 / 100;

    if (monthlyRate === 0) {
        return loanAmount1 / months;
    }

    return loanAmount1 * monthlyRate *
        Math.pow(1 + monthlyRate, months) /
        (Math.pow(1 + monthlyRate, months) - 1);

}


function calculateAndShowEMI() {

    let loanAmount = Number(document.getElementById("loanAmount").value);

    let annualRate = Number(document.getElementById("emiRate").value);

    let months = Number(document.getElementById("months").value);

    if (loanAmount <= 0 || annualRate < 0 || months <= 0) {

        document.getElementById("emiResult").textContent =
            "Enter valid values.";

        return;
    }

    let emi = calculateEMI(loanAmount, annualRate, months);

    document.getElementById("emiResult").textContent =
        "Monthly EMI = ₹" + emi.toFixed(2);

    console.log(emi);
}
