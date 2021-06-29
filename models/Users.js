'use strict'
const db = require('./conn');
const bcrypt = require('bcryptjs');


class User {
    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    checkPassword(hashedPassword) {
        return bcrypt.compareSync(this.password, hashedPassword);
    }

    static async addUser(first_name, last_name, email, password) {
        try {
            // This is a Prepared Statement //
            const query = `INSERT INTO users (first_name, last_name, email, password) VALUES ('${first_name}', '${last_name}', '${email}', '${password}') RETURNING id;`;
            const response = await db.one(query);
            console.log("ADDED USER Response: ", response);
            return response;

        } catch (error) {
            console.log("ERROR: ", error);
            return error;
        }
    }

    async login() {
        try {
            // lookup the user by their email address
            const query = `SELECT * FROM users WHERE email = '${this.email}';`;
            const response = await db.one(query);
            // Check the user's password based on the hash
            console.log("LOGIN RESP: ", response);
            const isValid = this.checkPassword(response.password);
            // return a response to the controller, either valid or not.
            if (!!isValid) {
                const { id, first_name, last_name } = response;
                return { isValid, user_id: id, first_name, last_name }
            } else {
                return { isValid }
            }

        } catch (error) {
            console.log("ERROR: ", error);
            return error;
        }
    }


}

module.exports = User;