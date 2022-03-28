/*----------------------------------------------------------------------------------------------------------*/
/*                                             Calculator Script                                            */
/*----------------------------------------------------------------------------------------------------------*/

function getHistory() {
    return document.getElementById('history-calc').innerText;
}

function printHistory(num) {
    document.getElementById("history-calc").innerText = num;
}

function getOutput() {
    return document.getElementById("output-calc").innerText;
}

function printOutput(num) {
    if (num == "") {
        document.getElementById("output-calc").innerText = num;
    } else {
        document.getElementById("output-calc").innerText = getFormattedNumber(num);
    }
}

function getFormattedNumber(num) {
    if (num == "-") {
        return "";
    }
    let n = Number(num);
    let value = n.toLocaleString("es");
    return value;
}

function reverseNumberFormat(num) {
    return Number(num.replace(/,/g,''));
}

let operator = document.getElementsByClassName("operator-calc");
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function() {

        if (this.id == "clear") {
            printHistory("");
            printOutput("");
        } else if (this.id == "backspace") {
            let output = reverseNumberFormat(getOutput()).toString();
            if (output) {
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
        } else {
            let output = getOutput();
            let history = getHistory();

            if (output == "" && history != "") {

                if (isNaN(history[history.length - 1])) {
                    history = history.substr(0, history.length - 1);
                }
            }

            if (output != "" || history != "") {
                output = output == "" ? output : reverseNumberFormat(output);
                history = history + output;

                if (this.id == "=") {
                    let result = eval(history);
                    printOutput(result);
                    printHistory("");
                } else if (this.id == "%") {
                    let n = reverseNumberFormat(getOutput());
                    let percent = n / 100;
                    printOutput(percent.toFixed(4));
                } else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}

let number = document.getElementsByClassName("number-calc");
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function() {
        let output=reverseNumberFormat(getOutput());
        if (output != NaN) {
            output = output + this.id;
            printOutput(output);
        }
    });
}