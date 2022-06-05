class Calculator {
    constructor(previous, current) {
        this.previous = previous
        this.current = current
        this.clear()
    }

    clear() {
        this.current = ""
        this.previous = ""
        this.operation = undefined
    }

    delete() {
        this.current = this.current.slice(0, -1)
    }

    appendNumber(number) {
        if (number === "." && this.current.includes(".")) return
        if (number === "0" && this.current.slice(0) === "0") return
        // TO FIX LATER: Avoid having 00 as input
        // if (number === "0" && this.current === "0") {
        //     this.current = this.current.slice(1, number.length)
        //     updateDisplay()
        // }
        this.current += number
    }

    chooseOperation(operation) {
        if (this.current === "") return
        if (this.previous !== "") {
            this.compute()
        }
        this.operation = operation
        this.previous = this.current
        this.current = ""
    }

    compute() {
        let computation
        const previousNumber = parseFloat(this.previous)
        const currentNumber = parseFloat(this.current)
        if (isNaN(this.previous) || isNaN(this.current)) return
        switch (this.operation) {
            case "+":
                computation = previousNumber + currentNumber
                break

            case "-":
                computation = previousNumber - currentNumber
                break

            case "*":
                computation = previousNumber * currentNumber
                break

            case "÷":
                computation = previousNumber / currentNumber
                break

            default:
                return
        }
        this.current = computation
        this.operation = undefined
        this.previous = ""
    }

    updateDisplay() {
        currentText.innerText = this.current
        if (this.operation != null) {
            previousText.innerText = this.previous + " " + this.operation
        } else {
            previousText.innerText = this.previous
        }
        
    }
}

const numbersButtons = document.querySelectorAll(".number")
const operationsButtons = document.querySelectorAll(".operation")
const equalsButton = document.getElementById("equals")
const deleteButton = document.getElementById("del")
const allClearButton = document.getElementById("all-clear")
const previousText = document.getElementById("previous")
const currentText = document.getElementById("current")

const calculator = new Calculator(previousText, currentText)

numbersButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        calculator.appendNumber(btn.innerText)
        calculator.updateDisplay()
    })
})

operationsButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        calculator.chooseOperation(btn.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener("click", () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
})