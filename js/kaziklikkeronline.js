const version = "0.0.2";

var money = 200;
var mps = 0;
var clickingPower = 1;
var clickingPowerPrice = 500;
var bankMoney = 0;
var interest = 1.05;
var timerEnabled = false;
var recharge = 120;
var bankRecharge = 120;
var antiCheat = 0;
var currentUser;
var signedIn = false;
var bankGraph = {
    datasets: [{
        label: "Interest",
        data: [
            {x: 0, y: 0}
        ]
    }]
};
var Data;
var Dialog;
function loadDialog(path, isClosable) {
    BootstrapDialog.show({
        message: function (dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            dialog.setClosable(isClosable);
            $message.load(pageToLoad);
            Dialog = dialog;
            return $message;
        },
        data: {
            'pageToLoad': path
        }
    });
}
function sign_out() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        location.reload()
    }, function(error) {
        console.error('Sign Out Error', error);
    });
}
function signInGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    });
    auth(provider);
}
function signInFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope("email");
    provider.addScope("public_profile");
    provider.addScope("user_about_me");
    auth(provider);
}
function auth(provider) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            currentUser = user;
            $("#welcomeMessage").text("Hello, " + currentUser.displayName + "!");
            if (!signedIn) {
                console.log("Loading...");
                save();
                Load();
                signedIn = true;
            }
        } else {
            firebase.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                currentUser = result.user;
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
        }
    });
}
/**
 * @return {string}
 */
function NiceNumber(num) {
    num = parseFloat(num);
    if (num < 1e+3)
        return num.toString();
    if (num >= 1e+3 && num < 1e+6)
        return (num / 1e+3).toFixed(2).toString() + "K";
    if (num >= 1e+6 && num < 1e+9)
        return (num / 1e+6).toFixed(2).toString() + "Mi";
    if (num >= 1e+9 && num < 1e+12)
        return (num / 1e+9).toFixed(2).toString() + "Bi";
    if (num >= 1e+12 && num < 1e+15)
        return (num / 1e+12).toFixed(2).toString() + "Tr";
    if (num >= 1e+15 && num < 1e+18)
        return (num / 1e+15).toFixed(2).toString() + "Qa";
    if (num >= 1e+18 && num < 1e+21)
        return (num / 1e+18).toFixed(2).toString() + "Qi";
    if (num >= 1e+21 && num < 1e+24)
        return (num / 1e+21).toFixed(2).toString() + "Sx";
    if (num >= 1e+24 && num < 1e+27)
        return (num / 1e+24).toFixed(2).toString() + "Sp";
    if (num >= 1e+27 && num < 1e+30)
        return (num / 1e+27).toFixed(2).toString() + "Oc";
    if (num >= 1e+30 && num < 1e+33)
        return (num / 1e+30).toFixed(2).toString() + "No";
    if (num >= 1e+33 && num < 1e+36)
        return (num / 1e+33).toFixed(2).toString() + "De";
    else
        return "ERR";
}

function animateText(element, newText) {
    element.fadeOut(200, function () {
        $(this).text(newText).fadeIn(100);
    });
}
function setClickingPowerPrice(price) {
    clickingPowerPrice = price;
    document.getElementById('clickingPowerLbl').innerHTML = "Clicking power: " + NiceNumber(clickingPower);
    document.getElementById('clickingPowerBtn').innerHTML = "Buy Clicking power (" + NiceNumber(clickingPowerPrice) + ")";
}

function setMoney(_money, animate, uid) {
    if (uid == currentUser.uid) {
        money = _money;
        checkMoney();

        $('#moneyLbl').text("Money: " + NiceNumber(money));
        //$('#moneyLbl').prop('title', money.toString()).tooltip();
        // document.getElementById('moneyLbl').innerHTML = "Money: " + money;
        save();
    }
}

function setMps(_mps) {
    mps = _mps;
    // console.log("setMps: " + mps + " is now: " + _mps);
    document.getElementById('MPSLbl').innerHTML = "Money/second: " + NiceNumber(mps);
}

function setClickingPower(_clickingPower) {
    clickingPower = _clickingPower;
    document.getElementById('clickingPowerLbl').innerHTML = "Clicking power: " + NiceNumber(clickingPower);
    document.getElementById('clickingPowerLbl').innerHTML = "Clicking power: " + NiceNumber(clickingPower);
    document.getElementById('clickingPowerBtn').innerHTML = "Buy Clicking power (" + NiceNumber(clickingPowerPrice) + ")";
}

function setBankMoney(_bankMoney) {
    bankMoney = _bankMoney;
    document.getElementById('bankMoneyLbl').innerHTML = "Money on bank: " + NiceNumber(bankMoney);
}

function clickBtn() {
    if (!timerEnabled) {
        timerEnabled = true;
        setInterval(mpsLoop, 1000)
    }
    antiCheat++;
    if (antiCheat >= 15) {
        alert("Cheat gedetecteerd, >= 15 kliks per seconde!");
        reset();
    }
    setMoney(money += clickingPower, undefined, currentUser.uid);
}

function checkMoney() {
    try {
        if (money >= clickingPowerPrice) {
            document.getElementById('clickingPowerBtn').disabled = false;
        }

        if (money < clickingPowerPrice) {
            document.getElementById('clickingPowerBtn').disabled = true;
        }

        if (money >= Data.clicker.price) {
            document.getElementById('clickerBtn').disabled = false;
            document.getElementById('clickerImg').src = "img/cursor.png";
        }

        if (money < Data.clicker.price) {
            document.getElementById('clickerBtn').disabled = true;
            document.getElementById('clickerImg').src = "img/cursorb.png";
        }

        if (money >= Data.farm.price) {
            document.getElementById('farmBtn').disabled = false;
            document.getElementById('farmImg').src = "img/farm.png";
        }

        if (money < Data.farm.price) {
            document.getElementById('farmBtn').disabled = true;
            document.getElementById('farmImg').src = "img/farmb.png";
        }

        if (money >= Data.mine.price) {
            document.getElementById('mineBtn').disabled = false;
            document.getElementById('mineImg').src = "img/mine.png";
        }

        if (money < Data.mine.price) {
            document.getElementById('mineBtn').disabled = true;
            document.getElementById('mineImg').src = "img/mineb.png";
        }

        if (money >= Data.village.price) {
            document.getElementById('villageBtn').disabled = false;
            document.getElementById('villageImg').src = "img/village.png";
        }

        if (money < Data.village.price) {
            document.getElementById('villageBtn').disabled = true;
            document.getElementById('villageImg').src = "img/villageb.png";
        }

        if (money >= Data.city.price) {
            document.getElementById('cityBtn').disabled = false;
            document.getElementById('cityImg').src = "img/city.png";
        }

        if (money < Data.city.price) {
            document.getElementById('cityBtn').disabled = true;
            document.getElementById('cityImg').src = "img/cityb.png";
        }

        if (money >= Data.country.price) {
            document.getElementById('countryBtn').disabled = false;
            document.getElementById('countryImg').src = "img/country.png";
        }

        if (money < Data.country.price) {
            document.getElementById('countryBtn').disabled = true;
            document.getElementById('countryImg').src = "img/countryb.png";
        }

        if (money >= Data.planet.price) {
            document.getElementById('planetBtn').disabled = false;
            document.getElementById('planetImg').src = "img/planet.png";
        }

        if (money < Data.planet.price) {
            document.getElementById('planetBtn').disabled = true;
            document.getElementById('planetImg').src = "img/planetb.png";
        }

        if (money >= Data.galaxy.price) {
            document.getElementById('galaxyBtn').disabled = false;
            document.getElementById('galaxyImg').src = "img/galaxy.png";
        }

        if (money < Data.galaxy.price) {
            document.getElementById('galaxyBtn').disabled = true;
            document.getElementById('galaxyImg').src = "img/galaxyb.png";
        }

        if (money >= Data.universe.price) {
            document.getElementById('universeBtn').disabled = false;
            document.getElementById('universeImg').src = "img/universe.png";
        }

        if (money < Data.universe.price) {
            document.getElementById('universeBtn').disabled = true;
            document.getElementById('universeImg').src = "img/universeb.png";
        }

        if (recharge > 0) {
            document.getElementById('provinceBtn').disabled = true;
            document.getElementById('moonImg').src = "img/moonb.png";
            document.getElementById('satelliteBtn').disabled = true;
            document.getElementById('sunImg').src = "img/sunb.png";
        }

        if (recharge == 0) {
            document.getElementById('provinceBtn').disabled = false;
            document.getElementById('moonImg').src = "img/moon.png";
            document.getElementById('satelliteBtn').disabled = false;
            document.getElementById('sunImg').src = "img/sun.png";
        }

        if (bankMoney == 0) {
            document.getElementById('withdrawAllBtn').disabled = true;
            document.getElementById('allminusImg').src = "img/allminusb.png"
        }

        if (bankMoney > 0) {
            document.getElementById('withdrawAllBtn').disabled = false;
            document.getElementById('allminusImg').src = "img/allminus.png"
        }

        if (money == 0) {
            document.getElementById('depositAllBtn').disabled = true;
            document.getElementById('allplusImg').src = "img/allplusb.png"
        }

        if (money > 0) {
            document.getElementById('depositAllBtn').disabled = false;
            document.getElementById('allplusImg').src = "img/allplus.png"
        }

        if (money >= 10000) {
            document.getElementById('deposit10KBtn').disabled = false;
            document.getElementById('plusImg').src = "img/plus.png"
        }

        if (money < 10000) {
            document.getElementById('deposit10KBtn').disabled = true;
            document.getElementById('plusImg').src = "img/plusb.png"
        }

        if (bankMoney >= 10000) {
            document.getElementById('withdraw10KBtn').disabled = false;
            document.getElementById('minusImg').src = "img/minus.png"
        }

        if (bankMoney < 10000) {
            document.getElementById('withdraw10KBtn').disabled = true;
            document.getElementById('minusImg').src = "img/minusb.png"
        }
    }
    catch (exception) {
    }

}
function openWiki() {
    BootstrapDialog.show({
        message: function (dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);

            return $message;
        },
        data: {
            'pageToLoad': 'dialogs/wiki.html'
        }
    });
}
var i = 0;
function mpsLoop() {
    antiCheat = 0;
    // $('[datatype=tooltip]').tooltip();

    setMoney(money += mps, undefined, currentUser.uid);
    if ((recharge <= 0) == false) {
        recharge--;
    }
    if ((bankRecharge <= 0) == false) {
        bankRecharge--;
    }
    if (bankRecharge == 0) {
        bankCalculate();
    }
    if ($('#animateLogo').is(':checked')) {
        $('#logoHeader').fadeOut(1000, function () {
            $('#logoHeader').fadeIn(1000);
        });
    }
    if (Math.floor(((Math.random() * 4  )) + 1) == 1) {
        setInterest(Math.floor((Math.random() * 9) + 0.1));
    }
    bankGraph.datasets[0].data.push({x: i, y: parseFloat(interest)});
    document.getElementById('countdownLbl').innerHTML = "Recharge: " + recharge;
    document.getElementById('bankRechargeLbl').innerHTML = "Tijd over: " + bankRecharge;
    saveData();
    save();
    i++;
}

function buyClickingPower() {
    setClickingPower(clickingPower *= 2);
    setMoney(money -= clickingPowerPrice, undefined, currentUser.uid);
    setClickingPowerPrice(clickingPowerPrice *= 2);
    checkMoney();
    document.getElementById('clickingPowerLbl').innerHTML = "Clicking power: " + NiceNumber(clickingPower);
    document.getElementById('clickingPowerBtn').innerHTML = "Buy Clicking power (" + NiceNumber(clickingPowerPrice) + ")";

}

function buyClicker() {
    setMoney(money -= Data.clicker.price, undefined, currentUser.uid);
    setMps(mps + Data.clicker.speed);
    Data.clicker.amount++;
    Data.clicker.price += Data.clicker.increase;
    checkMoney();
    updatePrices()
}

function buyFarm() {
    setMoney(money -= Data.farm.price, undefined, currentUser.uid);
    setMps(mps + Data.farm.speed);
    Data.farm.amount++;
    Data.farm.price += Data.farm.increase;
    checkMoney();
    updatePrices()
}

function buyMine() {
    setMoney(money -= Data.mine.price, undefined, currentUser.uid);
    setMps(mps + Data.mine.speed);
    Data.mine.amount++;
    Data.mine.price += Data.mine.increase;
    checkMoney();
    updatePrices()
}

function buyVillage() {
    setMoney(money -= Data.village.price, undefined, currentUser.uid);
    setMps(mps + Data.village.speed);
    Data.village.amount++;
    Data.village.price += Data.village.increase;
    checkMoney();
    updatePrices()
}

function buyCity() {
    setMoney(money -= Data.city.price, undefined, currentUser.uid);
    setMps(mps + Data.city.speed);
    Data.city.price += Data.city.increase;
    checkMoney();
    updatePrices()
}

function buyCountry() {
    setMoney(money -= Data.country.price, undefined, currentUser.uid);
    setMps(mps + Data.country.speed);
    Data.country.amount++;
    Data.country.price += Data.country.increase;
    checkMoney();
    updatePrices()
}

function buyPlanet() {
    setMoney(money -= Data.planet.price, undefined, currentUser.uid);
    setMps(mps + Data.planet.speed);
    Data.planet.amount++;
    Data.planet.price += Data.planet.increase;
    checkMoney();
    updatePrices()
}

function buyGalaxy() {
    setMoney(money -= Data.galaxy.price, undefined, currentUser.uid);
    setMps(mps + Data.galaxy.speed);
    Data.galaxy.amount++;
    Data.galaxy.price += Data.galaxy.increase;
    checkMoney();
    updatePrices()
}

function buyUniverse() {
    setMoney(money -= Data.universe.price, undefined, currentUser.uid);
    setMps(mps += Data.universe.speed);
    Data.universe.amount++;
    Data.universe.price += Data.universe.increase;
    checkMoney();
    updatePrices()
}

function buyProvince() {
    setMoney(Math.round(money / 3), undefined, currentUser.uid);
    setBankMoney(Math.round(money / 3));
    setMps(mps * 2);
    recharge = 120;
    document.getElementById('provinceBtn').disabled = true;
    document.getElementById('satelliteBtn').disabled = true;
}

function buySatelite() {
    setMoney(money * 2, undefined, currentUser.uid);
    setBankMoney(money / 2);
    setMps(Math.round(mps / 3));
    recharge = 120;
    document.getElementById('provinceBtn').disabled = true;
    document.getElementById('satelliteBtn').disabled = true;
    updatePrices()
}

function depositAll() {
    setBankMoney(bankMoney += money);
    setMoney(0, undefined, currentUser.uid);
}

function withdrawAll() {
    setMoney(money += bankMoney, undefined, currentUser.uid);
    setBankMoney(0);
}

function deposit10K() {
    setBankMoney(bankMoney += 10000);
    setMoney(money -= 10000, undefined, currentUser.uid);
}

function withdraw10K() {
    setMoney(money += 10000, undefined, currentUser.uid);
    setBankMoney(bankMoney -= 10000);
}

function bankCalculate() {
    bankRecharge = 120;
    setBankMoney(Math.round(bankMoney * interest));
}
function setInterest(_interest) {
    interest = _interest / 100 + 1;
    $('#interestLbl').text('Rente: ' + _interest + '%');
}