function simulateInvestment() {
    const initialAmount = parseFloat(document.getElementById('initialAmount').value);
    const annualInterestRate = parseFloat(document.getElementById('annualInterestRate').value);
    const monthlyContributions = parseFloat(document.getElementById('monthlyContributions').value);
  
    let balance = initialAmount;
    const interestRate = annualInterestRate / 100 / 12;
    const months = 12; // Pode ser ajustado conforme necessário
  
    const tableBody = document.querySelector('#resultTable tbody');
    tableBody.innerHTML = '';
  
    for (let i = 1; i <= months; i++) {
      balance = balance * (1 + interestRate) + monthlyContributions;
      const row = `<tr><td>${i}</td><td>${balance.toFixed(2)}</td></tr>`;
      tableBody.innerHTML += row;
    }
  }
  