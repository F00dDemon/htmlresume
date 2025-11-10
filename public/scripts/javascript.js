document.getElementById('contact-main').onsubmit = () => {

    clearErrors();

    let isValid = true;

    let fname = document.getElementById('fname').value.trim();
    let lname = document.getElementById('lname').value.trim();
    let linkedinput = document.getElementById('linkedinput').value.trim();
    let emailinput = document.getElementById('emailinput').value.trim();
    let meetselect = document.getElementById('meetselect').value.trim();
    let mailing = document.getElementById('mailing').checked;

    if(!fname){
        document.getElementById("err-fname").style.display = "inline";
        isValid = false;
    }
    if(!lname){
        document.getElementById("err-lname").style.display = "inline";
        isValid = false;
    }
    if (linkedinput && linkedinput.indexOf("https://linkedin.com/") === -1) {
        document.getElementById("err-linked").style.display = "inline";
        isValid = false;
    }
    if (emailinput && (emailinput.indexOf("@") === -1 || emailinput.indexOf(".") === -1)) {
        document.getElementById("err-email").style.display = "inline";
        isValid = false;
    }
    if (meetselect === "none") {
        document.getElementById("err-meet").style.display = "inline";
        isValid = false;
    }
    if (!emailinput && mailing) {
        document.getElementById("err-mailing").style.display = "inline";
        isValid = false;
    }
    console.log(fname + ": firstname is being analyzed")
    console.log(lname + ": lastname is being analyzed")
    console.log(linkedinput + ": linkedin is being analyzed")
    console.log(emailinput + ": email is being analyzed")
    console.log(meetselect + ": meeting is being analyzed")
    console.log(mailing + ": maillist is being analyzed")

    return isValid;
}

let otherToggle = document.getElementById('other');

document.getElementById('meetselect').addEventListener('change', function () {
    let selection = this.value;
    if(selection === "other"){
        otherToggle.style.display = "initial";
    }else{
        otherToggle.style.display = "none";
    }
});

function clearErrors() {
    let errors = document.getElementsByClassName("error");
    for (let i=0; i<errors.length; i++) {
        errors[i].style.display = "none";
    }
}