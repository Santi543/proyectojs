const userInput = document.getElementById(`exampleInputEmail1`);
const userPass = document.getElementById(`exampleInputPassword1`);
const loginInput = document.getElementById(`exampleInputEmail2`);
const loginPass = document.getElementById(`exampleInputPassword2`);
const registerNav = document.getElementById(`btnRegisterNav`);
const register = document.getElementById(`register`);
const goRegister = document.getElementById(`goToRegister`);
const login = document.getElementById(`login`);

goRegister.addEventListener(`click`, () => {
    $('#exampleModalCenter2').modal('hide');
})


register.addEventListener(`click`, () => {
    if (userInput.value.includes(`@`) && userInput.value != null) {
        const userObj = { mail: userInput.value, password: userPass.value }
        localStorage.setItem(`Users`, JSON.stringify(userObj));
    } else {
        alert(`Asegurese que sea un mail`);
    }
})

login.addEventListener(`click`, () => {
    let loginObj = localStorage.getItem(`Users`);
    loginObj = JSON.parse(loginObj);
    if ((loginObj.mail == loginInput.value) && (loginObj.password == loginPass.value)) {
        alert(`Usted se ha logeado correctamente`);
        localStorage.setItem(`token`, `ariziochan`);
        /* addToNav(); */
    } else {
        alert(`Hay algo incorrecto. Vuelva a logearse.`);
    }
})

localStorage.getItem(`token`) ? registerNav.style.display = 'none' : null;


// la funcion addToNav() es para agregarle al nav el mail del usuario pero sin el @ y todo lo que conlleva despues //
/* let userNav = JSON.parse(localStorage.getItem("Users")); */


/* const addToNav = () => {
     let navVar = `<p class="userNav> ${userNav[0]}`
    document.getElementById(``).innerHTML = navVar
    if (userNav) {
        console.log(userNav)
        console.log(userNav.mail.split(`@`))
        document.getElementById(`userName`).innerHTML = `<p class="userNameNav"> ${userNav.mail.split(`@`)[0]} </p>`

    }
} */