// VARIABLES GLOBALES DECLARADAS //

//let contador = 0;
let cartProduct = [];
// /// //

// CAPTURO BOTONES DEL HTML //

const cart = document.getElementById(`cart`)
const cartImg = document.getElementById(`cartImg`);
const shoppingButtons = document.getElementsByClassName(`shoppingButtons`);
// /// //

cartImg.addEventListener(`click`, () => {
    addToModal()
})

for (var i = 0; i < shoppingButtons.length; i++) {
    shoppingButtons[i].addEventListener('click', (e) => {
        comprarProducto(Number(e.target.id));
        updateCartCounter();
    });
}

const updateCartCounter = () => {
    let contador = 0;
    const cartBeginning = JSON.parse(localStorage.getItem(`cart`)) || []
    cartBeginning.forEach((product) => contador = contador + product.cantidad);
    cart.textContent = contador;
}

updateCartCounter();

// FUNCIONES //

const multiplicar = (cantidad, precio) => cantidad * precio;

const deleteCart = (idProduct) => {
    const storageCart = JSON.parse(localStorage.getItem(`cart`))
    let cartDltAct = storageCart.filter(product => product.nameProduct != idProduct);
    cartDltAct = localStorage.setItem(`cart`, JSON.stringify(cartDltAct));
    document.getElementById(idProduct).remove();
    updateCartCounter();
}

const addToModal = () => {
    let modalVar = ``
    const products = JSON.parse(localStorage.getItem(`cart`))
    products.map((product) => {
        modalVar = `${modalVar}
        <div class="containerProduct" id="${product.nameProduct}">
         <img src= "./images/${product.imagen}" class="modalVar">
            <div class= "contModalCart">
                <p class="textModal"> ${product.nameProduct}    x ${product.cantidad}
                </p>
            </div>
                <button type="button" class="close buttonDlt" id="${product.nameProduct}">
				<span>&times;</span>
			    </button>
        </div>`
    })
    document.getElementById(`modalCartImg`).innerHTML = modalVar;
    const btnDlt = document.getElementsByClassName(`buttonDlt`);
    for (var i = 0; i < btnDlt.length; i++) {
        btnDlt[i].addEventListener("click", (e) => {
            deleteCart(e.target.parentElement.id);
            let precioFinal = 0;
            JSON.parse(localStorage.getItem(`cart`)).forEach((producto) => { precioFinal = precioFinal + producto.total });
            localStorage.setItem(`precioFinal`, precioFinal);
        })
    }
}

const addNew = (nameProduct, total, imagen, id) => {
    let newCart = []
    cartProduct = JSON.parse(localStorage.getItem(`cart`)) || [];
    if (localStorage.getItem(`token`) == `ariziochan`) {
        if (cartProduct.length > 0) {
            newCart = cartProduct.map((item) => {
                if (nameProduct == item.nameProduct) {
                    return { ...item, cantidad: item.cantidad + 1, total: item.total + total };
                } else {
                    return item;
                }
            })
        }
        if (!cartProduct.find((item) => item.nameProduct == nameProduct)) {
            newCart.push({ cantidad: 1, nameProduct: nameProduct, total: total, imagen: imagen, id: id });
        }
        localStorage.setItem(`cart`, JSON.stringify(newCart));
        return newCart;
    } else {
        $('#exampleModalCenter2').modal({ show: true });
    }
}

const comprarProducto = (selectProduct) => {
    switch (selectProduct) {

        case 1:
            cartProduct = addNew(`HAUTEVILLE CONCRETE ROCKING CHAIR`, 350, "product-1.jpg", 1);
            break;
        case 2:
            cartProduct = addNew("PAVILION SPEAKER", 600, "product-2.jpg", 2);
            break;
        case 3:
            cartProduct = addNew("LIGOMANCER", 780, "product-3.jpg", 3);
            break;
        case 4:
            cartProduct = addNew("ALATO CABINET", 800, "product-4.jpg", 4);
            break;
        case 5:
            cartProduct = addNew("EARING WIRELESS", 100, "product-5.jpg", 5);
            break;
        case 6:
            cartProduct = addNew("SCUPTURAL COFFEE TABLE", 960, "product-6.jpg", 6);
            break;
        case 7:
            cartProduct = addNew("THE WW CHAIR", 540, "product-7.jpg", 7);
            break;
        case 8:
            cartProduct = addNew("HIMITSU MONEY BOX", 55, "product-8.jpg", 8);
            break;
        case 9:
            cartProduct = addNew("ARIANE PRIN", 99, "product-9.jpg", 9);
            break;
    }
    let precioFinal = 0;
    JSON.parse(localStorage.getItem(`cart`)).forEach((producto) => { precioFinal = precioFinal + producto.total });
    localStorage.setItem(`precioFinal`, precioFinal);
    alert(`Su monto total es de: $${precioFinal}`);
}


// /// //