// comando para establecer conexion 

var socket = io();

// rstom es como llamr a un elemento dle dom con jquery
//document.getElementById('lblNuevoTicket')
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('cliente conectado al servidor');
});
socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

//desde le socket recivimos al momnento d el acarga del front y cargamso el posicion actual.
socket.on('estadoActual', function(data) { label.text(data.actual) });


//jquery 
$('button').on('click', function() {
    //console.log('Click');
    //emitimos un mensaje al servidor 
    //no le enviamos nada 
    // le dejamos la posibilidad de llmar al callback, si el servidro lo llama ejecula el label.text
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket)
    })
})