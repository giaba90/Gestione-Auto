function popolaListaCassa() {
    let cassa$ = document.getElementById('lista_cassa');
    cassa$.innerHTML = "";
    let tag = '';
    console.log('popolaListaCassa()');
    ListaCassa.array.forEach(elemento => {
        console.log(elemento);
        tag += `<div class="row mb-2">
                    <div class="col-3">${elemento.affitto.email}</div>
                    <div class="col-3">${new Date(elemento.dataFineAffitto).toDateString()}</div>
                    <div class="col-3">${elemento.modelloName}</div>
                    <div class="col-2">${getPrezzoFinale(elemento.affitto.dataInizio,elemento.dataFineAffitto,elemento.affitto.costoGiornaliero)}</div>
                    <div class="col-1"><button class="btn btn-danger" onclick="cancellaCassa(${elemento.id})">X</button></div>
                </div>`
    });

    let child = document.createElement('div');
    child.innerHTML = tag;
    cassa$.appendChild(child);
}

function cancellaCassa(id) {
    ListaCassa.remove(id);
    popolaListaCassa();
    alert("Cassa Rimosso");
}

function getPrezzoFinale(dataInizio, dataFineAffitto, costoGiornaliero) {
    /**
     * @param {Date} dataFineAffitto deve essere un date non sbagliate
     * @return {Float} ritorna il prezzo
     */
    dataInizio = new Date(dataInizio);
    dataFineAffitto = new Date(dataFineAffitto);
    console.log(dataInizio, dataFineAffitto, costoGiornaliero);
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((dataInizio - dataFineAffitto) / oneDay));
    return (costoGiornaliero * diffDays);
}