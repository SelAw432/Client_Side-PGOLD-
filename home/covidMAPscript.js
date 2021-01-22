function fetchJSON(url) {
    return fetch(url)
    .then(response =>{
        return response.json();
    })
    .then(data =>{
        var geojson;
        geojson = L.geoJSON(data, {style: style, onEachFeature: onEachFeature}).addTo(map);


        function highlightFeature(e) {
            var layer = e.target;
        
            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });
        
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge ) {
                layer.bringToFront();
            }

            info.update(layer.feature.properties);
            }

            function resetHighlight(e) {
                geojson.resetStyle(e.target);
                info.update();
            }


            function zoomToFeature(e) {
                map.fitBounds(e.target.getBounds());
            }
        
            function onEachFeature(feature, layer) {
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: zoomToFeature
                });
            }

        var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
        };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
    this._div.innerHTML = '<h4>INTERACTIVE CORONAVIRUS MAP</h4>' +  (props ?
        '<b>' + props.EER13NM + '</b><br />' + props.cases + ' current cases'
            : 'Hover over a state');
            };

    info.addTo(map);


    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
    
    
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 100, 200, 400, 500, 600, 700, 800],
        labels = [];

    // loop through density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
        '<i style="background:' + colorSet(grades[i] + 1) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
    };

    legend.addTo(map);

    });
    
    

    
}

        
function colorSet(data) {
    return  data > 750 ? '#8c2d04':
            data > 650 ? '#cc4c02':
            data > 500 ? '#ec7014':
            data > 300 ? '#fe9929':
            data > 200 ? '#fec44f':
            data > 100 ? '#fee391':
                        '#ffffd4';
}


function style(feature) {
    return {
        fillColor: colorSet(feature.properties.cases),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}



var mapboxAccessToken = "pk.eyJ1Ijoic2Vsb3Jta2F3IiwiYSI6ImNrazZzMDlqMTA2ejMydm12cnh1ZzB0ZG4ifQ.lXNupwjyl178sQ1YFojSvA";
var map = L.map('mapid').setView([53.5095, -2.1245], 6);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
    //attribution: ...,
    tileSize: 512,
    zoomOffset: -1
    }).addTo(map);


fetchJSON('Areas/UKtopojson.geojson')