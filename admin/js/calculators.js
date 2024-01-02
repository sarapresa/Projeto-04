function firstCalculator() {
    var principal = parseFloat(document.getElementById("principal").value)
    var taxa = parseFloat(document.getElementById("taxa").value) / 100
    var tempo = parseFloat(document.getElementById("tempo").value)

    var n = 1

    var montanteFinal = principal * Math.pow(1 + taxa / n, n * tempo)

    document.getElementById("resultado").innerHTML = "O montante final é: €" + montanteFinal.toFixed(2)
}

function secondCalculator() {
    const initialAmount = parseFloat(document.getElementById("initialAmount").value)
    const annualInterestRate = parseFloat(document.getElementById("annualInterestRate").value)
    const monthlyContributions = parseFloat(document.getElementById("monthlyContributions").value)

    let balance = initialAmount
    const interestRate = annualInterestRate / 100 / 12
    const months = 12 // Pode ser ajustado conforme necessário

    const tableBody = document.querySelector("#resultTable tbody")
    tableBody.innerHTML = ""

    for (let i = 1; i <= months; i++) {
        balance = balance * (1 + interestRate) + monthlyContributions
        const row = `<tr><td>${i}</td><td>${balance.toFixed(2)}</td></tr>`
        tableBody.innerHTML += row
    }
}

function thirdCalculator() {
    var goal = parseFloat(document.getElementById("goal3").value)
    var pv = parseFloat(document.getElementById("pv3").value)
    var rate = parseFloat(document.getElementById("rate3").value)

    var time = Math.log(goal / pv) / Math.log(1 + rate / 100)
    document.getElementById("result3").innerHTML = "Serão necessários aproximadamente " + time.toFixed(2) + " anos para atingir o objetivo."
}
