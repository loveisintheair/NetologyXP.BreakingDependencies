"use strict";

// Этот код можно менять как угодно
var items = {
    "milk": {price: 5.5, type: "Groceries"},
    "eggs": {price: 3.0, type: "Groceries"},
    "coca-cola": {price: 0.4, type: "Groceries"},
    "amoxicillin": {price: 6.7, type: "Groceries"},
    "aspirin": {price: 0.2, type: "PrescriptionDrug"},
    "marijuana": {price: 1.4, type: "PrescriptionDrug"},
    "hamburger": {price: 2, type: "PreparedFood"},
    "ceasar salad": {price: 4.2, type: "PreparedFood"},
};

var itemTypes =
    {
        "Groceries": {
            "Alabama": 0,
            "Alaska": 0,
            "Arizona": "",
            "Arkansas": 0.015,
            "California": "",
            "Colorado": "",
            "Connecticut": ""
        },
        "PrescriptionDrug": {
            "Alabama": "",
            "Alaska": 0,
            "Arizona": "",
            "Arkansas": "",
            "California": "",
            "Colorado": "",
            "Connecticut": ""
        }
    };

const baseTaxes = {
    "Alabama": 0.04,
    "Alaska": 0,
    "Arizona": 0.056,
    "Arkansas": 0.065,
    "California": 0.075,
    "Colorado": 0.029,
    "Connecticut": 0.0635
};

const stateTaxesData = {
    "Tennessee": {
        "base": 0.07,
        "categoryModificators": {
            "Groceries": 0.005,
            "Prepared food": 0,
            "Prescription drug": 0
        }
    },
    "Texas": {
        "base": 0.0625,
        "categoryModificators": {
            "Groceries": "",
            "Prepared food": 0,
            "Prescription drug": ""
        }
    }
}

class TaxRepository {
    constructor(data) {
        this.data = data;
    }

    getBaseTax(state) {
        return this.data[state].base;
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

let taxRepository = new TaxRepository(stateTaxesData);
taxRepository.loadLegacyBaseRates(baseTaxes);


function getBaseTax(state) {
    return taxRepository.getBaseTax(state);
}

function calc(state, itemType) {

    var itemTypeTaxModifier = itemTypes[itemType];
    if (itemTypeTaxModifier[state] === "") {
        return 0;
    }
    return getBaseTax(state) + itemTypeTaxModifier[state];
}

class TaxCalculator {
    // У этой функции нелья менять интерфейс
    // Но можно менять содержимое
    calculateTax() {
        var ordersCount = getOrdersCount();
        var state = getSelectedState();
        console.log(`----------${state}-----------`);
        for (var i = 0; i < ordersCount; i++) {
            var item = getSelectedItem();
            var result = this.calculateTaxForItem(item, state);
            console.log(`${item}: $${result.toFixed(2)}`);
        }
        console.log(`----Have a nice day!-----`);
    }

    calculateTaxForItem(item, state) {
        var result = null;
        if (items[item].type === "PreparedFood") {
            result = ( 1 + getBaseTax(state) ) * items[item].price;
        }
        else {
            result = calc(state, items[item].type) * items[item].price + items[item].price;
        }
        return result;
    }
}

function calculatePriceFor(state, itemName) {
    let calculator = new TaxCalculator();
    return calculator.calculateTaxForItem(itemName, state);
}



//############################
//Production - код:
//calculateTaxes();

//############################
//Тесты:
var tests = [
    () => assertEquals(3.0 * (1 + 0.04), calculatePriceFor("Alabama", "eggs")),
    () => assertEquals(0.4 * (1 + 0.015 + 0.065), calculatePriceFor("Arkansas", "coca-cola")),
    () => assertEquals(6.7 * (1 + 0.0), calculatePriceFor("Alaska", "amoxicillin")),
    () => assertEquals(6.7 * (1 + 0.0), calculatePriceFor("California", "amoxicillin")),
    () => assertEquals(2 * (1 + 0.0635), calculatePriceFor("Connecticut", "hamburger")),

    () => assertEquals(0.07, taxRepository.getBaseTax("Tennessee")),
    () => assertEquals(0.0625, taxRepository.getBaseTax("Texas")),
    () => assertEquals(0.075, taxRepository.getBaseTax("California")),
    () => assertEquals(0, taxRepository.getBaseTax("Alaska")),
];

//Раскомментируйте следующую строчку для запуска тестов:
runAllTests (tests);

//############################
//Код ниже этой строчки не надо менять для выполнения домашней работы

function calculateTaxes() {
    var calculator = new TaxCalculator();
    calculator.calculateTax();
}

function getSelectedItem() {
    var items = ["milk", "eggs", "coca-cola", "amoxicillin", "aspirin", "marijuana", "hamburger", "ceasar salad"];
    return items[Math.floor(Math.random() * items.length)];
}

function getSelectedState() {
    var state = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut"];
    return state[Math.floor(Math.random() * state.length)];
}

function getOrdersCount() {
    return Math.floor(Math.random() * 3) + 1;
}

//############################
// Кустарный способ писать тесты

function assertEquals(expected, actual) {
    var epsilon = 0.000001;
    var difference = Math.abs(expected - actual);
    if (difference > epsilon || difference === undefined || isNaN(difference)) {
        console.error(`Fail! Expected: ${expected}, Actual: ${actual}`);
        return -1;
    }
    return 0;
}

function runAllTests(tests) {
    console.log('dsfdsf');
    var failedTests = tests
        .map((f) => f())
        .map((code) => {
            if (code === -1) {
                return 1
            } else {
                return 0
            }
        })
        .reduce((a, b) => a + b, 0);

    if (failedTests === 0) {
        console.log(`Success: ${tests.length} tests passed.`);
    }
    else {
        console.error(`Fail: ${failedTests} tests failed.`);
    }
}