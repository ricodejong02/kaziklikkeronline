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
    setClickingPowerPrice(100);
    clickingPowerPrice = 100;
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
function updatePrices() {
    document.getElementById('clickerBtn').innerHTML = "<img id='clickerImg' class='icon' src=img/cursor.png height=20px width=20px>Koop klikker (" + Data.clicker.price + ")";
    document.getElementById('farmBtn').innerHTML = "<img id='farmImg' class='icon' src=img/farm.png height=20px width=20px>Koop boerderij (" + Data.farm.price + ")";
    document.getElementById('mineBtn').innerHTML = "<img id='mineImg' class='icon' src=img/mine.png height=20px width=20px>Koop mijn (" + Data.mine.price + ")";
    document.getElementById('villageBtn').innerHTML = "<img id='villageImg' class='icon' src=img/village.png height=20px width=20px>Koop dorp (" + Data.village.price + ")";
    document.getElementById('cityBtn').innerHTML = "<img id='cityImg' class='icon' src=img/city.png height=20px width=20px>Koop stad (" + Data.city.price + ")";
    document.getElementById('countryBtn').innerHTML = "<img id='countryImg' class='icon' src=img/country.png height=20px width=20px>Koop land (" + Data.country.price + ")";
    document.getElementById('planetBtn').innerHTML = "<img id='planetImg' class='icon' src=img/planet.png height=20px width=20px>Koop planeet (" + Data.planet.price + ")";
    document.getElementById('galaxyBtn').innerHTML = "<img id='galaxyImg' class='icon' src=img/galaxy.png height=20px width=20px>Koop melkweg (" + Data.galaxy.price + ")";
    document.getElementById('universeBtn').innerHTML = "<img id='universeImg' class='icon' src=img/universe.png height=20px width=20px>Koop universum (" + Data.universe.price + ")";
}