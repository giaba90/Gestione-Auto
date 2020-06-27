function popolaListaAffitti() {
    let affitti$ = document.getElementById('lista_affitti');
    affitti$.innerHTML = "";
    let tag = '';
    // console.log('popolaListaAffitti()');
    // console.log(ListaAffitti.array);
    ListaAffitti.array.forEach(elemento => {
        tag += `<div class="row mb-2">
        <div class="col-3">${elemento.dataInizio}</div>
        <div class="col-2">${elemento.nomeCliente}</div>
        <div class="col-2">${elemento.email}</div>
        <div class="col-2">${elemento.marca} ${elemento.modello}</div>
        <div class="col-1"><button class="btn btn-danger" onclick="cancellaAffitto(${elemento.idUnivoco})">X</button></div>
        <div class="col-1"><button class="btn btn-success" onclick="riscuotiAffitto(${elemento.idUnivoco})">R</button></div>
    </div>`
    })
    let child = document.createElement('div');
    child.innerHTML = tag;
    affitti$.appendChild(child);
}

function cancellaAffitto(id) {
    ListaAffitti.remove(id);
    popolaListaAffitti();
    alert("Affitto Rimosso");
}

function riscuotiAffitto(id) {
    let affittoScelto = ListaAffitti.array.filter((affitto) => {
        return affitto.id === id;
    })[0];

    console.log('affittoScelto: ' + affittoScelto);
    console.log('affittoScelto.id: ' + affittoScelto.id);
    console.log('affittoScelto.modello: ' + affittoScelto.modello);


    ListaCassa.insert(new Cassa(affittoScelto.id, affittoScelto, affittoScelto.modello, new Date()));

    ///////RIMUOVI//////
    ListaAffitti.remove(id);
    popolaListaAffitti();
    ////////////////////

    alert("Affitto Spostato in cassa");
}

function cercaAffitto() { 
    document.getElementById('lista_affitti').style.display=('none');//div di tutti gli affitti
    let affittiTrovati = document.getElementById('affitti_trovati');//div degli affitti trovati
    let affittoCercato = document.getElementById('ricercaAffittoInput').value;//valore ricercato
    let affittoTrovato = '';//elemento/i del div affitti trovati
    if(affittoCercato != undefined && affittoCercato != '') {
        ListaAffitti.array.forEach((elemento) => {
            if (elemento.email.includes(affittoCercato)) {
                affittoTrovato += `
                <div class="row mb-2">
                    <div class="col-3">${elemento.dataInizio}</div>
                    <div class="col-2">${elemento.nomeCliente}</div>
                    <div class="col-2">${elemento.email}</div>
                    <div class="col-2">${elemento.marca} ${elemento.modello}</div>
                    <div class="col-1"><button class="btn btn-danger" onclick="cancellaAffitto(${elemento.idUnivoco})">X</button></div>
                    <div class="col-1"><button class="btn btn-success" onclick="riscuotiAffitto(${elemento.idUnivoco})">R</button></div>
                </div>`;
                affittiTrovati.innerHTML=affittoTrovato;
                
            }
        });
        
    }else {
        document.getElementById('lista_affitti').style.display=('block');
        affittiTrovati.innerHTML='';
    }    
}