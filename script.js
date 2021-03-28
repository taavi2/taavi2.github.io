(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {

        let c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {

            let date = new Date();
            let timeAdd = " am";
            let amPm = date.getHours();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (h > 12) {
                h -= 12;
            }
            if (h == 0) {
                h = 12;
            }
            if (amPm > 12) {
                timeAdd = " pm";
            }

            c.innerHTML = h + ":" + m + ":" + s + timeAdd;

        };

    });

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);
    document.getElementById("form").addEventListener("submit", required);

    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function required() {
        let eesnimi = document.getElementById("fname").value;
        let perenimi = document.getElementById("lname").value;
        let radiobuttons = document.getElementById("radiobutton");
        let containNumber = /\d/;

        // tekstiväljad
        if (eesnimi === "" || perenimi === "") {
            alert("Palun täitke tekstiväljad");
        } else if (containNumber.test(eesnimi) || containNumber.test(perenimi)) {
            alert("Nimi ei saa numbrit sisaldada")
        }


        // radiobutton check
        for (let i = 0; i < radiobuttons.length; i++) {
            if (radiobuttons[i].checked) {
                alert("Tuleb valida kliendi staatus")
                return false;
            }
        }
    }

    function estimateDelivery(event) {
        event.preventDefault();

        let linn = document.getElementById("linn");

        if (linn.value === "") {

            alert("Palun valige linn nimekirjast");

            linn.focus();

            return;


        } else {
            if (linn.value === "tln") {
                e.innerHTML = "0 &euro;";
            } else if (linn.value === "trt") {
                e.innerHTML = "2.5 &euro;";
            } else if (linn.value === "nrv") {
                e.innerHTML = "2.5 &euro;";
            } else if (linn.value === "prn") {
                e.innerHTML = "3 &euro;";
            }
        }

        console.log("Tarne hind on arvutatud");
    }

})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";
let map;
let infobox;

function GetMap() {
    let centerPoint = new Microsoft.Maps.Location(
        56.38104,
        24.71992
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 5,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    let uliKool = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );

    let suvakas = new Microsoft.Maps.Location(
        54.38104,
        23.71992
    );

    infobox = new Microsoft.Maps.Infobox(centerPoint, {
        visible: false
    });
    infobox.setMap(map);

    let pushpin1 = new Microsoft.Maps.Pushpin(uliKool, {
        title: 'Tartu Ülikool',
    });

    let pushpin2 = new Microsoft.Maps.Pushpin(suvakas, {
        title: 'Järv Atesys ',
    });

    pushpin1.metadata = {
        title: 'Tartu Ülikool',
        description: 'Tere tulemast'
    };

    pushpin2.metadata = {
        title: 'Järv Atesys',
        description: 'Tere tulemast'
    }

    Microsoft.Maps.Events.addHandler(pushpin1, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);

    map.entities.push(pushpin1);
    map.entities.push(pushpin2);
}

function pushpinClicked(event) {
    infobox.setOptions({
        title: event.target.metadata.title,
        description: event.target.metadata.description,
        visible: true
    });
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

