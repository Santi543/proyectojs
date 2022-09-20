/* let userName;
do {
    userName = prompt(`Ingrese su mail, por favor`);
} while (!userName || !userName.includes(`@`));

const user = userName.split(`@`);

alert(`Bienvenido, ${user[0]}.\n\nSi desea ver nuestros productos haga click en "ELEGIR PRODUCTOS".`); */

const multiplicar = (cantidad, precio) => cantidad * precio

let cartProduct = []

let precioFinal = 0
cartProduct.forEach(producto => {
    precioFinal = precioFinal + producto.total
});

let contador = 0;

const cart = document.getElementById(`cart`)

const actContador = () => {
    cart.textContent = contador;
}

const caseFunction = (nameProduct, cantidad, total) => {
    alert(`Usted ha seleccionado ${cantidad} ${nameProduct} \n Total: $${total}`);
    cartProduct.push({ cantidad: cantidad, producto: nameProduct, total: total })
    console.log(cartProduct)
}

const addNew = (nameProduct, total) => {

const newCart = cartProduct.map((item) => {
    if(nameProduct == item.nameProduct){
        return {...item , cantidad: item.cantidad + 1}
    } else {
        return item;
    }
})
    if (!cartProduct.find((item) => item.nameProduct == nameProduct)){
    newCart.push({ cantidad: 1, nameProduct: nameProduct, total: total })
    }
    return newCart;
}




const comprarProducto = (selectProduct) => {

    switch (selectProduct) {

        case 1:
            cartProduct = addNew(`HAUTEVILLE CONCRETE ROCKING CHAIR`, 350);
            console.log(cartProduct)
            break;
        case 2:
            cartProduct = addNew("PAVILION SPEAKER", 600);
            break;
        case 3:
            cartProduct = addNew("LIGOMANCER", 780);
            break;
        case 4:
            cartProduct = addNew("ALATO CABINET", 800);
            break;
        case 5:
            cartProduct = addNew("EARING WIRELESS", 100);
            break;
        case 6:
            cartProduct = addNew("SCUPTURAL COFFEE TABLE", 960);
            break;
        case 7:
            cartProduct = addNew("THE WW CHAIR", 540);
            break;
        case 8:
            cartProduct = addNew("HIMITSU MONEY BOX", 55);
            break;
        case 9:
            cartProduct = addNew("ARIANE PRIN", 99);
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
        comprarProducto(Number(e.target.id))
        console.log(e.target.id)
        contador++
        actContador();
    });
}