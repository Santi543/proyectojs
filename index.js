const userInput = document.getElementById(`exampleInputEmail1`)
const userPass = document.getElementById(`exampleInputPassword1`)
const loginInput = document.getElementById(`exampleInputEmail2`)
const loginPass = document.getElementById(`exampleInputPassword2`)

let userNav = JSON.parse(localStorage.getItem("Users"))



/* alert(`Bienvenido, ${userNav[0]}.\n\nSi desea ver nuestros productos haga click en "ELEGIR PRODUCTOS".`); */

const addToNav = () => {
    /* let navVar = `<p class="userNav> ${userNav[0]}`
    document.getElementById(``).innerHTML = navVar */
    if (userNav) {
        console.log(userNav)
        console.log(userNav.mail.split(`@`))
        document.getElementById(`userName`).innerHTML = `<p> ${userNav.mail.split(`@`)[0]} </p>`

    }
}


const register = document.getElementById(`register`)
register.addEventListener(`click`, (e) => {
    if (userInput.value.includes(`@`) && userInput.value != null) {
        const userObj = { mail: userInput.value, password: userPass.value }
        localStorage.setItem(`Users`, JSON.stringify(userObj))
        registerNav.style.display = 'none';
    } else {
        alert(`Asegurese que sea un mail`)
    }
})

const registerNav = document.getElementById(`btnRegisterNav`)


const goRegister = document.getElementById(`goToRegister`)

goRegister.addEventListener(`click`, (e) => {
    $('#exampleModalCenter2').modal('hide')
})

const addToModal = () => {
    let modalVar = ``
    cartProduct.map((product) => {
        modalVar = `${modalVar} <div class="containerProduct"> <img src= "./images/${product.imagen}" class="modalVar">  <p class="textModal"> ${product.nameProduct}    x ${product.cantidad} </p>  </div>`
    })
    document.getElementById(`modalCartImg`).innerHTML = modalVar
}



const cartImg = document.getElementById(`cartImg`)

cartImg.addEventListener(`click`, (e) => {
    addToModal()
})



const login = document.getElementById(`login`)
login.addEventListener(`click`, (e) => {
    let loginObj = localStorage.getItem(`Users`)
    loginObj = JSON.parse(loginObj)
    if ((loginObj.mail == loginInput.value) && (loginObj.password == loginPass.value)) {
        alert(`Usted se ha logeado correctamente`)
        localStorage.setItem(`token`, `ariziochan`)
        addToNav()
    } else {
        alert(`Hay algo incorrecto. Vuelva a logearse.`)
    }
})

const multiplicar = (cantidad, precio) => cantidad * precio

let cartProduct = []

cartProduct = localStorage.getItem(`cart`) ? JSON.parse(localStorage.getItem(`cart`)) : []

let precioFinal = 0
cartProduct.forEach(producto => {
    precioFinal = precioFinal + producto.total
});

let contador = 0;

const cart = document.getElementById(`cart`)

const actContador = () => {
    cart.textContent = contador;
}

const addNew = (nameProduct, total, imagen) => {
    if (localStorage.getItem(`token`) == `ariziochan`) {
        let newCart = []
        if (cartProduct.length > 0) {
           newCart = cartProduct.map((item) => {
                if (nameProduct == item.nameProduct) {
                    return { ...item, cantidad: item.cantidad + 1, total: item.total + total }
                } else {
                    return item;
                }

            })
        }
        if (!cartProduct.find((item) => item.nameProduct == nameProduct)) {
            newCart.push({ cantidad: 1, nameProduct: nameProduct, total: total, imagen: imagen })
        }
        localStorage.setItem(`cart`, JSON.stringify(newCart))
        return newCart;
    } else {
        $('#exampleModalCenter2').modal({ show: true });
    }
}




const comprarProducto = (selectProduct) => {
    console.log(cartProduct)
    switch (selectProduct) {

        case 1:
            cartProduct = addNew(`HAUTEVILLE CONCRETE ROCKING CHAIR`, 350, "product-1.jpg");
            break;
        case 2:
            cartProduct = addNew("PAVILION SPEAKER", 600, "product-2.jpg");
            break;
        case 3:
            cartProduct = addNew("LIGOMANCER", 780, "product-3.jpg");
            break;
        case 4:
            cartProduct = addNew("ALATO CABINET", 800, "product-4.jpg");
            break;
        case 5:
            cartProduct = addNew("EARING WIRELESS", 100, "product-5.jpg");
            break;
        case 6:
            cartProduct = addNew("SCUPTURAL COFFEE TABLE", 960, "product-6.jpg");
            break;
        case 7:
            cartProduct = addNew("THE WW CHAIR", 540, "product-7.jpg");
            break;
        case 8:
            cartProduct = addNew("HIMITSU MONEY BOX", 55, "product-8.jpg");
            break;
        case 9:
            cartProduct = addNew("ARIANE PRIN", 99, "product-9.jpg");
            break;
    }
    let precioFinal = 0
    cartProduct.forEach(producto => { precioFinal = precioFinal + producto.total });
    localStorage.setItem(`precioFinal`, precioFinal)
    console.log(localStorage.getItem(`precioFinal`))
    alert(`Su monto total es de: $${precioFinal}`);
}

const shoppingButtons = document.getElementsByClassName(`shoppingButtons`)
console.log(shoppingButtons)
for (var i = 0; i < shoppingButtons.length; i++) {
    shoppingButtons[i].addEventListener('click', (e) => {
        console.log(`hola`)
        comprarProducto(Number(e.target.id))
        console.log(e.target.id)
        contador++
        actContador();
    });
}