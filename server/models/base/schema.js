"use strict";

var Schema = {
	// users: {
	// 	id: {type: "increments", nullable: false, primary: true},
	// 	email: {type: "string", maxlength: 254, nullable: false, unique: true},
	// 	name: {type: "string", maxlength: 150, nullable: false},
	// 	password: {type: "string", nullable: false},
	// 	token: {type: "string", nullable: true}
	// },
	users: {
		id: {type: "increments", nullable: false, primary: true},
		email: { type: "string", unique: true, maxlength: 254},
		password: {type: "string"},
		tokens: {type: "json", defaultTo: '{}'},
		name: { type: "string", defaultTo: ''},
		gender: { type: "string", defaultTo: ''},
		location: { type: "string", defaultTo: ''},
		website: { type: "string", defaultTo: ''},
		picture: { type: "string", defaultTo: ''},
		resetPasswordToken: {type: "string", defaultTo: ''},
		resetPasswordExpires: {type: "dateTime", nullable: true},
		google: { type: "integer", nullable: true}
	},
	topics: {
		id: {type: "increments", nullable: false, primary: true},
		text: {type: "string"},
		count: { type: "integer", defaultTo: 0 },
		date: { type: "dateTime", defaultTo: new Date().toDateString() }
	},
	session: {
		id: {type: "increments", nullable: false, primary: true},
		sess: {type: "json"},
		expire: {type: "dateTime"}
	}

	// recipes: {
	// 	id: {type: "increments", nullable: false, primary: true},
	// 	image: {type: "string"},
	// 	chef_name: {type: "string"},
	// 	title: {type: "string"},
	// 	description: {type: "text"},
	// 	ingredient: {type: "text"},
	// 	seasoning: {type: "text"},
	// 	method: {type: "text"},
	// 	reminder: {type: "text"},
	// 	hits: {type: "integer"},
	// 	created_at: {type: "dateTime", nullable: false},
	// 	updated_at: {type: "dateTime", nullable: true},
	// 	creator_id: {type: "integer"},
	// 	updater_id: {type: "integer"}
	// },
	// html: {type: "text", fieldtype: "medium", nullable: false},
	// blogposts: {
	// 	id: {type: "increments", nullable: false, primary: true},
	// 	user_id: {type: "integer", nullable: false, unsigned: true},
	// 	category_id: {type: "integer", nullable: false, unsigned: true},
	// 	title: {type: "string", maxlength: 150, nullable: false},
	// 	html: {type: "string", maxlength: 150, nullable: false},
	// 	created_at: {type: "dateTime", nullable: false},
	// 	updated_at: {type: "dateTime", nullable: true}
	// },

	// tags: {
	// 	id: {type: "increments", nullable: false, primary: true},
	// 	name: {type: "string", nullable: false, unique: true}
	// },

	// // A table for many-to-many relation between tags table & posts table
	// posts_tags: {
	// 	id: {type: "increments", nullable: false, primary: true},
	// 	post_id: {type: "integer", nullable: false, unsigned: true, references: "blogposts.id"},
	// 	tag_id: {type: "integer", nullable: false, unsigned: true, references: "tags.id"}
	// }
};

module.exports = Schema;
