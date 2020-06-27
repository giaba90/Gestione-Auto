let divMarca = document.getElementById('div_marca')
function popolaSelectClienti() {

    let divCliente = document.getElementById('div_cliente')
    let selectClienti = document.createElement('select');
    ListaClienti.array.forEach(element => {
        let option = document.createElement('option');
        option.text = element.nome;
        option.id = element.mail;
        selectClienti.appendChild(option);
        //console.log(selectClienti);
    })
    divCliente.appendChild(selectClienti);
}