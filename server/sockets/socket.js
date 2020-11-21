const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {



    //alerta de entrada usuario server, en consola
    // console.log('Usuario conectado');
    //emicion mensaje desde le servidor al usario //Bienvenida troger al conectarse
    // client.emit('enviarMensaje', {
    //     usuario: 'Administrador',
    //     mensaje: 'Bienvenido a esta aplicación'
    // });
    //escucha desconeccion de ususario
    // client.on('disconnect', () => {
    //     console.log('Usuario desconectado');
    // });

    // Escuchar el cliente
    // client.on('enviarMensaje', (data, callback) => {
    // console.log(data);
    //con broadcast emite a todos los ususarios ose se recibe un mnesaje y este se retransmite a todos los ususarios
    // client.broadcast.emit('enviarMensaje', data);

    // if (mensaje.usuario) {
    //     callback({
    //         resp: 'TODO SALIO BIEN!'
    //     });

    // } else {
    //     callback({
    //         resp: 'TODO SALIO MAL!!!!!!!!'
    //     });
    // }

    // });

    // al escuhar le mensaje siguienteTicket 1 ejecutamos la funcion del siguiente ticket y ademas 
    // en la terminal imprimimos el nunmero de este.
    client.on('siguienteTicket', (data, callback) => {
        //desde socket.nuevoticket, escuchamos el siguineteTicket, data esta null, pero ekjecuamos el callback
        // el cual envia el resulktado de siguiente
        let siguiente = ticketControl.siguiente();
        // console.log(siguiente);
        callback(siguiente)
    })

    //Emitir un evento 'estadoActual'
    //{actual:ticketControl.getUltimoTicket() }
    // desde el socket al momento d ela carga emitimos el valor actual dle ticket
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    })

    //escucha un escritorio
    client.on('atenderTicket', (data, callback) => { // recive el numero de escritorio y la callback
        if (!data.escritorio) {
            return callback({
                err: true,
                mesaje: 'El escritorio es nesesario'
            })
        };

        let atenderTicket = ticketControl.atenderTicket(data.escritorio); // ti todo ok toma escritroiro y esjecuta 
        // el atenderticket del ticketcontrol
        callback(atenderTicket); //el resultado lo ejecuta en el callback
        //actualizar y notificar cambiod elos ultimos 4 ticket
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
    });
});