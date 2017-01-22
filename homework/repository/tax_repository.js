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
                this.data[state] = {
                    categoryModificators: {}
                };
            }
            this.data[state].base = rates[state];
        }
    }

    loadLegacyCategoryModificators(categories) {
        for (let categoryName in categories) {
            let category = categories[categoryName];
            for (let state in category) {
                if (!this.data[state]) {
                    this.data[state] = {
                        categoryModificators: {}
                    };
                }

                this.data[state].categoryModificators[categoryName] = category[state];
            }
        }
    }
}

module.exports = TaxRepository;