// Define ticket model in this file -
//
// - you will define schema and also export the model (see authorApp)
let mongoose = require('mongoose');

let Schema = mongoose.Schema;

const TicketSchema = new Schema (
{
	title: {type: String, required: true},
	author: {type: String, required: true},
	description: {type: String, required: true},
	type: {type: String, required: true},
	dueDate: {type: Date, required: true},
	assignedTo: {type: String},
	status: {type: String, required: true}

});

module.exports = mongoose.model('Ticket', TicketSchema);