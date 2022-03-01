// Define all of your ticket controller methods in this file that
// will be used as callbacks to your endpoints
const Ticket = require('../models/ticket');

exports.getTicketList = function (req, res) {
  Ticket.find({}, (err, tickets) => {
    if(err) {
    	res.status(500).send("Error getting ticket list")
    } else {
    	res.json(tickets)
    }
  })
};

exports.createTicket = function (req, res) {
	let ticket = new Ticket(req.body);
	ticket.save(err => {
    if(err) {
    	res.status(500).send("Error creating ticket");
    } else {
      res.status(201).json(ticket);
    }
  })

};


exports.getTicket = function (req, res) {
  Ticket.findById(req.params.ticketId, (err, ticket) => {
    if(err) {
    	res.status(500).send("Error getting ticket")
    } else {
    	res.json(ticket)
    }
  })
};

exports.updateTicket = function (req, res) {
  Ticket.findByIdAndUpdate(req.params.ticketId, { $set: req.body }, { new: true }, function (err, result) {
    if (err) {
    	res.status(500).send("Error updating ticket");
    } else {
    	res.status(204).send("");
    }
  });
};

exports.deleteTicket = function (req, res) {
  Ticket.findById(req.params.ticketId, (err, ticket) => {
    // with middleware
    if(err) {
      res.status(500).send("Error finding ticket for delete");
    } else {

      ticket.remove(err => {
        if (err) {
          res.status(500).send("Error deleting ticket");
        } else {
          res.status(204).send('');
       }
    })
    }
  })
};

