let userName;
do {
    userName = prompt(`Ingrese su mail, por favor`);
} while (!userName || !userName.includes(`@`));

const user = userName.split(`@`);

alert(`Bienvenido, ${user[0]}.\n\nSi desea ver nuestros productos haga click en "ELEGIR PRODUCTOS".`);

const multiplicar = (cantidad, precio) => cantidad * precio

const cartProduct = []

let precioFinal = 0
cartProduct.forEach(producto => {
    precioFinal = precioFinal + producto.total
});

let contador = 0;

const cart = document.getElementById(`cart`)

const actContador = () => {
    cart.textContent = contador;
}

const shoppingButtons = document.getElementsByClassName(`icon-shopping-cart`)
console.log(shoppingButtons)
for (var i = 0; i < shoppingButtons.length; i++) {
    shoppingButtons[i].addEventListener('click', (e) => {
        comprarProducto(Number(e.target.id))
        console.log(e.target.id)
        contador++
        actContador();
    });
}

const caseFunction = (nameProduct, cantidad, total) => {
    alert(`Usted ha seleccionado ${cantidad} ${nameProduct} \n Total: $${total}`);
    cartProduct.push({ cantidad: cantidad, producto: nameProduct, total: total })
    console.log(cartProduct)
}



const comprarProducto = (selectProduct) => {

    const cantidad = 1
    let total;

    switch (selectProduct) {

        case 1:
            total = multiplicar(cantidad, 350);
            caseFunction("HAUTEVILLE CONCRETE ROCKING CHAIR", cantidad, total);
            break;
        case 2:
            total = multiplicar(cantidad, 600);
            caseFunction("PAVILION SPEAKER", cantidad, total);
            break;
        case 3:
            total = multiplicar(cantidad, 780);
            caseFunction("LIGOMANCER", cantidad, total);
            break;
        case 4:
            total = multiplicar(cantidad, 800);
            caseFunction("ALATO CABINET", cantidad, total);
            break;
        case 5:
            total = multiplicar(cantidad, 100);
            caseFunction("EARING WIRELESS", cantidad, total);
            break;
        case 6:
            total = multiplicar(cantidad, 960);
            caseFunction("SCUPTURAL COFFEE TABLE", cantidad, total);
            break;
        case 7:
            total = multiplicar(cantidad, 540);
            caseFunction("THE WW CHAIR", cantidad, total);
            break;
        case 8:
            total = multiplicar(cantidad, 55);
            caseFunction("HIMITSU MONEY BOX", cantidad, total);
            break;
        case 9:
            total = multiplicar(cantidad, 99);
            caseFunction("ARIANE PRIN", cantidad, total);
            break;
    }
    let precioFinal = 0
    cartProduct.forEach(producto => { precioFinal = precioFinal + producto.total });
    localStorage.setItem(`precioFinal`, precioFinal)
    console.log(localStorage.getItem(`precioFinal`))
    alert(`Su monto total es de: $${precioFinal}`);
}

const sinIntereses = (total, selectCuotas) => {
    alert(`Usted va realizar ${selectCuotas} pagos de $${(total / selectCuotas).toFixed()}`);
}

const intereses = (total, selectCuotas) => {
    alert(`Usted va a realizar ${selectCuotas} pagos de $${(total / selectCuotas * 0, 5 + total / selectCuotas).toFixed()}`)
}