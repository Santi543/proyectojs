// VARIABLES GLOBALES DECLARADAS //

//let contador = 0;
let cartProduct = [];
// /// //


// CAPTURO BOTONES DEL HTML //

const cart = document.getElementById(`cart`)
const cartImg = document.getElementById(`cartImg`);
const shoppingButtons = document.getElementsByClassName(`shoppingButtons`);
const confirmModal = document.getElementsByClassName('swal2-confirm');
const downCounter = document.getElementsByClassName('imgCounterMin');
const upCounter = document.getElementsByClassName('imgCounter');
const divHeaderModal = document.getElementById('headerCart');
// /// //

const buttonsQuantity = () => {
    if (downCounter != null || upCounter != null) {
        for (var i = 0; i < downCounter.length; i++) {
            downCounter[i].addEventListener('click', (e) => {
                const cartForButtons = JSON.parse(localStorage.getItem('cart'));
                const newCart = updateProductQuantity(e, "substraction", cartForButtons);
                updateCartQuantityAndPrice(newCart);
                localStorage.setItem('cart', JSON.stringify(newCart));
            });
        }
        for (var i = 0; i < upCounter.length; i++) {
            upCounter[i].addEventListener('click', (e) => {
                const cartForButtons = JSON.parse(localStorage.getItem('cart'));
                const newCart = updateProductQuantity(e, "addition", cartForButtons);
                updateCartQuantityAndPrice(newCart);
                localStorage.setItem('cart', JSON.stringify(newCart));
            });
        }
    }
}

const updateProductQuantity = (event, type, cart) => {
    let newCart = [];
    let producto = cart.find((item) => item.id == event.target.id);
    if (type == "substraction") {
        producto.cantidad = producto.cantidad - 1
        producto.total = producto.precioUnitario * producto.cantidad
        const cantidadDiv = document.getElementById(`cantidad-${producto.id}`)
        cantidadDiv.innerText = `Cantidad: ${producto.cantidad}`
    } else if (type == "addition") {
        producto.cantidad = producto.cantidad + 1
        producto.total = producto.precioUnitario * producto.cantidad
        const cantidadDiv = document.getElementById(`cantidad-${producto.id}`)
        cantidadDiv.innerText = `Cantidad: ${producto.cantidad}`
    }
    const otherProductos = cart.filter((item) => item.id != event.target.id)
    if (producto.cantidad === 0) {
        const productToDelete = document.getElementById(producto.nameProduct)
        productToDelete.remove()
        newCart = [...otherProductos]
    } else {
        newCart = [...otherProductos, producto]
    }
    return newCart;
}

const updateCartQuantityAndPrice = (newCart) => {
    let productsQuantity = 0;
    let finalPrice = 0;
    newCart.forEach(product => {
        productsQuantity = product.cantidad + productsQuantity;
        finalPrice = product?.total + finalPrice;
    });
    cart.textContent = productsQuantity;
    localStorage.setItem('precioFinal', finalPrice)
    totalCartFunction();
}



cartImg.addEventListener(`click`, () => {
    addToModal();
    buttonsQuantity();
})

for (var i = 0; i < shoppingButtons.length; i++) {
    shoppingButtons[i].addEventListener('click', (e) => {
        if (localStorage.getItem(`token`) == `ariziochan`) {
            comprarProducto(Number(e.target.id));
            updateCartCounter();
        } else{
            $('#exampleModalCenter2').modal({ show: true });
        }
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




const totalCartFunction = () => {
    let finalPriceGlobal = JSON.parse(localStorage.getItem('precioFinal')) || 0;
    let headerCart = ``;
    headerCart = `<h4>TU CARRITO</h4>
                     <p class="totalCart"> Total: $${finalPriceGlobal}</p>`
    document.getElementById('headerCart').innerHTML = headerCart;
}

const addToModal = () => {
    totalCartFunction();
    let modalVar = ``;
    const products = JSON.parse(localStorage.getItem(`cart`));
    products?.map((product) => {
        modalVar = `${modalVar}
        <div class="containerProduct" id="${product.nameProduct}">
         <img src= "/public/${product.imagen}" class="modalVar">
            <div class= "contModalCart">
                <p class="textModal"> ${product.nameProduct}
                </p>
                    <div class="secondContainerRow">
                        <p class="amountProducts" id="cantidad-${product.id}">Cantidad: ${product.cantidad}</p>
                        <div class= "rowImgsCounter">
                            <img src= "/public/signomenos.png" class="imgCounterMin" id="${product.id}">
                            <img src= "/public/signo-suma2.png" class="imgCounter" id="${product.id}">
                        </div>
                    </div>
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
            Swal.fire({
                title: 'Está seguro que desea borrar este producto de su carrito de compras?',
                text: "No puedes retornar esta accion",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, deseo borrarlo'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Borrado!',
                        'El producto se eliminó de tu carrito',
                        'success'
                    )
                    deleteCart(e.target.parentElement.id);
                    let precioFinal = 0;
                    JSON.parse(localStorage.getItem(`cart`)).forEach((producto) => { precioFinal = precioFinal + producto.total });
                    localStorage.setItem(`precioFinal`, precioFinal);
                    totalCartFunction(precioFinal);
                }
            })
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
            newCart.push({ cantidad: 1, precioUnitario: total, nameProduct: nameProduct, total: total, imagen: imagen, id: id });
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
    JSON.parse(localStorage.getItem(`cart`))?.forEach((producto) => { precioFinal = precioFinal + producto.total });
    localStorage.setItem(`precioFinal`, precioFinal);
    Toastify({
        text: "Producto agregado al carrito ✔",
        duration: 1200,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#fcfbf2",
            color: "#8eb98e",
        },
    }).showToast();
}



let objectJSON;
let numberRandom = Math.floor(Math.random() * 19) + 1;



fetch(`https://fakestoreapi.com/products/${numberRandom}`)
    .then(resp => resp.json())
    .then(json => {
        const { title, price, image } = json
        const divAdvertising = `
        <div class="productAd">
        <h2>${title}</h2>
        <img src="${image}"/>
        <h4> $${price}</h4>
        </div>
        `

        document.getElementById('advertising').innerHTML = divAdvertising
    })

