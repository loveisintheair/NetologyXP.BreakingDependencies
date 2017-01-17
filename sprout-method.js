class Customer {
    constructor(age) {
        this._age = age;
    }

    get age() {
        return this._age;
    }
}

class Movie {
    constructor(title, rate) {
        this._title = title;
        this._rate = rate;
    }

    get title() {
        return this._title;
    }

    get rate() {
        return this._rate;
    }
}

class VideoStore {
    constructor(movies) {
        this._allMovies = movies;
    }

    getAvailableMoviesFor(customer) {
        var availableMovies = [];
        let allMovies = this._allMovies;

        for (var i = 0; i < allMovies.length; i++) {
            var currentMovie = allMovies[i];
            availableMovies.add(new Movie(currentMovie.title, currentMovie.rate));
        }

        return availableMovies;
    }
}