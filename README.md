# COVID-19 Informative Webpage

## Project Overview

- This Website provides users with information on Covid-19 in the UK. 
- Features:
    1. Contains an interactive map of positive cases in selected area
    2. Contains the latest news on Covid-19
    3. Contain Government guidance
    4. Contains graphs and a dashboard which integrates an algorithm to measure likeliness of contracting Covid.

**Contents**

The main home page is 'index.html'.  There are 5 subfolders
+ css - which contains the styling of the html pages.
+ script - which contains the javascript of all the pages. 
+ Area - which contains the json and geojson files. 
+ Images - which contains all the images of the html pages.
+ readme - contains the read me file.
    
## How To use:

##### 1. Clone the repository to your local machine
     gh repo clone SelAw432/Client_Side-PGOLD-

##### 2. Cd into the project directory

##### 3. Run the following command

##### 4. Open up web browser and go to home to navigate the website:

 


**IMPORTANT**: Please open this website using a local server. 

## index.html (HOME PAGE)

This is the home page of the Project. On this page you'll find the logo of the page
a navigation bar, a section for the latest news, top stories, a chart and some guidelines.


### LOGO
    - This is also the home button for the page. If you navigate to a different page, once you click
      the logo you will automatically return to the home page.


### NAVIGATION BAR 
    - This helps to navigate through the page

#### CARROUSEL
    - Contains positive messages to lighten up your day in these gloomy times

#### LATEST STORIES & TOP STORIES
    - Contains latest news and top stories on COVID
    - Click on text to navigate to new page containing article. 
    - Text of news is the hyperlink so clicking anywhere else would not navigate to the
    article
    - To aid this, to ensure you are on the right text, arrow below text transforms.


#### GRAPH/CHART (Statistics of COVID-19 in the UK)
    - Draws a bar chart of covid data on a specific time frame using d3 based on what user wants to plot
    - User can plot this by clicking button which switches bewtween graphs.
    - To see graphs based on region or where you are click on "View more"
    - This takes you to a different page

#### QUOTES
    - More humurous quotes to lighten up your mood

#### GUIDELINES
    - Showcases some government guidelines on COVID using scrolling animations 


## latestStories.html (Latest Stories PAGE)

**Remainder**: If you wish to navigate to the home page click on the logo found above

This page contains 3 news articles as seen in the home page.

Click on text to navigate to new page containing article. 
Text of news is the hyperlink so clicking anywhere else would not navigate to the
article.
To aid this, to ensure you are on the right text, arrow below text transforms.


Each of this stories is linked to these new html pages.
+   l1.html (UK has the highest Daily Death Rate in the World)
+   l2.html (TFL Cracksdown on Passengers not wearing masks)
+   l3.html (Nine police officers fined £200 for breaking lockdown rules in Cafe)

Each of these articles references at the footer of each page

## topStories.html (Top Stories PAGE)

**Remainder**: If you wish to navigate to the home page click on the logo found above

This page contains 3 news articles as seen in the home page.

Click on text to navigate to new page containing article. 
Text of news is the hyperlink so clicking anywhere else would not navigate to the
article.
To aid this, to ensure you are on the right text, arrow below text transforms.


Each of this stories is linked to these new html pages.
+   t1.html (New COVID-19 Variant: What we know)
+   t2.html (Prime Minister announces new nationwide Lockdown)
+   t3.html (New COVID-19 vaccine approved in the UK)

Each of these articles references at the footer of each page


## Economy.html (2021 UK Economic Outlook)

**Remainder**: If you wish to navigate to the home page click on the logo found above

This pages highlights the prediction of the UK economy in 2021. 
Contains images and references from where this information was obtained at the footer


## Travel.html (Travel Advice)

**Remainder**: If you wish to navigate to the home page click on the logo found above

This pages highlights UK governments guidlines on travelling. 
Contains reference from where this information was obtained at the footer

## more.html (Statistics of COVID Data based on region)

This page enables the user to check the following information based on the region he or she is.
+   Number of current deaths
+   Total number of deaths
+   Number of recoveries

It also displays a chart of the current cases within a certain period.

This data can only be displayed if the User enters his/her information into the form. The name input is optional however the others are mandatory.
Insert a valid age to avoid errors. These two help to calulate how vulnerable you are to covid. 

Click on sumbit when done to load data. When loaded information based on your location and age would be loaded. You can switch between locations to determine
your risk and find out more on the statistics of COVID in that area. Remember to always click submit after every new change imlplemented to load the new data.

A list of available hospitals in your location would also be loaded below. And how vulnerable you are is determined below the form as well. 

There is also a Map available. To view the map click on the mao button to navigate to a new webpage designed only to display a map of current covid cases in the UK.

To return back click on the back button found on top of the map.


## SCRIPTS

Please note all refereces and licenses are located at the bottom of the scripts.

All JSON datasets used to represent the trend were self-made and the data does not correlate with the data of the real world.

