/**
 * Store Mapbox token 
 * @type {string}
 */
let mapboxAccessToken = "pk.eyJ1Ijoic2Vsb3Jta2F3IiwiYSI6ImNrazZzMDlqMTA2ejMydm12cnh1ZzB0ZG4ifQ.lXNupwjyl178sQ1YFojSvA";

/**
 * Intializes the map and set coordinates and zoom level
 * @type {Object}
 */
let map = L.map( "mapid" ).setView( [ 53.5095, -2.1245 ], 6 );

/**
 * Sets mapbox street tile layer
 */
L.tileLayer( `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`, {
  id: "mapbox/light-v9",

  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  tileSize: 512,
  zoomOffset: -1
} ).addTo( map );

fetchJSON( "./Areas/UKtopojson.geojson" );

/**
 * Function retrieves geojson file and creates interactive map
 * @param {string} url -Indicates path of geojson file for the map of the UK
 */
function fetchJSON ( url ) {
  let info;

  /**
   * Return geojson file
   * @type {function} 
   */
  return fetch( url )
    .then( response => response.json() )
    .then( data => {
      let geojson;
      /**
       * Append geojson to map
       */
      geojson = L.geoJSON( data, { style, onEachFeature } ).addTo( map );

      /**
       * Makes map interactive by highlighting regions of the map you hover over 
       * @param {event} e Mouseover event listener
       */
      function highlightFeature ( e ) {
        /**
         * Defines the area we hover over
         */
        const layer = e.target;

        /**
         * Adds styling to areas you hover over
         * Makes a thick grey border around area
         */
        layer.setStyle( {
          weight: 5,
          color: "#666",
          dashArray: "",
          fillOpacity: 0.7
        } );

        /**
         * Brings chosen area to the front adding a bit of interactivity if browser is not IE, Opera or Edge. 
         * As these have problems on those specific browsers
         */
        if ( !L.Browser.ie && !L.Browser.opera && !L.Browser.edge ) {
          layer.bringToFront();
        }

        info.update( layer.feature.properties );
      }

      /**
       * Resets the style to the default style
       * @param {event} e Functions is triggered when mouse is moved out or no longer hovering over it
       */
      function resetHighlight ( e ) {
        geojson.resetStyle( e.target );
        info.update();
      }

      /**
       * Zooms into map area when clicked on
       * @param {event} e This is a click listener
       */
      function zoomToFeature ( e ) {
        map.fitBounds( e.target.getBounds() );
      }
      
      /**
       * Adds listeners to each of the states
       * Called once for each created feature 
       */
      function onEachFeature ( feature, layer ) {
        layer.on( {
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
        } );
      }

      info = L.control();
      info.onAdd = function ( map ) {
        
        /** create a div with a class "info" */ 
        this._div = L.DomUtil.create( "div", "info" ); 
        this.update();
        return this._div;
      };

      /** update the control based on feature properties passed */ 
      info.update = function ( props ) {
        this._div.innerHTML = `<h4>INTERACTIVE CORONAVIRUS MAP</h4>${props ? `<b>${props.EER13NM}</b><br />${props.cases} current cases` : "Hover over a state"}`;
      };

      info.addTo( map );

      const legend = L.control( { position: "bottomright" } );

      /**
       * Creates a static legend for the map
       * @param {Object} map Contains the 
       */
      legend.onAdd = function ( map ) {
        const div = L.DomUtil.create( "div", "info legend" );
        const grades = [ 0, 100, 200, 400, 500, 600, 700, 800 ];
        const labels = [];

        /**
         * Helps create key by generating a colored square for each interval
         */
        for ( let i = 0; i < grades.length; i++ ) {
          div.innerHTML += `<i style="background:${colorSet( grades[ i ] + 1 )}"></i> ${
            grades[ i ]}${grades[ i + 1 ] ? `&ndash;${grades[ i + 1 ]}<br>` : "+"}`;
        }

        return div;
      };

      legend.addTo( map );
    } );
}
/**
 * Picks colour of region/area depending on the number of COVID cases
 * @param {number} data Number of cases in specified location
 * @returns {string} Colour of region
 */
function colorSet ( data ) {
  return data > 750? "#8c2d04"
  : data > 650 ? "#cc4c02"
      : data > 500 ? "#ec7014"
         : data > 300 ? "#fe9929"
           : data > 200 ? "#fec44f"
             : data > 100 ? "#fee391"
               : "#ffffd4";
}

/**
 * Implements styling to the map by setting the colours of the region depending on number of cases, strokes and some other finishing touches
 * @param {Object} feature Feature object in Geojson file of the map of the UK
 * @returns {Object} Styling properties of map
 */
function style ( feature ) {
  return {
    fillColor: colorSet( feature.properties.cases ),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7
  };
}

/**
 * @see leafletjs Version 1.7.1 [Source Code] https://leafletjs.com/examples/choropleth/
 */