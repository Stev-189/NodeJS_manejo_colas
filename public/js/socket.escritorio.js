// comando para establecer conexion 
var socket = io();

var searchParams = new URLSearchParams(window.location.search); // parametros dentro de la url

// console.log(searchParams.has('escritorio')); //si existe en url el parametro escritorio
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario'); //asi le codigo se detiene
};

var escritorio = searchParams.get('escritorio'); // asi recuperamos parametro dentro de la url
var label = $('small')
    // console.log(escritorio);
$('h1').text('Escritorio ' + escritorio); // agrera el nombre del escritorio y numero

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(res) { // se emite con el numero dle escritorio
        // console.log(res);
        if (res.numero) {
            label.text(`Ticket, ${res.numero}`)
        } else {
            alert(res);
            label.text(res)
        }
    });
});