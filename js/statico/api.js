/****************** GARAGE */

let requestmarcheUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json';
let requestModelUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/';
let marcheArray = []; //array di oggetti marche => id, name sono i campi dell'oggetto

/* FUNCTION */

/* Prendo le marche dalle api di Nunzio */
async function getmarcheFromUrl() {
    let res$ = await fetch(requestmarcheUrl).then(response => response.json())
    return res$;
}

/* Prendo i modelli delle marche dalle api di Nunzio */
async function getModelFromUrl(nome_marca) {
    let res$ = await fetch(requestModelUrl + nome_marca + '?format=json').then(response => response.json())
    return res$;
}

function createDbAuto() {
    let Allmarche = getmarcheFromUrl();
    Allmarche.then((marche) => { //elaboro la promise

        if (marche.Message == "Response returned successfully") { //se è andata a buon fine
            for (i = 0; i < 10; i++) { //metto nell'array solo 10 marche
                marcheArray.push(new Marca(marche.Results[i].Make_Name, marche.Results[i].Make_ID));
            }
        } else {
            console.log('Errore nel promise delle marche');
        }

        marcheArray.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });

        marcheArray.forEach(async(marca) => {
            let promiseModel = await getModelFromUrl(marca.name);

            promiseModel.Results.forEach((modello) => {

                marca.addModello(new Modello(modello.Model_Name, modello.Model_ID));
            });

            ListaGarage.insert(marca);
        }); //chiusura promise Model
        //chiusura ciclo for di marche        
        console.log(ListaGarage.array);
    }); //fine then promise Marche

}


// JSON PLACEHOLDER

const serverURL = 'https://jsonplaceholder.typicode.com/'; //cambiato da gianluca
const postURL = 'users/';


async function caricaFromJsonPlaceHolder() {

    let cliente = await fetch(serverURL + postURL).then(response => response.json());

    cliente.forEach(element => {
        let nuovoCliente = new Cliente(element.name, element.email);
        ListaClienti.insert(nuovoCliente);
    })

    LS.saveClienti();
}