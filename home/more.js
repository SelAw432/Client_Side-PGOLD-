
document.addEventListener('DOMContentLoaded', ()=> {

    document.getElementById('btn').addEventListener('click', getUserInfo)
    
})

class Info {
    constructor(url,age) {
        this.url = url;
        this.age = age;
}   

    getData(){
        fetch(this.url)
        .then(data => {
            return data.json()
        })
        .then(json =>{
            let Cases =[]
            let date = [] 
            var recovery = [];
            var deaths = [];
            var i;
            

            for (i = 0; i < json.length; i++) {
                            Cases.push(json[i].cases);
                            date.push(json[i].month);
                            recovery.push(json[i].recovery);
                            deaths.push(json[i].deaths)
                            }

            
            makeChart(Cases,date)

            var casesSum = Cases.reduce((x, y) => x + y);
            var recoveriesSum = recovery.reduce((x, y) => x + y);
            var deathsSum = deaths.reduce((x, y) => x + y);
            var text = document.getElementById('risk');
            

            var risk = (this.age/10) * casesSum
            
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
            else{
                alert('Please enter in a valid age. Thank you!!')
            }
            
            


            document.getElementById('recCases').innerHTML = casesSum;
            document.getElementById('recovery').innerHTML = recoveriesSum;
            document.getElementById('deaths').innerHTML = deathsSum;
        })   
    }   
}

function makeChart(Cases,date){

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
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
    });
   };
    
makeChart()


const getUserInfo = (ev) =>{
    ev.preventDefault();
    let UserInfo = {
        name : document.getElementById('name').value,
        age : document.getElementById('age').value,
        area: document.getElementById('inputGroupSelect01').value
    }

    

    if (UserInfo.area == 1){
        new Info('Areas/northeast.json',UserInfo.age).getData()
    }

    if (UserInfo.area == 2){
        new Info('Areas/northwest.json',UserInfo.age).getData()
    }

    if (UserInfo.area == 3){
        new Info('Areas/yorkshire.json',UserInfo.age).getData()
       
    }

    if (UserInfo.area == 4){
        new Info('Areas/westmidlands.json',UserInfo.age).getData()
    }

    if (UserInfo.area == 5){
        new Info('Areas/eastmidlands.json',UserInfo.age).getData()
    }

    if (UserInfo.area == 6){
        new Info('Areas/eastofengland.json',UserInfo.age).getData()
    }

    if (UserInfo.area == 7){
        new Info('Areas/london.json',UserInfo.age).getData()
    }

    if (UserInfo.area == 8){
        new Info('Areas/southeast.json',UserInfo.age).getData()
    }

    if (UserInfo.area == 9){
        new Info('Areas/southwest.json',UserInfo.age).getData()
    }
}







    