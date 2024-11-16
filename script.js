$(document).ready(function(){

    $('.agregar-carrito').on('click', function(){
        /*
        *   Función agreagra al carrito
        */
       // 1. seleccionar el id del producto
       //al hacer click en el botón "agregar-carrito" obtenemos el elemento padre del botón, que es el div con clase 'producto
       let divProducto = $(this).parent();

       //2 . obtener el nombre del producto
       // find() permite buscar elementos dentro de otro elemento específico
       // text() para extraer el texto que está dentro del elemento que tiene la clase "nombre"
       let nombre = divProducto.find('.nombre').text();

       //hacer lo mismo con precio
       let precio = parseFloat(divProducto.find('.precio').text().replace('$', ''));

       //3. Comprobar que el producto ya existe en el carrito 
       // si el carrito ya tiene una fila con el nombre del producto
       // seleccionamos el elemento tbody de la tabla del carrito con id 'carrito'
       // para buscar filas (`tr`) que ya tengan el nombre del producto.
       // utilizamos contains(nombre) para buscar en las filas cualquier texto que coindida con el nombre
       let filaCarrito = $('#carrito tbody').find(`tr:contains(${nombre})`);

       // 4. Si el producto ya está en el carrito 
       if(filaCarrito.length > 0){
        //buscamos la celda que cntiene la cantidad , en el sergundo <td>
        //eq(1) selecciona el segundo ztd> (indice 1) donde está la cantidad

        let cantidadActual = parseInt(filaCarrito.find('td').eq(1).text());

        //aumentamos en 1 la cantidad
        cantidadActual += 1;

        
    //actualizar el contenido de la cantidad mediante text()
    filaCarrito.find('td').eq(1).text(cantidadActual);

        //actualizar el contenido de la cantidad mediante text()
        let nuevoSubTotal = cantidadActual * precio;

        filaCarrito.find('td').eq(2).text(nuevoSubTotal);
       }else{
        //si el productio no está en el carrito , lo añadimos con una nueva fila <tr>
        let nuevaFila = $(`
            <tr class="fila-producto">
                <td>${nombre}</td>
                <td>1</td>
                <td>$${precio}</td>
                <td><button class="eliminar-producto">Eliminar</button></td>
            </tr>
            `);

            $('#carrito tbody').append(nuevaFila);

       }

       actualizarTotal();
    });

  $('#carrito').on('click', '.eliminar-producto', function(){
    let productoFila = $(this).parent().parent(); //el padre de button es <td> y el padre de <td> el <tr>
    productoFila.remove();
    actualizarTotal();
  });

    $('#vaciar-carrito').on('click', function(){
        $('#carrito tbody').empty(); //vacía el contenido del tbody en la tabla
        actualizarTotal();
    });


    function actualizarTotal(){
        let total = 0;
        $('#carrito tbody tr').each(function(){ //por cada fila de la tabla (tbody tr)
            let subtotal = parseFloat($(this).find('td').eq(2).text()); //equivale3nte a precio
            total +=subtotal;
        });
        //actualizar el total en la interfaz
        $('#total').text(total.toFixed(2));
    }

})