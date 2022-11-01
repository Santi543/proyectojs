const userInput = document.getElementById(`exampleInputEmail1`);
const userPass = document.getElementById(`exampleInputPassword1`);
const loginInput = document.getElementById(`exampleInputEmail2`);
const loginPass = document.getElementById(`exampleInputPassword2`);
const registerNav = document.getElementById(`btnRegisterNav`);
const register = document.getElementById(`register`);
const goRegister = document.getElementById(`goToRegister`);
const login = document.getElementById(`login`);
const newBtnLogin = document.getElementById('changeButtonLogin');
const loginNav = document.getElementById('loginNavButton');

loginNav.addEventListener('click', () => {
    loginInput.value = "";
    loginPass.value = "";
})


goRegister.addEventListener(`click`, () => {
    $('#exampleModalCenter2').modal('hide');
})


register.addEventListener(`click`, () => {
    if (userInput.value.includes(`@`) && userInput.value != null) {
        const userObj = { mail: userInput.value, password: userPass.value }
        localStorage.setItem(`Users`, JSON.stringify(userObj));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cuenta creada con exito',
            showConfirmButton: false,
            timer: 2000
        })
        $('#exampleModalCenter').modal('hide');
    } else {
        const textErrorUser = "<p class='errorModal'>Cuenta o contraseña incorrectas</p>"
        document.getElementById(`errorForModal`).innerHTML = textErrorUser;
    }
})

login.addEventListener(`click`, () => {
    let loginObj = localStorage.getItem(`Users`);
    loginObj = JSON.parse(loginObj);
    if ((loginObj?.mail == loginInput.value) && (loginObj?.password == loginPass.value) && (loginInput && loginPass != null)) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usted se ha logeado correctamente',
            showConfirmButton: false,
            timer: 2000
        })
        localStorage.setItem(`token`, `ariziochan`);
        $('#exampleModalCenter2').modal('hide');
        addToNav();
    } else {
        let textErrorUser = "<p class='errorModal'>Cuenta o contraseña incorrectas</p>"
        document.getElementById(`errorForModal`).innerHTML = textErrorUser;
    }
})

/* localStorage.getItem(`token`) ? registerNav.style.display = 'none' : null; */


const closeUser = document.getElementById('closeSession');
const finished = document.getElementById('sesionFinished');

finished.addEventListener('click', () => {
    localStorage.clear();
})

const closeSession = () =>{
    if (closeUser.style.display == "none" || !closeUser.style.display){
        closeUser.style.display = "flex"
    } else{
        closeUser.style.display = "none"
    }
}

const addToNav = () => {
    if (localStorage.getItem('token')) {
        const user = JSON.parse(localStorage.getItem('Users'));
        const navVar = `<div class="containerForUser" onclick="closeSession()"><img class='logoUser' src='/public/userNav.png'/>  <p class="textNav"> ${user.mail.split('@')[0].toUpperCase()} </p></div>`;
        newBtnLogin.innerHTML = navVar
    }
}
addToNav()






