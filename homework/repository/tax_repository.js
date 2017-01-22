"use strict";

class TaxRepository {
    constructor(data) {
        this.data = data;
    }

    getBaseTax(state) {
        return this.data[state].base;
    }

    getItemTypeModifier(state, itemType) {
        return this.data[state].categoryModificators[itemType];
    }

    loadLegacyBaseRates(rates) {
        for (let state in rates) {
            if (!this.data[state]) {
                this.data[state] = {};
            }
            this.data[state].base = rates[state];
        }
    }
}

module.exports = TaxRepository;