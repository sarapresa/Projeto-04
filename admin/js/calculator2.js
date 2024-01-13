const calculate = document.getElementById("calculate")
calculate.addEventListener("click", setValues)

const borderColor1 = "rgb(66,187,149)"
const backgroundColor1 = "rgba(66,187,149, 0.2)"

const chartID = document.getElementById("graph").getContext("2d")
let graphic = new Chart(chartID, {
    type: "bar",
    data: {
        labels: (months = ["Months"]),
        datasets: [
            {
                label: "Balance Accumulation",
                data: [0],
                backgroundColor: [backgroundColor1],
                borderColor: [borderColor1],
                borderWidth: 2,
                borderRadius: 15,
            },
        ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
})

function setValues() {
    let initialValue = Number(document.getElementById("initialValue").value)
    let monthlyInvestment = Number(document.getElementById("monthlyInvestment").value)
    let annualInterest = Number(document.getElementById("annualInterest").value)
    let years = document.getElementById("years")
    let targetValue = Number(document.getElementById("targetValue").value)
    let totalValue = document.getElementById("totalValue")
    let investedValue = document.getElementById("investedValue")
    let totalInterested = document.getElementById("totalInterested")

    calculator(initialValue, monthlyInvestment, annualInterest, years, targetValue, totalValue, investedValue, totalInterested)
}

function calculator(initialValue, monthlyInvestment, annualInterest, years, targetValue, totalValue, investedValue, totalInterested) {
    let totalAmount = initialValue
    let totalInvested = initialValue
    let totalInterest = Number()
    let dividend = Number()
    let accumulatedInterestedArr = []
    let totalAmountArr = []
    let totalInvestedArr = []
    let dividendMonthArr = []
    let monthlyInterest = annualInterest / 12 / 100

    if (document.getElementById("targetValue").value == "") {
        resetTable(false)
    } else {
        resetTable(true)
    }

    let months = 0

    while (totalAmount < targetValue) {
        dividend = totalAmount * monthlyInterest
        dividendMonthArr[months] = dividend.toFixed(2)

        if (accumulatedInterestedArr.length < 1) {
            accumulatedInterestedArr[months] = dividend
        } else {
            accumulatedInterestedArr[months] = dividend + accumulatedInterestedArr[months - 1]
        }

        totalAmount += dividend + monthlyInvestment
        totalAmountArr[months] = totalAmount.toFixed(2)

        totalInvested += monthlyInvestment
        totalInvestedArr[months] = totalInvested.toFixed(2)

        totalInterest += dividend

        months++
    }

    totalValue.innerHTML = totalAmount.toFixed(2) + "€"
    investedValue.innerHTML = totalInvested.toFixed(2) + "€"
    totalInterested.innerHTML = totalInterest.toFixed(2) + "€"
    years.innerHTML = (months / 12).toFixed(4) + " Years"

    list()
    graph(totalAmountArr, months)

    function list() {
        let line = 1

        for (i = 0; i < months; i++) {
            let table = document.getElementById("interestTable")

            let newLine = table.insertRow(line)

            let cell1 = newLine.insertCell(0)
            let cell2 = newLine.insertCell(1)
            let cell3 = newLine.insertCell(2)
            let cell4 = newLine.insertCell(3)
            let cell5 = newLine.insertCell(4)

            cell1.innerHTML = i + 1
            cell2.innerHTML = dividendMonthArr[i]
            cell3.innerHTML = accumulatedInterestedArr[i].toFixed(2)
            cell4.innerHTML = totalInvestedArr[i]
            cell5.innerHTML = totalAmountArr[i]

            line++
        }
    }
}

function graph(totalAmountArr, months) {
    let time = []
    for (i = 0; i < months; i++) {
        time[i] = i + 1
    }
    if (time.length == 0) {
        time[0] = "Meses"
    }
    graphic.destroy()
    graphic = new Chart(chartID, {
        type: "bar",
        data: {
            labels: time,
            datasets: [
                {
                    label: "Balance Accumulation",
                    data: totalAmountArr,
                    backgroundColor: [backgroundColor1],
                    borderColor: [borderColor1],
                    borderWidth: 2,
                    borderRadius: 15,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    })
}

document.getElementById("reset").addEventListener("click", function () {
    graph(0, 0)
    resetTable(false)
    document.getElementById("initialValue").value = ""
    document.getElementById("monthlyInvestment").value = ""
    document.getElementById("annualInterest").value = ""
    document.getElementById("targetValue").value = ""
    document.getElementById("totalValue").innerText = "0.00 €"
    document.getElementById("investedValue").innerText = "0.00 €"
    document.getElementById("totalInterested").innerText = "0.00 €"
    document.getElementById("years").innerText = "0 Years"
})

function resetTable(bool) {
    let newCalculation = bool

    document.getElementById("interestTable").innerHTML = `
        <tr>
            <th>Months</th>
            <th>Interest of the Month</th>
            <th>Accumulated Interest</th>
            <th>Total Invested</th>
            <th>Total Accumulated</th>
        </tr>`

    if (newCalculation == false) {
        document.getElementById("interestTable").innerHTML += `
            <tr>
                <td> 0 </td>
                <td> 0 </td>
                <td> 0 </td>
                <td> 0 </td>
                <td> 0 </td>
            </tr>
            `
    }
}

document.getElementById("exportButton").addEventListener("click", handleExport)

function handleExport() {
    const exportFormat = document.getElementById("export").value

    if (exportFormat === "csv") {
        exportToCSV()
    } else if (exportFormat === "json") {
        exportToJSON()
    } else if (exportFormat === "pdf") {
        exportToPDF()
    }
}

function exportToCSV() {
    const table = document.getElementById("interestTable")
    const csvRows = Array.from(table.rows).map((row) =>
        Array.from(row.cells)
            .map((cell) => cell.innerText)
            .join(",")
    )
    const csv = csvRows.join("\n")

    exportData(csv, "Interest Table.csv", "text/csv")
}

function exportToJSON() {
    const table = document.getElementById("interestTable")
    const jsonData = Array.from(table.rows)
        .slice(1)
        .map((row) => ({
            Months: row.cells[0].innerText,
            "Interest of the Month": row.cells[1].innerText,
            "Accumulated Interest": row.cells[2].innerText,
            "Total Invested": row.cells[3].innerText,
            "Total Accumulated": row.cells[4].innerText,
        }))

    const jsonString = JSON.stringify(jsonData, null, 2)
    exportData(jsonString, "Interest Data.json", "application/json")
}

async function exportToPDF() {
    const element = document.getElementById("CalculatorData")
    const options = {
        margin: 1,
        filename: "Interest Data",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: "mm", format: "a1", orientation: "portrait" },
    }

    await html2pdf(element, options)
}

function exportData(data, filename, type) {
    const blob = new Blob([data], { type: type })
    const link = document.createElement("a")
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
