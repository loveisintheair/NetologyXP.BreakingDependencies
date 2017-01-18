class ContractOld {
    constructor(data) {
        this._data = data;
    }

    // 1. deprecated\obsolete
    // 2. TODO: do not call. Use ContractNew instead.

    publishOld() {
        console.log('Deprecated method call!');

        // Some messy legacy, which is hard to test and decouple.
    }
}

class ContractNew {
    publish() {

    }
}