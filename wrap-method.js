class Employee {
    constructor() {
        this._hourlyPayRateUsd = 35;
    }

    pay(timeEntries, paymentService) {
        var totalAmount = new Money();

        for (var i = 0; i < timeEntries.length; i++) {
            var timeEntry = timeEntries[i];
            totalAmount.add(timeEntry.getHours() * this._hourlyPayRateUsd);
        }

        paymentService.pay(this, totalAmount);
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

