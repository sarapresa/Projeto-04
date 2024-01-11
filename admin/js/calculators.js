var calculate = document.getElementById("calculate")
calculate.addEventListener("click", setValues)

let borderColor1 = "rgb(217,79,92)"
let backgroundColor1 = "rgba(217, 79, 92, 0.2)"

const chartID = document.getElementById("graphic").getContext("2d")
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
    let months = Number(document.getElementById("months").value)
    let years = Number(document.getElementById("years").value) // Adicionado
    let totalValue = document.getElementById("totalValue")
    let investedValue = document.getElementById("investedValue")
    let totalInterested = document.getElementById("totalInterested")

    // Converta o número de years em months
    let monthsTotais = years * 12 + months

    calcular(initialValue, monthlyInvestment, annualInterest, monthsTotais, totalValue, investedValue, totalInterested)
}

function calcular(initialValue, monthlyInvestment, annualInterest, months, totalValue, investedValue, totalInterested) {
    let totalAmount = initialValue
    let totalInvested = initialValue
    let totalInterest = Number()
    let dividend = Number()
    let accumulatedInterestedArr = []
    let totalAmountArr = []
    let totalInvestedArr = []
    let dividendMonthArr = []
    let monthlyInterest = annualInterest / 12 / 100

    if (document.getElementById("months").value == "") {
        resetTable(false)
    } else {
        resetTable(true)
    }

    for (i = 0; i < months; i++) {
        dividend = totalAmount * monthlyInterest
        dividendMonthArr[i] = dividend.toFixed(2)

        if (accumulatedInterestedArr.length < 1) {
            accumulatedInterestedArr[i] = dividend
        } else {
            accumulatedInterestedArr[i] = dividend + accumulatedInterestedArr[i - 1]
        }

        totalAmount += dividend + monthlyInvestment
        totalAmountArr[i] = totalAmount.toFixed(2)

        totalInvested += monthlyInvestment
        totalInvestedArr[i] = totalInvested.toFixed(2)

        totalInterest += dividend
    }
    totalValue.innerHTML = "€" + totalAmount.toFixed(2)
    investedValue.innerHTML = "€" + totalInvested.toFixed(2)
    totalInterested.innerHTML = "€" + totalInterest.toFixed(2)

    lista()
    grafico(totalAmountArr, months)

    function lista() {
        let linha = 1

        for (i = 0; i < months; i++) {
            let display = document.getElementById("display")

            let novaLinha = display.insertRow(linha)

            let cell1 = novaLinha.insertCell(0)
            let cell2 = novaLinha.insertCell(1)
            let cell3 = novaLinha.insertCell(2)
            let cell4 = novaLinha.insertCell(3)
            let cell5 = novaLinha.insertCell(4)

            cell1.innerHTML = i + 1
            cell2.innerHTML = dividendMonthArr[i]
            cell3.innerHTML = accumulatedInterestedArr[i].toFixed(2)
            cell4.innerHTML = totalInvestedArr[i]
            cell5.innerHTML = totalAmountArr[i]

            linha++
        }
    }
}
function grafico(totalAmountArr, months) {
    let time = []
    for (i = -1; i < months; i++) {
        time[i] = i + 1
    }
    if (time.length == 0) {
        time[0] = "Months"
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
    grafico(0, 0)
    resetTable(false)
    document.getElementById("initialValue").value = ""
    document.getElementById("monthlyInvestment").value = ""
    document.getElementById("annualInterest").value = ""
    document.getElementById("months").value = ""
    document.getElementById("totalValue").innerText = "€0.00"
    document.getElementById("investedValue").innerText = "€0.00"
    document.getElementById("totalInterested").innerText = "€0.00"
})

function resetTable(cond) {
    let novoCalculo = cond

    document.getElementById("display").innerHTML = `
    <tr>
        <th>Months</th>
        <th>Interest of the Month</th>
        <th>Accumulated Interest</th>
        <th>Total Invested</th>
        <th>Total Accumulated</th>
    </tr>`

    if (novoCalculo == false) {
        document.getElementById("display").innerHTML += `
        <tr style="background-color: white;">
            <td> 0 </td>
            <td> 0 </td>
            <td> 0 </td>
            <td> 0 </td>
            <td> 0 </td>
        </tr>
        `
    }
}

document.getElementById("exportButton").addEventListener("click", exportData)

function exportData() {
    var exportOption = document.getElementById("exportOptions").value

    if (exportOption === "csv") {
        exportToCSV()
    } else if (exportOption === "json") {
        exportToJSON()
    } else if (exportOption === "pdf") {
        exportToPDF()
    }
}

document.getElementById("exportCSV").addEventListener("click", exportToCSV)

function exportToCSV() {
    // Get the table element
    var table = document.getElementById("display")

    // Create an empty CSV string
    var csv = ""

    // Iterate through table rows and cells
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i]
        for (var j = 0; j < row.cells.length; j++) {
            // Add cell value to the CSV string
            csv += row.cells[j].innerText + ","
        }
        // Add a new line after each row
        csv += "\n"
    }

    // Create a Blob with the CSV data
    var blob = new Blob([csv], { type: "text/csv" })

    // Create a link element to download the CSV file
    var link = document.createElement("a")
    link.href = window.URL.createObjectURL(blob)
    link.download = "Interest Table.csv"

    // Append the link to the body and trigger the download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

// Add this code after the existing script
document.getElementById("exportJSON").addEventListener("click", exportToJSON)

function exportToJSON() {
    // Get the table element
    var table = document.getElementById("display")

    // Create an array to hold JSON objects
    var jsonData = []

    // Iterate through table rows and cells
    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i]
        var jsonObject = {
            Months: row.cells[0].innerText,
            "Interest of the Month": row.cells[1].innerText,
            "Accumulated Interest": row.cells[2].innerText,
            "Total Invested": row.cells[3].innerText,
            "Total Accumulated": row.cells[4].innerText,
        }
        jsonData.push(jsonObject)
    }

    // Convert JSON array to JSON string
    var jsonString = JSON.stringify(jsonData, null, 2)

    // Create a Blob with the JSON data
    var blob = new Blob([jsonString], { type: "application/json" })

    // Create a link element to download the JSON file
    var link = document.createElement("a")
    link.href = window.URL.createObjectURL(blob)
    link.download = "Interest Data.json"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

document.getElementById("exportButton").addEventListener("click", function () {
    var element = document.getElementById("exportOptions")
    var exportFormat = element.options[element.selectedIndex].value

    if (exportFormat === "pdf") {
        exportToPDF()
    }
})

function exportToPDF() {
    var element = document.getElementById("CalculatorData")

    // Set custom options, including page width and height
    var options = {
        margin: 1,
        filename: "Interest Data",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: "mm", format: "a1", orientation: "portrait" },
    }

    // Export to PDF with custom options
    html2pdf(element, options)
}

function thirdCalculator() {
    const goal = parseFloat(document.getElementById("goal3").value)
    const pv = parseFloat(document.getElementById("pv3").value)
    const rate = parseFloat(document.getElementById("rate3").value)

    const time = Math.log(goal / pv) / Math.log(1 + rate / 100)
    document.getElementById("result3").innerHTML = "Serão necessários aproximadamente " + time.toFixed(2) + " anos para atingir o objetivo."
}
