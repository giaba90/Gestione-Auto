const questionario = document.forms['form_page'];

ListaUser.initialize();


function Controlla() {
    let esito = (new RegExp('@')).test(questionario.email.value);
    if (questionario.email.value.length == 0 ||
        questionario.password.value.length == 0 ||
        questionario.c_password.value.length == 0
    ) {
        alert("Compilare tutti i campi!");
        return false;
    } else if (!esito) {
        alert("Email Non valida!");
        return false;
    } else if (!(questionario.password.value === questionario.c_password.value)) {
        alert("Password non corrispondenti!");
        return false;
    }
    questionario.password.value = questionario.c_password.value = sha256(questionario.password.value);
    let object = { "email": questionario.email.value, "password": questionario.password.value };
    if (!LS.checkEmailIfPresent(object)) {
        ListaUser.insert(object);
        console.log(ListaUser);
        Cookie.setCookie("User", sha256(`${object}`), 365);
        return true;
    } else {
        alert("Email già usata!");
        return false;
    }

}