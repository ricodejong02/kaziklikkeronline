var money = 0;
var mps = 0;
var clickingPower = 1;
var clickingPowerPrice = 250;
var timerEnabled = false;
var clicker = { name: "Klikker", price: 25, speed: 1, increase: 4, amount: 0 };
var farm = { name: "Boerderij", price: 125, speed: 3, increase: 8, amount: 0 };
var mine = { name: "Mijn", price: 250, speed: 5, increase: 11, amount: 0 };
var village = { name: "Dorp", price: 750, speed: 10, increase: 19, amount: 0 };
var city = { name: "Stad", price: 1500, speed: 20, increase: 27, amount: 0 };
var country = { name: "Land", price: 2500, speed: 35, increase: 35, amount: 0 };
var planet = { name: "Planeet", price: 12500, speed: 50, increase: 79, amount: 0 };
var galaxy = { name: "Melkweg", price: 25000, speed: 75, increase: 122, amount: 0 };

function setMoney(_money) {
    money = _money;
    checkMoney();
    document.getElementById('moneyLbl').innerHTML = "Geld: " + money;
    console.log("setMoney()");
}

function setMps(_mps) {
    mps = _mps;
    document.getElementById('MPSLbl').innerHTML = "Geld per seconde: " + mps;
    console.log("setMps()");
}

function clickBtn() {
    setMoney(money += clickingPower);
    console.log("clickBtn()");
}

function checkMoney() {
    if (money >= clicker.price) {
        document.getElementById('clickerBtn').disabled = false;
    }

    if (money < clicker.price) {
        document.getElementById('clickerBtn').disabled = true;
    }

    if (money >= farm.price) {
        document.getElementById('farmBtn').disabled = false;
    }

    if (money < farm.price) {
        document.getElementById('farmBtn').disabled = true;
    }

    if (money >= mine.price) {
        document.getElementById('mineBtn').disabled = false;
    }

    if (money < mine.price) {
        document.getElementById('mineBtn').disabled = true;
    }

    if (money >= village.price) {
        document.getElementById('villageBtn').disabled = false;
    }

    if (money < village.price) {
        document.getElementById('villageBtn').disabled = true;
    }

    if (money >= city.price) {
        document.getElementById('cityBtn').disabled = false;
    }

    if (money < city.price) {
        document.getElementById('cityBtn').disabled = true;
    }

    if (money >= country.price) {
        document.getElementById('countryBtn').disabled = false;
    }

    if (money < country.price) {
        document.getElementById('countryBtn').disabled = true;
    }

    if (money >= planet.price) {
        document.getElementById('planetBtn').disabled = false;
    }

    if (money < planet.price) {
        document.getElementById('planetBtn').disabled = true;
    }

    if (money >= galaxy.price) {
        document.getElementById('galaxyBtn').disabled = false;
    }

    if (money < galaxy.price) {
        document.getElementById('galaxyBtn').disabled = true;
    }
    console.log("checkMoney()");
}

function mpsLoop() {
    setMoney(money + mps);
    console.log("mpsLoop()");
}

function buyClickingPower(){
    clickingPower *= 2;
    money -= clickingPowerPrice;
    clickingPowerPrice *= 2;
    document.getElementById('clickingPowerLbl').innerHTML = "Klikkracht: " + clickingPower;
    document.getElementById('clickingPowerBtn').innerHTML = "Koop meer klikkracht (" + clickingPower + ")";
}

function buyClicker() {
    if (!timerEnabled) {
        timerEnabled = true;
        setInterval(mpsLoop, 1000)
    }
    setMoney(money -= clicker.price);
    setMps(mps + clicker.speed);
    clicker.price += clicker.increase;
    clicker.amount++;
    document.getElementById('clickerBtn').innerHTML = "Koop klikker (" + clicker.price + ")";
    console.log("buyClicker()");
}

function buyFarm() {
    if (!timerEnabled) {
        timerEnabled = true;
        setInterval(mpsLoop, 1000)
    }
    setMoney(money -= farm.price);
    setMps(mps + farm.speed);
    farm.price += farm.increase;
    farm.amount++;
    document.getElementById('farmBtn').innerHTML = "Koop boerderij (" + farm.price + ")";
    console.log("buyFarm()");
}

function buyMine() {
    if (!timerEnabled) {
        timerEnabled = true;
        setInterval(mpsLoop, 1000)
    }
    setMoney(money -= mine.price);
    setMps(mps + mine.speed);
    mine.price += mine.increase;
    mine.amount++;
    document.getElementById('mineBtn').innerHTML = "Koop mijn (" + mine.price + ")";
    console.log("buyMine()");
}

function buyVillage() {
    if (!timerEnabled) {
        timerEnabled = true;
        setInterval(mpsLoop, 1000)
    }
    setMoney(money -= village.price);
    setMps(mps + village.speed);
    village.price += village.increase;
    village.amount++;
    document.getElementById('villageBtn').innerHTML = "Koop dorp (" + village.price + ")";
    console.log("buyVillage()");
}

function buyCity() {
    if (!timerEnabled) {
        timerEnabled = true;
        setInterval(mpsLoop, 1000)
    }
    setMoney(money -= city.price);
    setMps(mps + city.speed);
    city.price += city.increase;
    document.getElementById('cityBtn').innerHTML = "Koop stad (" + city.price + ")";
    console.log("buyCity()");
}

function buyCountry() {
    if (!timerEnabled) {
        timerEnabled = true;
        setInterval(mpsLoop, 1000)
    }
    setMoney(money -= country.price);
    setMps(mps + country.speed);
    country.price += country.increase;
    country.amount++;
    document.getElementById('countryBtn').innerHTML = "Koop land (" + country.price + ")";
    console.log("buyCountry()");
}

function buyPlanet() {
    if (!timerEnabled) {
        timerEnabled = true;
        setInterval(mpsLoop, 1000)
    }
    setMoney(money -= planet.price);
    setMps(mps + planet.speed);
    planet.price += planet.increase;
    planet.amount++;
    document.getElementById('planetBtn').innerHTML = "Koop planeet (" + planet.price + ")";
    console.log("buyPlanet()");
}

function buyGalaxy() {
    if (!timerEnabled) {
        timerEnabled = true;
        setInterval(mpsLoop, 1000)
    }
    setMoney(money -= galaxy.price);
    setMps(mps + galaxy.speed);
    galaxy.price += galaxy.increase;
    galaxy.amount++;
    document.getElementById('galaxyBtn').innerHTML = "Koop melkweg (" + galaxy.price + ")";
    console.log("buyGalaxy()");
}
