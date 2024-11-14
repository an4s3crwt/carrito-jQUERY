$(document).ready(function() {

    $('.agregar-carrito').on('click', function(){

    
    /*
    *   Función de agregar al carrito
    */
   //1. Seleccionar el div del producto
   //al hacer click en el botón de "agregar al carritp", obtenemos el div padre
   //para seleccionar el contenedor(div) directo que rodea al botón de agregarCarrito
   let divProduct = $(this).parent();

   //2. Obtener el nombre del producto
   // find() permite buscar elementos dentro de otro elemento específico
   //text() para extraer el texto qeu está dentro del elemento que tiene la clase 'nombre'
   let nombre = divProduct.find('.nombre').text();

   //hacer lo mismo con el precio
   let precio = parseFloat(divProduct.find('.precio').text());
  

   //3. Comprobar qeu producto ya existe en el carrito 
   //si el carrito ya tiene una fila con el nombre del producto.
   // seleccionamos el elemento tbody de la tabla del carrito con id 'carrito'
   //para buscar filas (`tr`) que ya contengan el nombre del producto.
   //Utilizamos `:contains(nombre)` para buscar en las filas cualquier texto que coincida con el nombre del producto.
   let filaCarrito = $('#carrito tbody').find(`tr:contains(${nombre})`);

   //4. Si el producto ya está en el carrito

   if(filaCarrito.length > 0){
    //buscamos la celda que contiene la cantidad , en el segundo <td> cantidad
    //eq(1) selecciona el segundo <td>(indice 1) donde tenemos la cantidad en la tabla
    let cantidadActual = parseInt(filaCarrito.find('td').eq(1).text());

    //aumentamos en 1 la cantidad
    cantidadActual +=1;

    //actualizar el contenido de la cantidad mediante text()
    filaCarrito.find('td').eq(1).text(cantidadActual);

    //calculamos el nuevo subtotal (cantidad * precio) 
    let nuevoSubTotal = cantidadActual * precio;

    //actualizamos el cuarto <td> de la fila eq(3) con el nuevo subtotal
    filaCarrito.find('td').eq(2).text(nuevoSubTotal);

   }else{
    // si el producto no está en el carrito, lo añadimos on una nueva fila <tr>

    //tr(table row) para la fila
    //<td> para mostrar el nombre del producto
    //<td> para la cantidad incial , que es 1 ya que se acaba de agregar
    //<td> para el subtotal (precio del producto)
    //<td> para unbotón eliminar que permite quitar el producto del carrito

    let nuevaFila = $(`
        <tr>
            <td>${nombre}</td>
            <td>1</td>
            <td>${precio.toFixed(2)}</td>
            <td><button class="eliminar-producto">Eliminar</button></td>
        </tr>
        `);

        $('#carrito tbody').append(nuevaFila); //añadir el producto al final de tbody 
   }

  
});

$('#carrito').on('click', '.eliminar-producto', function(){
   let productRow = $(this).parent().parent();
   productRow.remove();
} );
})