let divMarca = document.getElementById('div_marca')

function popolaSelectClienti() {
    let divCliente = document.getElementById('div_cliente')
    let selectClienti = document.createElement('select');
    selectClienti.id = ("clienti");
    ListaClienti.array.forEach(element => {
        let option = document.createElement('option');
        option.text = element.nome;
        option.value = element.mail;
        if (ListaClienti.checkAffittoAttivo(element.mail)) {
            option.disabled = true;
        }
        selectClienti.appendChild(option);
    })
    divCliente.appendChild(selectClienti);
}

function aggiungiAffitto() {
    let selectMarche = document.getElementById("marche");
    let selectModello = document.getElementById("modelli");
    let selectClienti = document.getElementById("clienti");
    let datePicker = document.getElementById("datepicker");

    let marcaId = selectMarche.value;
    let modelloId = selectModello.value;
    let email = selectClienti.value;
    let date = datePicker.value;

    let marcaName = selectMarche.options[selectMarche.selectedIndex].text;
    let modelloName = selectModello.options[selectModello.selectedIndex].text;
    let nomeCliente = selectClienti.options[selectClienti.selectedIndex].text;
    let affittoId = Math.random(new Date().getMilliseconds());

    console.log(email, nomeCliente);
    console.log(marcaId, modelloId, marcaName, modelloName);
    console.log(date);

    ListaGarage.setAffitata(marcaId, modelloId);
    ListaClienti.setAffittoAttivo(email, affittoId);
    ListaAffitti.insert(new Affitto(affittoId, email, nomeCliente, marcaName, modelloName, marcaId, modelloId, new Date(date)));
    alert("Affitto prenotato correttamente");
    return true;
}

function goBack() {
    window.history.back();
}