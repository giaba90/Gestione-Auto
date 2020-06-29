function fillMarche() {
    let selectMarche = document.getElementById('marche');
    let markup = '<option value="" selected disabled hidden>Scegli una marca</option>';
    for (marche of ListaGarage.array) {
        if (!areAllAffittati(marche)) {
            markup += `<option value="${marche.id}">${marche.name}</option>`;
        } else {
            markup += `<option value="${marche.id}" disabled>${marche.name}</option>`;
        }
        //    console.log(markup);
    }
    selectMarche.innerHTML = markup;

}

function fillModelli(objectSelected) {
    let selectModelli = document.getElementById('modelli');
    let markup = '';
    let id_marca = objectSelected.options[objectSelected.selectedIndex].value;

    for (marca of ListaGarage.array) {
        if (marca.id == id_marca) {
            let allModelli = marca.arrayModelli;
            for (modello of allModelli) {
                if (modello.affittata) {
                    markup += `<option value="${modello.id}" disabled>${modello.name}</option>`;
                } else {
                    markup += `<option value="${modello.id}">${modello.name}</option>`;
                }
            }
        }
    }
    selectModelli.innerHTML = markup;
}

function areAllAffittati(marca) {
    let bool = marca.arrayModelli.every((modello) => {
        return modello.affittata;
    });
    return bool;
}

function setNumAuto() {
    let tot = document.getElementById('tot-auto');
    let totPrenotate = document.getElementById('auto-prenotate');
    //fare la somma di tutti i numeri di modelli => la classe Marche ha il metodo 
    let somma = 0;
    let sommaPrenotate = 0;
    allMarche = ListaGarage.array;
    for (m of allMarche) {
        somma += m.arrayModelli.length;
        for (i of m.arrayModelli) {
            if (i.affittata) {
                sommaPrenotate += 1;
            }
        }
    }
    tot.innerText = somma;
    totPrenotate.innerText = sommaPrenotate;

}