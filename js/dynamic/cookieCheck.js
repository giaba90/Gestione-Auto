//Cookie Check
let myCookie = Cookie.getCookie("User");
let utente = LS.getNotHashed(myCookie);
if (myCookie === "" || utente == undefined) {
    alert("Utente non loggato!");
    location.href = "login.html";
}