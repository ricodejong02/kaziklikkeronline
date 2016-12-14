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

    var clickingPower = parseFloat(localStorage.getItem('clickingPower'));
    var clickingPowerPrice = parseFloat(localStorage.getItem('clickingPowerPrice'));
    var bankMoney = parseFloat(localStorage.getItem('bankMoney'));
    var mps = parseFloat(localStorage.getItem('mps'));
    if (!isNaN(mps))
        setMps(mps);
    else
        setMps(0);

    if (!isNaN(clickingPowerPrice)) {
        setClickingPowerPrice(clickingPowerPrice)
    }
    else
        setClickingPowerPrice(500);
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
    else{
        Data = DataBC;
    }
    updatePrices();
}
function reset() {
    setBankMoney(0);
    setMoney(200);
    setMps(0);
    setClickingPower(1);
    setClickingPowerPrice(500);
    clickingPowerPrice = 500;
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
    document.getElementById('clickerBtn').innerHTML = "<img id='clickerImg' class='icon' src=img/cursor.png height=20px width=20px>Koop klikker (" + NiceNumber(Data.clicker.price) + ")";
    document.getElementById('farmBtn').innerHTML = "<img id='farmImg' class='icon' src=img/farm.png height=20px width=20px>Koop boerderij (" + NiceNumber(Data.farm.price) + ")";
    document.getElementById('mineBtn').innerHTML = "<img id='mineImg' class='icon' src=img/mine.png height=20px width=20px>Koop mijn (" + NiceNumber(Data.mine.price) + ")";
    document.getElementById('villageBtn').innerHTML = "<img id='villageImg' class='icon' src=img/village.png height=20px width=20px>Koop dorp (" + NiceNumber(Data.village.price) + ")";
    document.getElementById('cityBtn').innerHTML = "<img id='cityImg' class='icon' src=img/city.png height=20px width=20px>Koop stad (" + NiceNumber(Data.city.price) + ")";
    document.getElementById('countryBtn').innerHTML = "<img id='countryImg' class='icon' src=img/country.png height=20px width=20px>Koop land (" + NiceNumber(Data.country.price) + ")";
    document.getElementById('planetBtn').innerHTML = "<img id='planetImg' class='icon' src=img/planet.png height=20px width=20px>Koop planeet (" + NiceNumber(Data.planet.price) + ")";
    document.getElementById('galaxyBtn').innerHTML = "<img id='galaxyImg' class='icon' src=img/galaxy.png height=20px width=20px>Koop melkweg (" + NiceNumber(Data.galaxy.price) + ")";
    document.getElementById('universeBtn').innerHTML = "<img id='universeImg' class='icon' src=img/universe.png height=20px width=20px>Koop universum (" + NiceNumber(Data.universe.price) + ")";
}