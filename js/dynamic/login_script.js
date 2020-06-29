const questionario = document.forms['form_page'];

ListaUser.initialize();

function Login() {
    password = sha256(questionario.password.value);
    let select = document.getElementById("selectAdmin");
    let object = { "email": questionario.email.value, "password": password, "admin": select.value };
    if (LS.checkPersonInDatabase(object)) {
        Cookie.setCookie("User", sha256(`${object}`), 365);
        return true;
    } else {
        alert("Utente non riconosciuto!");
        return false;
    }
}