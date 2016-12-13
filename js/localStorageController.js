/**
 * Created by Daniel Verhoef on 13-12-2016.
 */
function restoreSaves() {
    var money = localStorage.getItem('money');
    if (!isNaN(money)) {
        setMoney(money - 1);
        clickBtn();
    }
    else
        setMoney(0);

    var clickingPower = parseInt(localStorage.getItem('clickingPower'));
    var clickingPowerPrice = parseInt(localStorage.getItem('clickingPowerPrice'));
    var bankMoney = parseInt(localStorage.getItem('bankMoney'));
    var mps = parseInt(localStorage.getItem('mps'));
    if (!isNaN(mps))
        setMps(mps);
    else
        setMps(0);

    if (!isNaN(clickingPowerPrice)) {
        setClickingPowerPrice(clickingPowerPrice)
    }
    else
        setClickingPowerPrice(100);
    if (!isNaN(clickingPower))
        setClickingPower(clickingPower);
    else
        setClickingPower(1);
    if (!isNaN(bankMoney))
        setBankMoney(bankMoney);
    load();
}
function saveData() {
    localStorage.setItem('data', JSON.stringify(Data));
}
function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
        if (arr[i] !== undefined) rv[i] = arr[i];
    return rv;
}
function load() {
    var data = JSON.parse(localStorage.getItem('data'));
    if (data != undefined) {
        Data = data;
    }
    updatePrices();
}
function reset() {
    setBankMoney(0);
    setMoney(0);
    setMps(0);
    setClickingPower(1);
    clickingPowerPrice = 250;
    timerEnabled = false;
    recharge = 120;
    console.log("reset()");
    Data = DataBC;
    updatePrices();
}

Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function (key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
};