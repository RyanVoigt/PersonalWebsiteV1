    
//VALORANT ACT START AND END DATES

var startDate = new Date("10/13/2020");
var stopDate = new Date("1/13/2021"); 

document.getElementById("valorant_card").addEventListener("click", function(){
    var v = document.getElementById("frontpage");
    v.style.display = "none";
    var y = document.getElementById("valorantdata");
    y.style.display = "block";
    
});

var rankXP = [3000,7000,12000,18000,25000,33000,42000,52000,63000,75000,88000,102000,117000,133000,150000,168000,187000,207000,228000,250000,273000,297000,322000,348000,375000,403000,432000,462000,493000,525000,558000,592000,627000,663000,700000,738000,777000,817000,858000,900000, 943000, 987000, 1032000, 1078000, 1125000, 1173000, 1222000, 1272000, 1323000, 1375000];
var currentBattlePassLevel;
var currentBattlePassXP;
var totalXP = 1375000;
var totalDays = 90;
var currentDay = new Date(); 

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(formatDate(new Date (currentDate)));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month, day, year].join('/');
}

function convertFunction() {
    let cost = 0;
    let _points = document.getElementById("points").value;

    while (_points >= 11000) {
        cost += 99.99;
        _points -= 11000;
    }
    while (_points >= 5350) {
        cost += 49.99;
        _points -= 5350;
    }
    while (_points >= 3650) {
        cost += 34.99;
        _points -= 3650;
    }
    while (_points >= 2050) {
        cost += 19.99;
        _points -= 2050;
    }
    while (_points >= 1000) {
        cost += 9.99;
        _points -= 1000;
    }
    while (_points >= 475) {
        cost += 4.99;
        _points -= 475;
    }
    if (_points > 0) {
        cost += 4.99;
    }

    document.getElementById("dollars").value = "$" + cost;
}

function submitFunction() {
    currentBattlePassLevel = document.getElementById("Level").value;
    currentBattlePassXP = document.getElementById("XP").value;
    var currentDate = new Date(formatDate(currentDay));
    // To calculate the time difference of two dates 
    var Difference_In_Time = currentDate.getTime() - startDate.getTime(); 
    // To calculate the no. of days between two dates 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 

    actRange = getDates(startDate, stopDate);
    var actdays = (stopDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24); 

    var idealSumXP = totalXP/actdays;
    var currentXP = (rankXP[currentBattlePassLevel - 1] - currentBattlePassXP);
    var expectedXP = 0;
    var sumXP = (rankXP[currentBattlePassLevel - 1] - currentBattlePassXP)/Difference_In_Days
    var idealDayXP = 0;
    var idealXP = [];
    
    for(i = 0; i <= actdays; i++){
        idealXP.push(idealDayXP)
        idealDayXP += idealSumXP;
        if(i == Difference_In_Days - 1){
            expectedXP = idealDayXP;
        }
    }
    var dayXP = 0;
    var actualXP = [];
    for(i = 0; i <=Difference_In_Days; i++){
        actualXP.push(dayXP) 
        dayXP += sumXP;
    }
    var found = false
    var index = 0;
    var predictedFinalXP = sumXP*actdays;
    var predictedFinalLevel = 0;
    
    while(found == false){
        if(rankXP[index] < predictedFinalXP){
            index++
        }
        else{
            predictedFinalLevel = index;
            found = true;
        }
        if(index == 50){
            predictedFinalLevel = 50;
            found = true;
        }
    }
    var daysBehind = Math.round((expectedXP - currentXP)/sumXP);
    var totalXPBehind = Math.round((expectedXP - currentXP));
    var percentComplete = Math.floor(((currentXP/totalXP)*100));
    var percentCompleteIdeal = Math.floor(((expectedXP/totalXP)*100));
    var numberOfSpikeRush = Math.floor((expectedXP - currentXP)/1000)+1;
    document.getElementById('fillerID').style.width = percentComplete + '%';
    document.getElementById('fillerID2').style.width = percentCompleteIdeal + '%';
    console.log(percentCompleteIdeal)
    if(totalXPBehind > 0){
        document.getElementById('xpBehind').innerHTML = totalXPBehind;
        document.getElementById('xpstatustext').innerHTML = "XP Behind";
    }
    else{
        document.getElementById('xpstatustext').innerHTML = "XP Ahead";
        document.getElementById('xpBehind').innerHTML = (totalXPBehind*-1);
    }
    if(daysBehind > 0){
        document.getElementById('daysBehind').innerHTML = daysBehind;
        document.getElementById('daystatustext').innerHTML = "Days Behind";
    }
    else{
        document.getElementById('daystatustext').innerHTML = "Days Ahead";
        document.getElementById('daysBehind').innerHTML = (daysBehind*-1);
    }
    document.getElementById('predictedLevel').innerHTML = predictedFinalLevel;
    document.getElementById('percentageComplete').innerHTML = percentComplete + '%';
    var x = document.getElementById("dataID");
    x.style.display = "block";

    //-----------------------------------------------------------------
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {

        //IDEAL BATTLE PASS
        labels: actRange,
        datasets: [
            {
                label: 'Your XP',
                borderColor: '#3dc1d3',
                pointRadius: 0,
                data: actualXP
            },
            {
            label: 'Ideal XP',
            //backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            pointRadius: 0,
            data: idealXP
        }]
    },

    // Configuration options go here
    options: {}
});
}

