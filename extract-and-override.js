"use strict";

class Printer {
    printHeader() {
        this._printLine('-----Header-----');
    }

    printBody(message) {
        this.printHeader();

        // Some logic that we want to test
        // ...
        // message = formatMessage();

        this._printLine(message);

        this.printFooter();


        var terminal = this.createTerminal();
    }

    createTerminal() {
        return new Terminal();
    }

    printFooter() {
        this._printLine('-----Footer-----')
    }

    _printLine(line) {
        console.log(line);
    }
}

class TestablePrinter extends Printer {
    constructor() {
        this._lastPrintedLine = '';
    }

    _printLine(line) {
        this._lastPrintedLine = line;
    }

    get lastPrintedLine() {
        return this._lastPrintedLine;
    }

    createTerminal() {

    }
}