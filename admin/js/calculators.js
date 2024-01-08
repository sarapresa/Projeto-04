function firstCalculator() {
    const principal = parseFloat(document.getElementById("principal").value)
    const taxa = parseFloat(document.getElementById("taxa").value) / 100
    const tempo = parseFloat(document.getElementById("tempo").value)

    let n = 1

    const montanteFinal = principal * Math.pow(1 + taxa / n, n * tempo)

    document.getElementById("resultado").innerHTML = "O montante final é de " + montanteFinal.toFixed(2) + " €"
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
    const goal = parseFloat(document.getElementById("goal3").value)
    const pv = parseFloat(document.getElementById("pv3").value)
    const rate = parseFloat(document.getElementById("rate3").value)

    const time = Math.log(goal / pv) / Math.log(1 + rate / 100)
    document.getElementById("result3").innerHTML = "Serão necessários aproximadamente " + time.toFixed(2) + " anos para atingir o objetivo."
}
