const questionario = document.forms['form_page'];

function Login() {
    let esito = (new RegExp('@')).test(questionario.email.value);
    if (questionario.email.value.length == 0 ||
        questionario.password.value.length == 0
    ) {
        alert("Compilare tutti i campi!");
        return false;
    } else if (!esito) {
        alert("Email Non valida!");
        return false;
    }

    questionario.password.value = sha256(questionario.password.value);
    let object = { "email": questionario.email.value, "password": questionario.password.value };
    if (LS.checkPersonInDatabase(object)) {
        Cookie.setCookie("User", sha256(`${object}`), 365);
        return true;
    } else {
        alert("Utente non riconosciuto!");
        return false;
    }
}