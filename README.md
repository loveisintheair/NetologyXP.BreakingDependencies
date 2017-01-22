# NetologyXP.BreakingDependencies
Целью рефакторинга было простое добавление новых штатов. Теперь структура данных о налогах штата выглядит так:
```
const stateTaxesData = {
    "Tennessee": {
        "base": 0.07,
        "categoryModificators": {
            "Groceries": 0.05,
            "PreparedFood": 0,
            "Prescription drug": 0
        }
    },
    "Texas": {
        "base": 0.0625,
        "categoryModificators": {
            "Groceries": "",
            "PreparedFood": 0,
            "Prescription drug": ""
        }
    }
}
```
чтобы добавить новый штат, нужно внести изменения в один объект, а не в объект и функцию, как раньше.

Старые данные импортируются в объект нового формата.

