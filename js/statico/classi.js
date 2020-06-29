const oggettoUtente = {
    username: 'Usernamone',
    name: 'Nome Cognome',
    password: 'Passwordona Criptatona',
    admin: 1, //0-Utente 1-Admin
}

const oggettoCliente = {
    name: 'Ciccio Pasticcio',
    email: 'ciccio@pasticcio.it', //PrimaryKey - Al posto del Codice Fiscale
    affitto: undefined // undefined|| numero identificativo affitto
}

const oggettoAffitto = {
    idUnivoco: 1,
    nomeCliente: 'Ciccio Pasticcio',
    email: 'ciccio@pasticcio.it', //Foreign Key
    marca: 'Ford',
    modello: 'Fiesta',
    costoGiornaliero: 50.0, //Float
    data: '25/06/2020',
}

class Cliente {
    constructor(nome, mail) {
        this.nome = nome;
        this.mail = mail;
        this.affitto = undefined;
    }

    setAffitto(id) {
        this.affitto = id;
    }

    getClienteByAffitto(id) {
        if (affitto === id) {
            return this;
        }
    }
}

class Affitto {
    constructor(id, email, nomeCliente, marca, modello, marcaId, modelloId, dataInizio) {
        this.id = id;
        this.email = email;
        this.nomeCliente = nomeCliente;
        this.marca = marca;
        this.modello = modello;
        this.marcaId = marcaId;
        this.modelloId = modelloId;
        this.costoGiornaliero = 40;
        this.dataInizio = dataInizio;
    }

    getId() {
        return this.id;
    }

    getPrezzoFinale(dataFineAffitto) {
        /**
         * @param {Date} dataFineAffitto deve essere un date non sbagliate
         * @return {Float} ritorna il prezzo
         */
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const diffDays = Math.round(Math.abs((this.dataInizio - dataFineAffitto) / oneDay));
        return (this.costoGiornaliero * diffDays);
    }

}

class Marca {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.arrayModelli = [];
    }

    addModello(modello) {
        this.arrayModelli.push(modello);
    }

    getModelli() {
        return this.arrayModelli;
    }

    getModello(id) {
            for (modello of this.arrayModelli) {
                if (modello.id === id) {
                    return modello;
                }
            }
        }
        //mi da il numero di modelli per ogni marca
    getAllModelNumber() {
        return this.arrayModelli.length;
    }

    getModellAffittatiNumber() {
        let n = 0;
        for (m of this.arrayModelli) {
            if (m.affittata) {
                n++;
            }
        }
        return n;
    }
}

class Modello {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.affittata = false;
    }

    setAffitto(bool) {
        this.affittata = bool;
    }
}

class Cassa {
    constructor(id, Affitto, modelloName, dataFineAffitto) {
        this.id = id;
        this.affitto = Affitto;
        this.modelloName = modelloName;
        this.dataFineAffitto = dataFineAffitto;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.affitto.email;
    }
    getDataFinale() {
        return this.dataFineAffitto;
    }
    getModelloName() {
        return this.modelloName;
    }
    getPrezzoFinale() {
        return this.affitto.getPrezzoFinale(this.dataFineAffitto);
    }
}