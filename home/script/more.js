/**
 * Triggers an event listener when the DOM has loaded
 * When User clicks submit form button triggers the @function getUserInfo function
 * @event click 
 */
document.addEventListener('DOMContentLoaded', ()=> {

    document.getElementById('btn').addEventListener('click', getUserInfo)
    
})

/**
 * Defines the graph
 * @type {object}
 */
var Graph;

/**
 * Class to create chart, calculate the number of cases, deaths and recoveries, select available hospitals
 * @class
 */
class Info {

    /**
     * @param {string} urlCase - String that defines the path of the JSON file which contains data about the number of cases,recoveries,deaths at a specific area
     * @param {number} age - Takes the age of the User
     * @param {string} urlAid -String that defines the path of the JSON file which contains data about the hospitals in that area
     */
    constructor(urlCase,age,urlAid) {

        /**
         * @property {string} urlCase - Path of JSON file containing COVID data on specific location
         */
        this.urlCase = urlCase;
        /**
         * @property {number} age - Age of User
         */
        this.age = age;
        /**
         * @property {string} urlCase - Path of JSON file containing Hospitals available on specific location
         */
        this.urlAid = urlAid
}   
    /**
     * Draw chart, calculate risk, Obtain number of deaths, cases & recoveries, obtain available hospitals
     * @param {string} area Location of the user
     * @method getData
     * @link info
     */
    getData(area){
        /**
         * Retrieves hospital location data from server
         */
        fetch(this.urlAid)
        /**
         * @param {Object} data  Response containing data about the number of deaths,cases, recoveries at a specific location
         * @return {Promise} data.json - Returns this data in json format
         */
        .then(data => {
            return data.json()
        })
        /**
         * @param {Object} json - Contains json data of locations cases,deaths and recoveries
         */
        .then(json =>{
            /**
             * i - Counter for the for loop
             * @type {number} 
             */
            var i;
            /**
             * lists - Will contain list of hospitals in the area
             * @type {HTMLElement}
             * @private
             */
            var lists = document.getElementById("hospitals");
            /**
             * Name of hospital, and location (Placed within tags to be added to HTML)
             * @type {string} 
             */
            var hospital = ""
            /** Loop through the json data and add location */
            for (i = 0; i < json[area].length; i ++){
                /**
                 * hospitalList -Name of hospital (To be placed in <li> tags )
                 * @type {string} 
                 */
                var hospitalList = json[area][i];
                hospital += "<li>" + hospitalList + "</li>"

            }

            /** Embed hospital list to HTML  */
            lists.innerHTML = hospital;
        })

        fetch(this.urlCase)
        .then(data => {
            return data.json()
        })
        .then(json =>{
            /**
             * Cases - Lists of number of cases over a period of time
             * @type {number}
             * @memberof getData 
             */
            let Cases =[]
            /**
             * date - Dates of measured data within a certain time frame
             * @type {string} 
             * @memberof getData
             */
            let date = [] 
            /**
             * recovery - Lists of number of recoveries over a period of time
             * @type {number} 
             * @memberof getData
             */
            var recovery = [];
            /**
             * deaths - Lists of number of deaths over a period of time
             * @type {number} 
             * @memberof getData
             */
            var deaths = [];
            /**
             * i - Counter for the for loop
             * @type {number} 
             * @memberof getData
             */
            var i;
            
            /**
             *Loop through json array and separate data into predefined list to be used in chart
             */
            for (i = 0; i < json.length; i++) {
                            Cases.push(json[i].cases);
                            date.push(json[i].month);
                            recovery.push(json[i].recovery);
                            deaths.push(json[i].deaths)
                            }
            

            /**
             * Canvas that draws map in HTML
             * @type {HTMLElement}
             */
            var ctx = document.getElementById('myChart').getContext('2d');

            /**
             * Contains properties needed to draw maps
             */
            var opt = {type: 'line',
                        data: {
                            labels: date,
                            datasets: [{
                                label: 'Cases per month',
                                data: Cases,
                                backgroundColor:'rgba(255, 99, 132, 0.2)',
                                fill: 'false',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    }
            
            /**
             * Check if Graph is initially defined 
             * If defined delete canvas to avoid drawing new chart on top of the old one
             */

            if(window.Graph != undefined){
                window.Graph.destroy();
            }
                
            
            /**
             * Defines a new instance of the chart 
             */
            Graph = new Chart(ctx, opt);

            /**
             * Calculates sum of cases in the Cases array
             * @type {number} 
             */
            var casesSum = Cases.reduce((x, y) => x + y);
            /**
             * Calculates sum of recoveries in the recovery array
             * @type {number} 
             */
            var recoveriesSum = recovery.reduce((x, y) => x + y);
            /**
             * Calculates sum of deaths in the deaths array
             * @type {number} 
             */
            var deathsSum = deaths.reduce((x, y) => x + y);
            /**
             * HTML Element to display how vulnerable the user is
             * @type {HTMLElement}
             */
            var text = document.getElementById('risk');
            
            /**
             * risk -Calculate how vulnerable you are to COVID-19 
             * @type {number}
             * @memberof getData
             */
            var risk = (this.age/10) * casesSum

            /**
             * Check if the user has input is valid (User's age)
             * If valid check how vulnerable the user is and return appropriate response
             */
            if (Number.isInteger(parseInt(this.age))){
                if (risk >= 8000){
                    text.innerHTML = 'VERY HIGH';
                    text.style.color='purple';
                }
                else if (risk >= 5000){
                    text.innerHTML = 'HIGH';
                    text.style.color='red';
                }
    
                else if (risk >= 3000){
                    text.innerHTML = 'MODERATE';
                    text.style.color='orange';
                }
    
                else{
                    text.innerHTML = 'LOW';
                    text.style.color='green'; 
                }
            }
            /**
             * Return alert if user's age input isnt valid
             */
            else{
                alert('Please enter in a valid age. Thank you!!')
            }
            
            


            document.getElementById('recCases').innerHTML = casesSum;
            document.getElementById('recovery').innerHTML = recoveriesSum;
            document.getElementById('deaths').innerHTML = deathsSum;
        })   
    }   
}

/**
 * @property {Function} getUserInfo - Obtain user input from form
 * This function is triggered when the user Clicks on the submit button.
 * When the submit button is clicked it returns a form to the server and reloads the page.
 * However since this project is solely based on Client side when we press the submit button
 * the page reloads and we lose data.
 * To avoid this we added @function [preventDefault] to stop the submit button from automatically
 * reloading the page and losing the data.
 * We then obtain the input values from the input values and trigger certain functions depending
 * on the Users choice.
 * @param {MyEvent} ev -This is an event that submits the userform to a server and reloads the page.
 * @returns {method} Returns the method of a new instance 
 */
const getUserInfo = (ev) =>{
    ev.preventDefault();
    /**
     * User
     * @typedef {Object} UserInfo
     * @property {string} name - Users name (Optional)
     * @property {number} age - User age
     * @property {number} area - User area represented by a specific number code
     * Obtains the value of the name, age and area of the User
     * Each area is assigned to a value number. From that number we 
     * can decide what information to return to the user.
     */

     /**
      * @type {UserInfo}
      */
    let UserInfo = {
        name : document.getElementById('name').value,
        age : document.getElementById('age').value,
        area: document.getElementById('inputGroupSelect01').value
    }
    
    /**
     * Check the Area of user.
     * Each area is represented by a number
     * From the User choice create a new instance for the user and trigger @function getData 
     */
    if (UserInfo.area == 1){
        new Info('./Areas/northeast.json',UserInfo.age,'./Areas/hospitals.json').getData('northeast')
    }

    if (UserInfo.area == 2){
        new Info('./Areas/northwest.json',UserInfo.age,'./Areas/hospitals.json').getData('northwest')
    }

    if (UserInfo.area == 3){
        new Info('./Areas/yorkshire.json',UserInfo.age,'./Areas/hospitals.json').getData('yorkshire')
       
    }

    if (UserInfo.area == 4){
        new Info('./Areas/westmidlands.json',UserInfo.age,'./Areas/hospitals.json').getData('westmidlands')
    }

    if (UserInfo.area == 5){
        new Info('./Areas/eastmidlands.json',UserInfo.age,'./Areas/hospitals.json').getData('eastmidlands')
    }

    if (UserInfo.area == 6){
        new Info('./Areas/eastofengland.json',UserInfo.age,'./Areas/hospitals.json').getData('eastofengland')
    }

    if (UserInfo.area == 7){
        new Info('./Areas/london.json',UserInfo.age,'./Areas/hospitals.json').getData('london')
    }

    if (UserInfo.area == 8){
        new Info('./Areas/southeast.json',UserInfo.age,'./Areas/hospitals.json').getData('southeast')
    }

    if (UserInfo.area == 9){
        new Info('./Areas/southwest.json',UserInfo.age,'./Areas/hospitals.json').getData('southwest')
    }
}

/**
 * @license https://opensource.org/licenses/MIT ,MIT license
 * [Source Code] https://www.chartjs.org/docs/latest/charts/bar.html
 */





    