const database = window.localStorage;

const ListaUser = {
    array: [],

    initialize: () => {
        ListaUser.array = [];
        let lsTemp = LS.getUser();
        if (lsTemp !== null && lsTemp !== undefined) {
            // console.log(lsTemp);
            lsTemp.forEach(element => {
                ListaUser.array.push(element);
            });
        }
    },

    json: () => {
        // console.log(ListaUser.array);
        return JSON.stringify(ListaUser.array);
    },

    insert: (object) => {
        ListaUser.array.push(object);
        LS.saveUsers();
    }
};

const ListaClienti = {
    array: [],

    initialize: () => {
        ListaClienti.array = [];
        let lsTemp = LS.getClienti();
        if (lsTemp !== null && lsTemp !== undefined) {
            // console.log(lsTemp);
            lsTemp.forEach(element => {
                ListaClienti.array.push(element);
            });
        } else {
            console.log("Faccio chiamata Api Perchè localStorage vuoto: Clienti");
            caricaFromJsonPlaceHolder();
            LS.saveClienti();
        }
    },

    json: () => {
        // console.log(ListaClienti.array);
        return JSON.stringify(ListaClienti.array);
    },

    insert: (object) => {
        ListaClienti.array.push(object);
        LS.saveClienti();
    },

    remove: (mail) => {
        ListaClienti.array = ListaClienti.array.filter((elemento) => {
            //console.log(elemento);
            return elemento.mail !== mail
        });
        LS.saveClienti();
    },

    setAffittoAttivo(mail, affitto) {
        for (cliente of ListaClienti.array) {
            if (cliente.mail == mail) {
                cliente.affitto = affitto;
            }
        }
        LS.saveClienti();
    },

    checkAffittoAttivo(mail) {
        for (cliente of ListaClienti.array) {
            if (cliente.mail === mail) {
                if (cliente.affitto === undefined) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    },

    removeAffittoAttivo(mail) {
        for (cliente of ListaClienti.array) {
            if (cliente.mail == mail) {
                cliente.affitto = undefined;
            }
        }
        LS.saveClienti();
    },

    checkEmailIfPresent: (mail) => {
        let boolean = false;
        if (ListaClienti.array !== null) {
            for (elemento of ListaClienti.array) {
                // console.log(`${mail} === ${elemento.mail} ? ${mail === elemento.mail}`);
                if (mail === elemento.mail) {
                    boolean = true;
                }
            }
        }
        return boolean;
    },

};

const ListaAffitti = {
    array: [],

    initialize: () => {
        ListaAffitti.array = [];
        let lsTemp = LS.getAffitti();
        if (lsTemp !== null && lsTemp !== undefined) {
            // console.log(lsTemp);
            lsTemp.forEach(element => {
                ListaAffitti.array.push(element);
            });
        }
    },

    json: () => {
        // console.log(ListaAffitti.array);
        return JSON.stringify(ListaAffitti.array);
    },

    remove: (id) => {
        let affitto;
        ListaAffitti.array = ListaAffitti.array.filter((elemento) => {
            if (elemento.id === id) {
                affitto = elemento;
                console.log(affitto);
            }
            return elemento.id !== id
        });
        console.log(ListaAffitti.array);
        ListaClienti.removeAffittoAttivo(affitto.email);
        ListaGarage.removeAffitata(affitto.marcaId, affitto.modelloId);
        LS.saveAffitti();
    },

    sposta: (id) => {
        let affitto;
        ListaAffitti.array = ListaAffitti.array.filter((elemento) => {
            if (elemento.id === id) {
                affitto = elemento;
                console.log(affitto);
            }
            return elemento.id !== id;
        });
        LS.saveAffitti();
    },

    insert: (object) => {
        ListaAffitti.array.push(object);
        LS.saveAffitti();
    }
};


const ListaGarage = {
    array: [],

    initialize: () => {
        ListaGarage.array = [];
        let lsTemp = LS.getGarage();
        if (lsTemp !== null && lsTemp !== undefined && lsTemp.length > 0) {
            // console.log(lsTemp);
            lsTemp.forEach(element => {
                ListaGarage.array.push(element);
            });
        } else {
            console.log("Faccio chiamata Api Perchè localStorage vuoto: Garage");
            createDbAuto();
        }
    },

    json: () => {
        // console.log(ListaGarage.array);
        return JSON.stringify(ListaGarage.array);
    },

    insert: (object) => {
        ListaGarage.array.push(object);
        LS.saveGarage();
    },
    remove: (id) => {
        ListaGarage.array = ListaGarage.array.filter((elemento) => {
            //console.log(elemento);
            return elemento.id !== id
        });
        LS.saveGarage();
    },

    setAffitata(marcaId, modelloId) {
        ListaGarage.array.forEach((marca) => {
            console.log(marca);
            console.log(marcaId);
            if (marca.id == marcaId) {
                for (modello of marca.arrayModelli) {
                    console.log(modello);
                    if (modello.id == modelloId) {
                        console.log("Set Affittata true");
                        modello.affittata = true;
                    }
                }
            }
        });
        LS.saveGarage();
    },

    removeAffitata(marcaId, modelloId) {
        ListaGarage.array.forEach((marca) => {
            if (marca.id == marcaId) {
                for (modello of marca.arrayModelli) {
                    if (modello.id == modelloId) {
                        modello.affittata = false;
                    }
                }
            }
        });
        LS.saveGarage();
    }
};

const ListaCassa = {
    initialize: () => {
        ListaCassa.array = [];
        let lsTemp = LS.getCassa();
        if (lsTemp !== null && lsTemp !== undefined) {
            // console.log(lsTemp);
            lsTemp.forEach(element => {
                ListaCassa.array.push(element);
            });
        }
    },

    json: () => {
        console.log(ListaCassa.array);
        return JSON.stringify(ListaCassa.array);
    },

    remove: (id) => {
        let cassa;
        ListaCassa.array = ListaCassa.array.filter((elemento) => {
            if (elemento.id === id) {
                cassa = elemento;
            }
            return elemento.id !== id
        });
        ListaClienti.removeAffittoAttivo(cassa.affitto.email);
        ListaGarage.removeAffitata(cassa.affitto.marcaId, cassa.affitto.modelloId);
        LS.saveCassa();
    },

    insert: (object) => {
        ListaCassa.array.push(object);
        LS.saveCassa();
    }
}

const LS = {
    databaseKeyForUser: "user",
    databaseKeyForClienti: "clienti",
    databaseKeyForAffitti: "affitti",
    databaseKeyForGarage: "garage",
    databaseKeyForCassa: "cassa",

    getUser: () => { return JSON.parse(database.getItem(LS.databaseKeyForUser)) },
    getClienti: () => { return JSON.parse(database.getItem(LS.databaseKeyForClienti)) },
    getAffitti: () => { return JSON.parse(database.getItem(LS.databaseKeyForAffitti)) },
    getGarage: () => { return JSON.parse(database.getItem(LS.databaseKeyForGarage)) },
    getCassa: () => { return JSON.parse(database.getItem(LS.databaseKeyForCassa)) },

    checkEmailIfPresent: (ele) => {
        let boolean = false;
        if (LS.getUser() !== null) {
            LS.getUser().forEach((elemento) => {
                if (ele.email === elemento.email) {
                    // console.log(`${ele.email} === ${elemento.email} ? ${ele.email === elemento.email}`);
                    boolean = true;
                }
            })
        }
        return boolean;
    },

    checkPersonInDatabase: (ele) => {
        let boolean = false;
        if (LS.getUser() !== null) {
            LS.getUser().forEach((elemento) => {
                if (ele.email === elemento.email && ele.password === elemento.password && ele.admin === ele.admin) {
                    //${ele.email} === ${elemento.email} ? ${ele.email === elemento.email} && ${ele.password} === ${elemento.password}? ${ele.password === elemento.password} && 
                    console.log(`${ele.admin} === ${elemento.admin}`);
                    boolean = true;
                }
            })
        }
        return boolean;
    },

    getNotHashed: (ele) => {
        let toRet = undefined;
        if (LS.getUser() !== null) {
            LS.getUser().forEach((elemento) => {
                hashedBoy = sha256(`${elemento}`);
                console.log(`${hashedBoy} === ${ele}`);
                if (hashedBoy === ele) {
                    // console.log(hashedBoy);
                    toRet = elemento;
                }
            })
        }
        return toRet;
    },

    saveUsers: () => {
        database.setItem(LS.databaseKeyForUser, ListaUser.json());
    },

    saveClienti: () => {
        database.setItem(LS.databaseKeyForClienti, ListaClienti.json());
    },

    saveAffitti: () => {
        database.setItem(LS.databaseKeyForAffitti, ListaAffitti.json());
    },

    saveGarage: () => {
        database.setItem(LS.databaseKeyForGarage, ListaGarage.json());
    },

    saveCassa: () => {
        database.setItem(LS.databaseKeyForCassa, ListaCassa.json());
    },

    deleteEveryThing: () => {
        database.removeItem(LS.databaseKeyForCassa);
        database.removeItem(LS.databaseKeyForGarage);
        database.removeItem(LS.databaseKeyForAffitti);
        database.removeItem(LS.databaseKeyForClienti);
        database.removeItem(LS.databaseKeyForUser);
    }
};

const Cookie = {

    setCookie: (cookieName, cookieValue, numberOfDay) => {
        var d = new Date();
        d.setTime(d.getTime() + (numberOfDay * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cookieName + "=" + JSON.stringify(cookieValue) + ";" + expires + ";path=/; SameSite=None; Secure";
    },

    removeCoockies: () => {
        document.cookie = cookieName + "=" + ";expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure";
    },

    getCookie: (cookieName) => {
        var name = cookieName + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return JSON.parse(c.substring(name.length, c.length));
            }
        }
        return "";
    },

};
/////UTILIZZARE PER SCRIVERE 10 AFFITTI IN LOCALSTORAGE CON ID 1-2-3-4
function localAffittiDiProva() {
    // console.log('localAffittiDiProva()');

    for (let i = 0; i < 10; i++) {
        ListaAffitti.insert(new Affitto(i, 'email' + i, 'nomeCliente' + i, 'marca' + i, 'modello' + i, new Date()));
    }

}