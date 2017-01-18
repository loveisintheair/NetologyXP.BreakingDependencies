"use strict";

class CustomerRentalReport {
    constructor(headerBuilder) {
        this._headerBuilder = headerBuilder;
    }

    htmlStatement(customerArg, movies) {
        const customer = new Customer(customerArg, movies);

        const amount = () => customer.totalAmount;
        const frequentRenterPoints = () => customer.totalFrequentRenterPoints;
        const movie = (aRental) => aRental.movie;
        const rentalAmount = (aRental) => aRental.amount;

        //let result = `<h1>Rental Record for <em>${customer.name}</em></h1>\n`;
        let result = this._headerBuilder.buildHeader(customer);

        result += "<table>\n";
        for (let rental of customer.rentals) {
            result += `  <tr><td>${movie(rental).title}</td><td>${rentalAmount(rental)}</td></tr>\n`;
        }
        result += "</table>\n";
        result += `<p>Amount owed is <em>${amount()}</em></p>\n`;
        result += `<p>You earned <em>${frequentRenterPoints()}</em> frequent renter points</p>\n`;

        return result;
    }
}

class ReportHeaderBuilder {
    buildHeader(customer) {
        return `<h1>Rental Record for <em>${customer.name}</em></h1>\n`;
    }
}

class Rental {
    constructor(data, movies) {
        this._data = data;
        this._movies = movies;
    }

    get movieID() {
        return this._data.movieID;
    }

    get days() {
        return this._data.days;
    }

    get movie() {
        return this._movies[this.movieID];
    }

    get frequentRenterPoints() {
        return (this.movie.code === "new" && this.days > 2) ? 2 : 1;
    }

    get amount() {
        let amount = 0;

        switch (this.movie.code) {
            case "regular":
                amount = 2;
                if (this.days > 2) {
                    amount += (this.days - 2) * 1.5;
                }
                break;

            case "new":
                amount = this.days * 3;
                break;

            case "childrens":
                amount = 1.5;
                if (this.days > 3) {
                    amount += (this.days - 3) * 1.5;
                }
                break;
        }

        return amount;

    }
}

class Customer {
    constructor(data, movies) {
        this._data = data;
        this._movies = movies;
    }

    get name() {
        return this._data.name;
    }

    get rentals() {
        return this._data.rentals
            .map(rental => new Rental(rental, this._movies));
    }

    get totalFrequentRenterPoints() {
        return this.rentals
            .map(rental => rental.frequentRenterPoints)
            .reduce((a, b) => a + b);
    }

    get totalAmount() {
        return this.rentals
            .reduce((total, rental) => total + rental.amount, 0);
    }
}