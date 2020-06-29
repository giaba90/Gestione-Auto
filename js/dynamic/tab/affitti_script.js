function popolaListaAffitti() {
    let affitti$ = document.getElementById('lista_affitti');
    affitti$.innerHTML = "";
    let tag = '';
    // console.log('popolaListaAffitti()');
    // console.log(ListaAffitti.array);
    ListaAffitti.array.forEach(elemento => {

        tag += `<div class="row mb-2">
        <div class="col-3 col-md-3">${new Date(elemento.dataInizio).toDateString()}</div> 
        <div class="col-3 col-md-3">${elemento.nomeCliente}</div>
        <div class="col-2 col-md-2">${elemento.email}</div>
        <div class="col-2 col-md-2">${elemento.marca} ${elemento.modello}</div>
        <div class="col-1"><button class="btn btn-danger" onclick="cancellaAffitto(${elemento.id})">X</button></div>
        <div class="col-1"><button class="btn btn-success" onclick="Riscuoti(${elemento.id})">R</button></div>
    </div>`
    })
    affitti$.innerHTML = tag;
}

function cancellaAffitto(id) {
    ListaAffitti.remove(id);
    popolaListaAffitti();
    alert("Affitto Rimosso");
}


function cercaAffitto() {
    document.getElementById('lista_affitti').style.display = ('none'); //div di tutti gli affitti
    let affittiTrovati = document.getElementById('affitti_trovati'); //div degli affitti trovati
    let affittoCercato = document.getElementById('ricercaAffittoInput').value; //valore ricercato
    let affittoTrovato = ''; //elemento/i del div affitti trovati

    if (affittoCercato != undefined && affittoCercato != '') {
        ListaAffitti.array.forEach((elemento) => {
            if (elemento.email.includes(affittoCercato)) {
                affittoTrovato += `
                <div class="row mb-2">
                    <div class="col-3 col-md-3">${new Date(elemento.dataInizio).toDateString()}</div>
                    <div class="col-3 col-md-3">${elemento.nomeCliente}</div>
                    <div class="col-2 col-md-2">${elemento.email}</div>
                    <div class="col-2 col-md-2">${elemento.marca} ${elemento.modello}</div>
                    <div class="col-1"><button class="btn btn-danger" onclick="cancellaAffitto(${elemento.id})">X</button></div>
                    <div class="col-1"><button class="btn btn-success" onclick="Riscuoti(${elemento.id})">R</button></div>
                </div>`;
                affittiTrovati.innerHTML = affittoTrovato;
            } else {
                if (affittoTrovato == '') {
                    affittiTrovati.innerHTML = '';
                }
            }
        });

    } else {
        document.getElementById('lista_affitti').style.display = ('block');
        affittiTrovati.innerHTML = '';
    }
}

function Riscuoti(id) {
    // Get the modal
    var modal = document.getElementById("myModalAffitti");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    modal.style.display = "block";
    document.forms["formAffitti"].id.value = id;

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

function riscuotiAffitto() {
    id = document.forms["formAffitti"].id.value;
    date = new Date(document.getElementById("datepicker").value);
    console.log(id, date);


    let affittoScelto = ListaAffitti.array.filter((affitto) => {
        console.log(`${id}`, affitto.id);
        return `${affitto.id}` === `${id}`;
    })[0];

    console.log('affittoScelto: ' + affittoScelto, 'affittoScelto.id:' + affittoScelto.id, 'affittoScelto.modello: ' + affittoScelto.modello);


    ListaAffitti.sposta(affittoScelto.id);
    ListaCassa.insert(new Cassa(affittoScelto.id, affittoScelto, affittoScelto.modello, date));

    alert("Affitto Spostato in cassa");
}