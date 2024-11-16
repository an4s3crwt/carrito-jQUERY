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
       let precio = parseFloat(divProducto.find('.precio').text());

       //3. Comprobar que el producto ya existe en el carrito 
       
       

    })
})