/**
 * Created by Daniel Verhoef on 13-12-2016.
 */
var database = firebase.database();

function restoreSaves() {
    $.LoadingOverlay("hide");

    getProperties();
    updatePrices();

}
function getUserDB() {
    return database.ref("users").child(currentUser.uid);
}
function saveData() {
    getUserDB().child("data").set(Data);
}
function Load() {
    getUserDB().child('data').on('value', function (snapshot) {
        Data = snapshot.val();
        if (Data == null)
            Data = DataBC;
        restoreSaves();
    });
}
function saveProperty(name, prop) {
    getUserDB().child('properties').child(name).set(prop);
}
function getProperties() {
    getUserDB().child('properties').once('value').then(function (snapshot) {
        var values = snapshot.val();
        if (values == null) {
            save()
        }
        else {
            setMoney(values.money, undefined, currentUser.uid);
            setBankMoney(values.bankMoney);
            setClickingPower(values.clickingPower);
            setClickingPowerPrice(values.clickingPowerPrice);
            recharge = values.recharge;
            setMps(values.mps);
        }
        if (!timerEnabled) {
            timerEnabled = true;
            setInterval(mpsLoop, 1000)
        }
        updatePrices();
        $.LoadingOverlay("hide");
    });
}
function reset() {
    setBankMoney(0);
    setMoney(200, undefined, currentUser.uid);
    setMps(0);
    setClickingPower(1);
    setClickingPowerPrice(500);
    clickingPowerPrice = 500;
    timerEnabled = false;
    recharge = 120;
    console.log("reset()");
    Data = DataBC;
    saveData();
    updatePrices();
}
function updatePrices() {
    document.getElementById('clickerBtn').innerHTML = "<img id='clickerImg' class='icon' src='img/clickerb.png' height=20px width=20px>Buy klikker (" + NiceNumber(Data.clicker.price) + ")";
    document.getElementById('farmBtn').innerHTML = "<img id='farmImg' class='icon' src=img/farmb.png height=20px width=20px>Buy boerderij (" + NiceNumber(Data.farm.price) + ")";
    document.getElementById('mineBtn').innerHTML = "<img id='mineImg' class='icon' src=img/mineb.png height=20px width=20px>Buy mijn (" + NiceNumber(Data.mine.price) + ")";
    document.getElementById('villageBtn').innerHTML = "<img id='villageImg' class='icon' src=img/villageb.png height=20px width=20px>Buy dorp (" + NiceNumber(Data.village.price) + ")";
    document.getElementById('cityBtn').innerHTML = "<img id='cityImg' class='icon' src=img/cityb.png height=20px width=20px>Buy stad (" + NiceNumber(Data.city.price) + ")";
    document.getElementById('countryBtn').innerHTML = "<img id='countryImg' class='icon' src=img/countryb.png height=20px width=20px>Buy land (" + NiceNumber(Data.country.price) + ")";
    document.getElementById('planetBtn').innerHTML = "<img id='planetImg' class='icon' src=img/planetb.png height=20px width=20px>Buy planeet (" + NiceNumber(Data.planet.price) + ")";
    document.getElementById('galaxyBtn').innerHTML = "<img id='galaxyImg' class='icon' src=img/galaxyb.png height=20px width=20px>Buy melkweg (" + NiceNumber(Data.galaxy.price) + ")";
    document.getElementById('universeBtn').innerHTML = "<img id='universeImg' class='icon' src=img/universeb.png height=20px width=20px>Buy universum (" + NiceNumber(Data.universe.price) + ")";
}
function save() {
    if (!isNaN(money)) {
        saveProperty("money", money);
    }
    saveProperty("bankMoney", bankMoney);
    saveProperty("clickingPower", clickingPower);
    saveProperty("clickingPowerPrice", clickingPowerPrice);
    saveProperty("recharge", recharge);
    saveProperty("mps", mps);
}