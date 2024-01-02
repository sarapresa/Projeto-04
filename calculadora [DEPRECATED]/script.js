function calcularMontante() {
    var principal = parseFloat(document.getElementById('principal').value);
    var taxa = parseFloat(document.getElementById('taxa').value) / 100;
    var tempo = parseFloat(document.getElementById('tempo').value);
  
    var n = 1;
  
    var montanteFinal = principal * Math.pow(1 + taxa/n, n * tempo);
  
    document.getElementById('resultado').innerHTML = "O montante final é: €" + montanteFinal.toFixed(2);
  }
  