var money = 0;
var mps = 0;
var clickingPower = 1;
var clickingPowerPrice = 100;
var bankMoney = 0;
var interest = 1.05;
var timerEnabled = false;
var recharge = 120;
var bankRecharge = 120;
var clicker = { name: "Klikker", price: 25, speed: 1, increase: 4, amount: 0 };
var farm = { name: "Boerderij", price: 125, speed: 3, increase: 8, amount: 0 };
var mine = { name: "Mijn", price: 250, speed: 5, increase: 11, amount: 0 };
var village = { name: "Dorp", price: 750, speed: 10, increase: 19, amount: 0 };
var city = { name: "Stad", price: 1500, speed: 20, increase: 27, amount: 0 };
var country = { name: "Land", price: 2500, speed: 35, increase: 35, amount: 0 };
var planet = { name: "Planeet", price: 12500, speed: 50, increase: 79, amount: 0 };
var galaxy = { name: "Melkweg", price: 25000, speed: 75, increase: 122, amount: 0 };
var universe = { name: "Universum", price: 25000000, speed: 100000, increase: 3535, amount: 0 };

/*function save() {
    localStorage.setItem('clicker', clicker);
    localStorage.setItem('farm', farm);
    localStorage.setItem('mine', mine);
    localStorage.setItem('village', village);
    localStorage.setItem('city', city);
    localStorage.setItem('country', country);
    localStorage.setItem('planet', planet);
    localStorage.setItem('galaxy', galaxy);
}

function load() {
    var c = localStorage.getItem('clicker');
    if (c != null) {
        clicker = c;
        farm = localStorage.getItem('farm');
        mine = localStorage.getItem('mine');
        village = localStorage.getItem('village');
        city = localStorage.getItem('city');
        country = localStorage.getItem('country');
        planet = localStorage.getItem('planet');
        galaxy = localStorage.getItem('galaxy');
    }
}*/
function animateText(element, newText) {
    element.fadeOut(500, function() {
        $(this).text(newText).fadeIn(100);
    });
}
function reset() {
    setMoney(0);
    setMps(0);
    setClickingPower(1);
    clickingPowerPrice = 250;
    timerEnabled = false
    recharge = 120;
    console.log("reset()");
}
function setMoney(_money) {
    setMoney(_money, false)
}
function setMoney(_money, animate) {
    money = _money;
    checkMoney();
    if(animate)
        animateText($('#moneyLbl'), "Geld: " + money);
    else
        $('#moneyLbl').text("Geld: " + money);
    // document.getElementById('moneyLbl').innerHTML = "Geld: " + money;
    //localStorage.setItem("money", money);
}

function setMps(_mps) {
    mps = _mps;
    document.getElementById('MPSLbl').innerHTML = "Geld per seconde: " + mps;
    //localStorage.setItem("mps", mps);
}

function setClickingPower(_clickingPower) {
    clickingPower = _clickingPower;
    document.getElementById('clickingPowerLbl').innerHTML = "Klikkracht: " + clickingPower;
    //localStorage.setItem("clickingPower", clickingPower);
}

function setBankMoney(_bankMoney) {
    bankMoney = _bankMoney;
    document.getElementById('bankMoneyLbl').innerHTML = "Geld op bank: " + bankMoney;
}

function clickBtn() {
    if (!timerEnabled) {
        timerEnabled = true;
        setInterval(mpsLoop, 1000)
    }
    setMoney(money += clickingPower, true);
}

function checkMoney() {
    if (money >= clickingPowerPrice) {
        document.getElementById('clickingPowerBtn').disabled = false;
    }

    if (money < clickingPowerPrice) {
        document.getElementById('clickingPowerBtn').disabled = true;
    }

    if (money >= clicker.price) {
        document.getElementById('clickerBtn').disabled = false;
        document.getElementById('clickerImg').src = "img/cursor.png";
    }

    if (money < clicker.price) {
        document.getElementById('clickerBtn').disabled = true;
        document.getElementById('clickerImg').src = "img/cursorb.png";
    }

    if (money >= farm.price) {
        document.getElementById('farmBtn').disabled = false;
        document.getElementById('farmImg').src = "img/farm.png";
    }

    if (money < farm.price) {
        document.getElementById('farmBtn').disabled = true;
        document.getElementById('farmImg').src = "img/farmb.png";
    }

    if (money >= mine.price) {
        document.getElementById('mineBtn').disabled = false;
        document.getElementById('mineImg').src = "img/mine.png";
    }

    if (money < mine.price) {
        document.getElementById('mineBtn').disabled = true;
        document.getElementById('mineImg').src = "img/mineb.png";
    }

    if (money >= village.price) {
        document.getElementById('villageBtn').disabled = false;
        document.getElementById('villageImg').src = "img/village.png";
    }

    if (money < village.price) {
        document.getElementById('villageBtn').disabled = true;
        document.getElementById('villageImg').src = "img/villageb.png";
    }

    if (money >= city.price) {
        document.getElementById('cityBtn').disabled = false;
        document.getElementById('cityImg').src = "img/city.png";
    }

    if (money < city.price) {
        document.getElementById('cityBtn').disabled = true;
        document.getElementById('cityImg').src = "img/cityb.png";
    }

    if (money >= country.price) {
        document.getElementById('countryBtn').disabled = false;
        document.getElementById('countryImg').src = "img/country.png";
    }

    if (money < country.price) {
        document.getElementById('countryBtn').disabled = true;
        document.getElementById('countryImg').src = "img/countryb.png";
    }

    if (money >= planet.price) {
        document.getElementById('planetBtn').disabled = false;
        document.getElementById('planetImg').src = "img/planet.png";
    }

    if (money < planet.price) {
        document.getElementById('planetBtn').disabled = true;
        document.getElementById('planetImg').src = "img/planetb.png";
    }

    if (money >= galaxy.price) {
        document.getElementById('galaxyBtn').disabled = false;
        document.getElementById('galaxyImg').src = "img/galaxy.png";
    }

    if (money < galaxy.price) {
        document.getElementById('galaxyBtn').disabled = true;
        document.getElementById('galaxyImg').src = "img/galaxyb.png";
    }

    if (money >= universe.price) {
        document.getElementById('universeBtn').disabled = false;
        document.getElementById('universeImg').src = "img/universe.png";
    }

    if (money < universe.price) {
        document.getElementById('universeBtn').disabled = true;
        document.getElementById('universeImg').src = "img/universeb.png";
    }

    if (recharge > 0) {
        // document.getElementById('provinceBtn').disabled = true;
        // document.getElementById('satelliteBtn').disabled = true;
    }

    if (recharge == 0) {
        // document.getElementById('provinceBtn').disabled = false;
        // document.getElementById('satelliteBtn').disabled = false;
    }

    if (bankMoney == 0) {
        document.getElementById('withdrawAllBtn').disabled = true;
    }

    if (bankMoney > 0) {
        document.getElementById('withdrawAllBtn').disabled = false;
    }

    if (money == 0) {
        document.getElementById('depositAllBtn').disabled = true;
    }

    if (money > 0) {
        document.getElementById('depositAllBtn').disabled = false;
    }

    if (money >= 10000) {
        document.getElementById('deposit10KBtn').disabled = false;
    }

    if (money < 10000) {
        document.getElementById('deposit10KBtn').disabled = true;
    }

    if (bankMoney >= 10000) {
        document.getElementById('withdraw10KBtn').disabled = false;
    }

    if (bankMoney < 10000) {
        document.getElementById('withdraw10KBtn').disabled = true;
    }
    console.log("checkMoney()");
}

function mpsLoop() {
    setMoney(money + mps);
    if ((recharge <= 0) == false) {
        recharge--;
    }
    if ((bankRecharge <= 0) == false) {
        bankRecharge--;
    }
    if (bankRecharge == 0) {
        bankCalculate();
    }
    document.getElementById('countdownLbl').innerHTML = "Recharge: " + recharge;
    document.getElementById('bankRechargeLbl').innerHTML = "Tijd over: " + bankRecharge;
    console.log("mpsLoop()");
}

function buyClickingPower() {
    setClickingPower(clickingPower *= 2);
    setMoney(money -= clickingPowerPrice);
    clickingPowerPrice *= 2;
    checkMoney();
    document.getElementById('clickingPowerLbl').innerHTML = "Klikkracht: " + clickingPower;
    document.getElementById('clickingPowerBtn').innerHTML = "Koop meer klikkracht (" + clickingPowerPrice + ")";
}

function buyClicker() {
    setMoney(money -= clicker.price);
    setMps(mps + clicker.speed);
    clicker.price += clicker.increase;
    clicker.amount++;
    document.getElementById('clickerBtn').innerHTML = "<img id='clickerImg' class='icon' src=../img/cursor.png height=20px width=20px>Koop klikker (" + clicker.price + ")";
    checkMoney();
    console.log("buyClicker()");
}

function buyFarm() {
    setMoney(money -= farm.price);
    setMps(mps + farm.speed);
    farm.price += farm.increase;
    farm.amount++;
    document.getElementById('farmBtn').innerHTML = "<img id='farmImg' class='icon' src=../img/farm.png height=20px width=20px>Koop boerderij (" + farm.price + ")";
    checkMoney();
    console.log("buyFarm()");
}

function buyMine() {
    setMoney(money -= mine.price);
    setMps(mps + mine.speed);
    mine.price += mine.increase;
    mine.amount++;
    document.getElementById('mineBtn').innerHTML = "<img id='mineImg' class='icon' src=../img/mine.png height=20px width=20px>Koop mijn (" + mine.price + ")";
    checkMoney();
    console.log("buyMine()");
}

function buyVillage() {
    setMoney(money -= village.price);
    setMps(mps + village.speed);
    village.price += village.increase;
    village.amount++;
    document.getElementById('villageBtn').innerHTML = "<img id='villageImg' class='icon' src=../img/village.png height=20px width=20px>Koop dorp (" + village.price + ")";
    checkMoney();
    console.log("buyVillage()");
}

function buyCity() {
    setMoney(money -= city.price);
    setMps(mps + city.speed);
    city.price += city.increase;
    document.getElementById('cityBtn').innerHTML = "<img id='cityImg' class='icon' src=../img/city.png height=20px width=20px>Koop stad (" + city.price + ")";
    checkMoney();
    console.log("buyCity()");
}

function buyCountry() {
    setMoney(money -= country.price);
    setMps(mps + country.speed);
    country.price += country.increase;
    country.amount++;
    document.getElementById('countryBtn').innerHTML = "<img id='countryImg' class='icon' src=img/county.png height=20px width=20px>Koop land (" + country.price + ")";
    checkMoney();
    console.log("buyCountry()");
}

function buyPlanet() {
    setMoney(money -= planet.price);
    setMps(mps + planet.speed);
    planet.price += planet.increase;
    planet.amount++;
    document.getElementById('planetBtn').innerHTML = "<img id='planetImg' class='icon' src=../img/planet.png height=20px width=20px>Koop planeet (" + planet.price + ")";
    checkMoney();
    console.log("buyPlanet()");
}

function buyGalaxy() {
    setMoney(money -= galaxy.price);
    setMps(mps + galaxy.speed);
    galaxy.price += galaxy.increase;
    galaxy.amount++;
    document.getElementById('galaxyBtn').innerHTML = "<img id='galaxyImg' class='icon' src=../img/galaxy.png height=20px width=20px>Koop melkweg (" + galaxy.price + ")";
    checkMoney();
    console.log("buyGalaxy()");
}

function buyUniverse() {
    setMoney(money -= universe.price);
    setMps(mps += universe.speed);
    universe.price += universe.increase;
    universe.amount++;
    document.getElementById('universeBtn').innerHTML = "<img id='universeImg' class='icon' src=../img/universe.png height=20px width=20px>Koop universum (" + universe.price + ")";
    checkMoney();
    console.log("buyUniverse()");
}

function buyProvince() {
    setMoney(Math.round(money / 3));
    setMps(mps * 2);
    recharge = 120;
    document.getElementById('provinceBtn').disabled = false;
    document.getElementById('satelliteBtn').disabled = false;
    console.log("buyProvince()");
}

function buySatelitte() {
    setMoney(money * 2);
    setMps(Math.round(mps / 3));
    recharge = 120;
    document.getElementById('provinceBtn').disabled = false;
    document.getElementById('satelliteBtn').disabled = false;
    console.log("buySatelitte()");
}

function depositAll() {
    setBankMoney(bankMoney += money);
    setMoney(0);
    console.log("depositAll()");
}

function withdrawAll() {
    setMoney(money += bankMoney);
    setBankMoney(0);
    console.log("withdrawAll()");
}

function deposit10K() {
    setBankMoney(bankMoney += 10000);
    setMoney(money -= 10000);
    console.log("deposit10K()");
}

function withdraw10K() {
    setMoney(money += 10000);
    setBankMoney(bankMoney -= 10000);
    console.log("withdraw10K()");
}

function bankCalculate() {
    bankRecharge = 120;
    setBankMoney(Math.round(bankMoney * interest));
    console.log("bankCalculate()");
}