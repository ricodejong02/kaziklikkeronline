var money = 0;
var mps = 0;
var timerEnabled = false;
var clicker = { name: "Klikker", price: 25, speed: 1, increase: 4 };
var farm = { name: "Boerderij", price: 125, speed: 3, increase: 8 };
var mine = { name: "Mijn", price: 250, speed: 5, increase: 11 };

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
    setMoney(money += 1);
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
    console.log("checkMoney()");
}

function mpsLoop() {
    setMoney(money + mps);
    console.log("mpsLoop()");
}

function buyClicker() {
    if (!timerEnabled) {
        timerEnabled = true;
        setInterval(mpsLoop, 1000)
    }
    setMoney(money -= clicker.price);
    setMps(mps + clicker.speed);
    clicker.price += clicker.increase;
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
    document.getElementById('mineBtn').innerHTML = "Koop mijn (" + mine.price + ")";
    console.log("buyMine()");
}


