class Employee {
    constructor() {
        this._hourlyPayRateUsd = 35;
    }

    doLoggedPayment(timeEntries, paymentService) {
        this.logPayment();
        this.pay(timeEntries, paymentService);
    }

    pay(timeEntries, paymentService) {
        var totalAmount = new Money();

        for (var i = 0; i < timeEntries.length; i++) {
            var timeEntry = timeEntries[i];
            totalAmount.add(timeEntry.getHours() * this._hourlyPayRateUsd);
        }

        paymentService.pay(this, totalAmount);
    }

    logPayment() {

    }
}

class Employee {
    constructor() {
        this._hourlyPayRateUsd = 35;
    }

    pay(timeEntries, paymentService) {
        this._logPayment();
        this._doPay(timeEntries, paymentService);
    }

    _doPay(timeEntries, paymentService) {
        var totalAmount = new Money();

        for (var i = 0; i < timeEntries.length; i++) {
            var timeEntry = timeEntries[i];
            totalAmount.add(timeEntry.getHours() * this._hourlyPayRateUsd);
        }

        paymentService.pay(this, totalAmount);
    }

    _logPayment = function () {

    }
}

class LoggingEmployee {
    constructor(employee) {
        this._employee = employee;
    }

    pay() {
        this._logPayment();
        this._employee.pay();
    }
}

class Money {
    add(sum) {
        //
    }
}

class PaymentService {
    pay(employee, amountUsd) {

    }
}

