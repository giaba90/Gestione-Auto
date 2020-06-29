const formClienti = document.forms["formClienti"];

function nuovoCliente() {
    // Get the modal
    var modal = document.getElementById("myModalClienti");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function controllaSubmit() {
    let nome = formClienti.nome.value;
    let cognome = formClienti.cognome.value;
    let email = formClienti.email.value;
    nome += (" " + cognome);
    //&& nome.includes(" ")
    if (nome === "" || email === "" || cognome === "") {
        alert("Campi Vuoti o mal Compilati!");
        return false;
    } else {
        if (ListaClienti.checkEmailIfPresent(email)) {
            alert("Email già registrata");
            return false;
        } else {
            alert("Cliente inserito correttamente!");
            ListaClienti.insert(new Cliente(nome, email));
        }
    }
    //Obbligare l'inserimento dello spazio tra nome e cognome oppure creare...
    //... anche il campo cognome e aggiungerlo al nome


}


function popolaListaClienti() {
    // console.log('inizializzaListaClienti()');
    let clienti$ = document.getElementById('lista_clienti');
    clienti$.innerHTML = "";
    let tag = '';

    ListaClienti.array.forEach(elemento => {
        tag += `<div class="row mb-2">
                    <div class="col-4">${elemento.nome.split(' ')[0]}</div>
                    <div class="col-4">${elemento.nome.split(' ')[1]}</div>
                    <div class="col-3">${elemento.mail}</div>
                    <div class="col-1"><button class="btn btn-danger" onclick="cancellaCliente('${elemento.mail}')">X</button></div>
                </div>`
    })

    let child = document.createElement('div');
    child.innerHTML = tag;
    clienti$.appendChild(child);
}

function cancellaCliente(mail) {
    ListaClienti.remove(mail);
    popolaListaClienti();
    alert("Cliente Rimosso");
}

function cercaCliente() {
    document.getElementById('lista_clienti').style.display = ('none'); //div di tutti i clienti
    let clientiTrovati = document.getElementById('clienti_trovati'); //div dei clienti trovati
    let clienteCercato = document.getElementById('ricercaClienteInput').value; //valore ricercato
    let clienteTrovato = ''; //elemento/i del div affitti trovati
    if (clienteCercato != undefined && clienteCercato != '') {
        ListaClienti.array.forEach((elemento) => {
            if (elemento.mail.includes(clienteCercato)) {
                clienteTrovato += `
                <div class="row mb-2">
                    <div class="col-4">${elemento.nome.split(' ')[0]}</div>
                    <div class="col-4">${elemento.nome.split(' ')[1]}</div>
                    <div class="col-3">${elemento.mail}</div>
                    <div class="col-1"><button class="btn btn-danger" onclick="cancellaCliente('${elemento.mail})'">X</button></div>
                </div>`;
                clientiTrovati.innerHTML = clienteTrovato;
            } else {
                if (clienteTrovato == '') {
                    clientiTrovati.innerHTML = '';
                }
            }

        });
    } else {
        document.getElementById('lista_clienti').style.display = ('block');
        clientiTrovati.innerHTML = '';
    }
}