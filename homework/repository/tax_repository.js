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
            this.initItem(state);
            this.data[state].base = rates[state];
        }
    }

    loadLegacyCategoryModificators(categories) {
        for (let categoryName in categories) {
            let category = categories[categoryName];
            for (let state in category) {
                this.initItem(state);

                this.data[state].categoryModificators[categoryName] = category[state];

                if (typeof this.data[state].categoryModificators['PreparedFood'] === 'undefined') {
                    this.data[state].categoryModificators['PreparedFood'] = 0;
                }
            }
        }
    }

    initItem(state) {
        if (!this.data[state]) {
            this.data[state] = {
                categoryModificators: {}
            };
        }
    }
}

module.exports = TaxRepository;