let interval = {}; 


function maximiseProfit(prices) {

    console.log("maximiseProfit")
    var lens = prices.length;
    if(lens ==0)    
        return;

    var count = 0;
    const intervals = [];

    var i=0;

    while(i<lens - 1) {

        while ((i < lens - 1) && (prices[i + 1] <= prices[i]))
            i++;

        if (i == lens - 1)
            break;

        interval["buy"]= i++;

        while ((i < lens) && (prices[i] >= prices[i - 1]))
                i++;

        interval["sell"]= i-1 ;

        intervals.push(interval);
        count++;
    }//outer while

    if (count == 0)
        console.log("There is no day when buying the stock "+ "will make profit");

    else  {
        for (var j = 0; j < count; j++) {
       
           
            var daytoBuy = intervals[j]["buy"];
            var dayToSell = intervals[j]["sell"];
            console.log("(" + daytoBuy + "," + dayToSell + ")");
        }
    }

    return;
}

maximiseProfit([100,180,260,310,40,535,695]);
