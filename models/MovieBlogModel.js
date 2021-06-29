const db = require('./conn');

class MovieBlogModel {
    constructor(id, movie_title, movie_id) {
        this.id = id;
        this.movie_title = movie_title;
        this.movie_id = movie_id;
    }

    static async getAllMovieData() {
        try {
            const response = await db.any(
                `SELECT * FROM movies 
                INNER JOIN rankings
                ON movie_id = rankings.id;
                `
            );
            console.log(response);
            return response;
        } catch (error) {
            console.error('ERROR: ', error);
            return error;
        }


    }









};






module.exports = MovieBlogModel;