window.onload = () => {
    ListaAffitti.initialize();
    ListaClienti.initialize();
    ListaGarage.initialize();
    ListaCassa.initialize();
    if (location.href.includes("affitto.html")) {
        onLoadOfAffitto();
    } else {
        onLoadOfIndex();
    }

}

function onLoadOfIndex() {
    console.log("Caricata pagina Principale");
    //popola varie parti dell'index
    popolaListaAffitti();
    popolaListaClienti();
    popolaListaCassa();
    fillMarche();
    //jQuery2 
    $(document).ready(function() {
        $('.js-example-basic-single').select2();
    });
}

function onLoadOfAffitto() {
    console.log("Caricata pagina Nuovo Affitto");
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        closeText: 'Chiudi',
        prevText: 'Prec',
        nextText: 'Succ',
        currentText: 'Oggi',
        monthNames: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
        monthNamesShort: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
        dayNames: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Me', 'Gio', 'Ve', 'Sa'],
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false
    }); //inizializzo il calendario

    let d = new Date();

    $("#datepicker").datepicker("setDate", d);

    popolaSelectClienti();
    fillMarche();
}