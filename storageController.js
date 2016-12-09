/**
 * Created by Daniel Verhoef on 9-12-2016.
 */

function storageController() {
    function getLastSessionMoney() {
        try{
            return getCookie('money');
        }
        catch(exception){}
        return 0;
    }
    function setMoney(moneyValue) {
        setCookie('money',moneyValue)
    }
    function getCookie(name) {
        var name = name + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
            }
        }
        return "";
    }
    function setCookie(name, value) {
        var d = new Date();
        d.setTime(d.getTime() + (172800000));
        var expires = "expires="+d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
}