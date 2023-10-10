//Deixa o carrinho visível
var carritoVisible = false;

//Espera que os coiso das pag sejam carregados pra executar o script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    //Botão de remover do carrinho
    var EliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<EliminarItem.length; i++){
        var button = EliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //Somar
    var SumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<SumarCantidad.length; i++){
        var button = SumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //excluir
    var RestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<RestarCantidad.length; i++){
        var button = RestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //adicionar
    var AgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<AgregarAlCarrito.length;i++){
        var button = AgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}
//oculta e retira todos os elementos do carrinho
function pagarClicked(){
    alert("Obrigado pela compra!");
    //retira os componentes do carrinho
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}

function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAoCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

//Deixa o carrinho visível
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items =document.getElementsByClassName('container-items')[0];
    items.style.width = '60%';
}

//Coloca item no carrinho
function agregarItemAoCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //"O item já está no carrinho"
    var nomesItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nomesItemsCarrito.length;i++){
        if(nomesItemsCarrito[i].innerText==titulo){
            alert("O item já está no carrinho");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botãoRestarQuantidad = item.getElementsByClassName('restar-cantidad')[0];
    botãoRestarQuantidad.addEventListener('click',restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botãoSomarQuantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botãoSomarQuantidad.addEventListener('click',somarQuantidad);

    //Actualizamos total
    actualizarTotalCarrito();
}
//Aumento en uno la cantidad del elemento seleccionado
function somarQuantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('container-items')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('R$','').replace('',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = 'R$'+ total.toLocaleString("pt-br") + ",00";

}

//===================================//

//get filter
const filterElement = document.querySelector('.filter-butao')

const cards = document.querySelectorAll('.container-items')
//filterElement.addEventListener('click', filterCards)

function filterCards() {
  filterElement.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault()
        const filter = e.target.dataset.filter
        cards.forEach((item) => {
            
        })
    } )
  })
}





