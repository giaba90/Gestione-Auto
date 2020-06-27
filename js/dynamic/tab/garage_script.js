function fillMarche() {
    let selectMarche = document.getElementById('marche');
    let markup = '<option value="" selected disabled hidden>Scegli una marca</option>';
    for (marche of ListaGarage.array) {
        markup += `<option value="${marche.id}">${marche.name}</option>`;
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
                markup += `<option value="${modello.id}">${modello.name}</option>`;
            }
        }
    }
    selectModelli.innerHTML = markup;
}