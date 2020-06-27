const nav_bar = document.querySelector("#nav-bar");

function onClickOfTab(event) {
    nav_bar.childNodes.forEach((elemento) => {
        if (elemento.className === "nav-item") {
            let a = elemento.querySelector("a");
            if (a !== event.currentTarget) {
                a.classList.remove("active");
                let id = getIdFromHref(a);
                //console.log(id);
                document.querySelector(id).classList.add("nascosto");
            }
        }
    });
    event.currentTarget.classList.add("active");
    document.querySelector(getIdFromHref(event.currentTarget)).classList.remove("nascosto");
}

function getIdFromHref(a) {
    for (element of a.href.split("/")) {
        if (element.includes("#")) {
            let array = element.split("#");
            return "#" + array[array.length - 1];
        }
    }
}

let firstA = document.querySelector("#firstToSee");
if (firstA !== undefined) {
    firstA.classList.add("active");
    console.log(getIdFromHref(firstA));
    document.querySelector(getIdFromHref(firstA)).classList.remove("nascosto");
}