function calculateTime() {
    var goal = parseFloat(document.getElementById('goal3').value);
    var pv = parseFloat(document.getElementById('pv3').value);
    var rate = parseFloat(document.getElementById('rate3').value);

    var time = Math.log(goal / pv) / Math.log(1 + rate / 100);
    document.getElementById('result3').innerHTML = 'Serão necessários aproximadamente ' + time.toFixed(2) + ' anos para atingir o objetivo.';
}
