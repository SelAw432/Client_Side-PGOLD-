// ____________________________Scrolling Reveal Functionality__________________________

var Scroll = window.requestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback,1000/60)
    };



var elementsToShow = document.querySelectorAll('.scrolling');

function loop(){
    elementsToShow.forEach(function(element){
        if (isElementInViewport(element)){
            element.classList.add('is-visible');
        }
        else {
            element.classList.remove('is-visible')
        }
    });
    Scroll(loop)
}

loop();

function isElementInViewport(element){
    if (typeof jQuery === "function" && element instanceof jQuery){
        element = element[0]
    }

    var rect = element.getBoundingClientRect();

    return(
        (rect.top <= 0
            && rect.bottom >= 0)
            ||

    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight))&&
    (rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0
        && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
             
    );   
}

    
// ________________________________________D3 Graphing________________________________________

function cases(){
    yValue = d => d.cases;
    var ylabl = "cases";
    

    d3.select("svg").remove();
    fetch('CovidData.json')
    .then(data => {
    return data.json()
    })
    .then(json =>{
    create(json,ylabl)
    console.log(json)
    })
}

function deaths(){
    yValue = d => d.deaths;
    var ylabl = "deaths";
    

    d3.select("svg").remove();
    fetch('CovidData.json')
    .then(data => {
    return data.json()
    })
    .then(json =>{
    create(json,ylabl)
    console.log(json)
    })
}

function recovery(){
    yValue = d => d.recovery;
    var ylabl = "recovery";
    

    d3.select("svg").remove();
    fetch('CovidData.json')
    .then(data => {
    return data.json()
    })
    .then(json =>{
    create(json,ylabl)
    console.log(json)
    })
}



let yValue = d => d.deaths;
var ylabl = "death";

fetch('CovidData.json')
.then(data => {
    return data.json()
})
.then(json =>{
    create(json,ylabl)
    console.log(json)
})


const create = (data,ylabl) => {
   

    
    var width = 800;
    var height = 400;
    const margin = {top: 30, right: 0, bottom: 30, left: 40};

    const svg = d3.select(".svg")
            .append('svg')
            .attr("viewBox", [0, 0, width, height])
            .attr('width', width - margin.left - margin.bottom)
            .attr('height', height - margin.top - margin.bottom)
            .attr('class', 'chartbox');
            
            
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, yValue)])
        .range([height-margin.bottom, margin.top]);
        

    const xScale = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([margin.left, width - margin.right])
        .padding(0.1);
    

    function xAxis(g){
        g.call(d3.axisBottom(xScale).tickFormat(i => data[i].month))
         .attr("transform", `translate(0,${height - margin.bottom})`)
         .attr('font-size', '5px');
        
    }

    function yAxis(g){
        g.call(d3.axisLeft(yScale).ticks(null, data.format))
         .attr("transform", `translate(${margin.left},0)`)
         .attr('font-size', '5px');
        
    }
        

    svg.append('g')
        .attr('fill','rgb(255, 229, 157)')
        .selectAll('rect')
        .data(data)
        .join('rect')
            .attr("x", (d, i) => xScale(i))
            .attr('y', d => yScale(yValue(d)))
            .transition().duration(1000)
            .attr('height', d => yScale(0) - yScale(yValue(d)))
            .attr('width', xScale.bandwidth())
            .attr('class', 'rectangle');
    
    svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height - 2)
            .text("months")
    
    
    svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", 1)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text(ylabl);
            

    svg.append('g')
        .transition().duration(1000)
        .attr('class','x Axis')
        .call(xAxis);
    
    svg.append('g')
        .transition().duration(1000)
        .attr('class','y Axis')
        .call(yAxis);

}


function responsive(){
    var icon= document.getElementsByClassName('navbar')

    if (icon.className === 'navbar'){
        icon.className +='responsive';
    } else{
        icon.className = 'navbar';
    }
}