let userName;
do {
    userName = prompt(`Ingrese su mail, por favor`);
} while (!userName || !userName.includes(`@`));

const user = userName.split(`@`);

alert(`Bienvenido, ${user[0]}.\n\nSi desea ver nuestros productos haga click en "ELEGIR PRODUCTOS".`);

const multiplicar = (cantidad, precio) => cantidad * precio

const cartProduct = []

const quitar = () => {cartProduct.pop()
let productosRestantes = cartProduct.map((producto)=> {
    return producto.producto
})
console.log(productosRestantes)
alert(productosRestantes.join(` - `))
}

let precioFinal = 0
cartProduct.forEach(producto => {
    precioFinal = precioFinal + producto.total
});

const comprarProducto = () => {
    let selectProduct
    while (!selectProduct || selectProduct === 0 || selectProduct > 5) {
        selectProduct = +prompt("Selecciona tus productos \n 1-Remera = $2500 \n 2-Zapatillas = $20.000 \n 3-Campera = $40.000 \n 4-Buzo = $9.000 \n 5-Pantalones= $15000");
        if (selectProduct == null) {
            return;
        }
    }
    const cantidad = +prompt("Ingrese la cantidad que quiere comprar");
    let total;

    switch (selectProduct) {

        case 1:
            total = multiplicar(cantidad, 2500);
            alert(`Usted ha seleccionado ${cantidad} Remeras \n Total: $${total}`);
            cartProduct.push({ cantidad: cantidad, producto: "Remeras", total: total })
            console.log(cartProduct)
            break;
        case 2:
            total = multiplicar(cantidad, 20000);
            alert(`Usted ha seleccionado ${cantidad} Zapatillas \n Total: $${total}`);
            cartProduct.push({ cantidad: cantidad, producto: "Zapatillas", total: total })
            console.log(cartProduct)
            break;
        case 3:
            total = multiplicar(cantidad, 40000);
            alert(`Usted ha seleccionado ${cantidad} Camperas \n Total: $${total}`);
            cartProduct.push({ cantidad: cantidad, producto: "Camperas", total: total })
            console.log(cartProduct)
            break;
        case 4:
            total = multiplicar(cantidad, 9000);
            alert(`Usted ha seleccionado ${cantidad} Buzos \n Total: $${total}`);
            cartProduct.push({ cantidad: cantidad, producto: "Buzos", total: total })
            console.log(cartProduct)
            break;
        case 5:
            total = multiplicar(cantidad, 15000);
            alert(`Usted ha seleccionado ${cantidad} Pantalones \n Total: $${total}`);
            cartProduct.push({ cantidad: cantidad, producto: "Pantalones", total: total })
            console.log(cartProduct)
            break;
    }
    let precioFinal = 0
    cartProduct.forEach(producto => {precioFinal = precioFinal + producto.total});
    localStorage.setItem(`precioFinal`, precioFinal)
    console.log(localStorage.getItem(`precioFinal`))
    if (confirm(`Desea elegir otros productos?`)) {
        comprarProducto();
    } else {
        alert(`Su monto total es de: $${precioFinal}`);
    }
}

const sinIntereses = (total , selectCuotas) => {
    alert(`Usted va realizar ${selectCuotas} pagos de $${(total / selectCuotas).toFixed()}`);
}

const intereses = (total, selectCuotas) => {
    alert(`Usted va a realizar ${selectCuotas} pagos de $${(total / selectCuotas * 0, 5 + total / selectCuotas).toFixed()}`)
}

const seleccionarCuotas = () => {
    let selectCuotas;
    while (!(selectCuotas === 3 || selectCuotas === 6 || selectCuotas === 12)) {
        selectCuotas = +prompt(`Elija en cuantos pagos va a realizar su compra: \n 3 cuotas sin interes: escriba "3" \n 6 cuotas con interes: escriba "6" \n 12 cuotas con interes: escriba "12"`)
    }
    switch (selectCuotas) {
        case 3:
            sinIntereses(localStorage.getItem(`precioFinal`), 3);
            break;
        case 6:
            intereses(localStorage.getItem(`precioFinal`), 6);
            break;
        case 12:
            intereses(localStorage.getItem(`precioFinal`), 12);
            break;
    }
}