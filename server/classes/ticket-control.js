const fs = require('fs'); // para que podamos escribir en el json

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero,
            this.escritorio = escritorio
    }
}



class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate(); // fecha de hoy
        this.tickets = [];
        this.ultimos4 = [];
        let data = require('../data/data.json'); //solicitamos el registro dle ticket
        // console.log(data);
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {
            this.reinicioConeteo();
        }
    }
    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null)
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() { return `Ticket ${this.ultimo}` };
    getUltimos4() { return this.ultimos4 };

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay mas ticket';
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); // elimina al primer elemento del areglo
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimos4.unshift(atenderTicket); //arregla al inicio dle arreglo
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //borra el ultimo elmento de un arreglo
        }
        // console.log('Ultimos 4');
        // console.log(this.ultimos4);
        this.grabarArchivo();
        return atenderTicket;
    }

    reinicioConeteo() {
        this.ultimo = 0;
        this.tickets = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
        this.ultimos4 = [];
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}
// el contructor se dispara cunado se crea un objeto con la clase nombrada 
// ejemplo let ticket = new TicketControl()
module.exports = { TicketControl }