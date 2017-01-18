"use strict";

class Printer {
    printHeader() {
        console.log('-----Header-----');
    }

    printBody(message) {
        this.printHeader();

        // Some logic that we want to test
        // ...
        //

        console.log(message);

        this.printFooter();
    }

    printFooter() {
        console.log('-----Footer-----')
    }
}