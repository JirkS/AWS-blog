let jeprihlasen = false;
var footer = document.getElementById("footer");
let logOff = document.getElementById("logOff");
let signIn = document.getElementById("signIn");
if (jeprihlasen == true) {
    footer.style.display = 'block';
    logOff.style.display = 'block';
    signIn.style.display = 'none';
}else {
    footer.style.display = 'none';
    logOff.style.display = 'none';
    signIn.style.display = 'block';
}