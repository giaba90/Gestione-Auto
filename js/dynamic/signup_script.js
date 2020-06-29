const questionario = document.forms['form_page'];

ListaUser.initialize();


function Controlla() {
    if (!(questionario.password.value === questionario.c_password.value)) {
        alert("Password non corrispondenti!");
        return false;
    }
    let password = sha256(questionario.password.value);
    let select = document.getElementById("selectAdmin");
    let object = { "email": questionario.email.value, "password": password, "admin": select.value };
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