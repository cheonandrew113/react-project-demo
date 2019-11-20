import React from 'react'

 
export function getData(){
    const promise = fetch("https://api.worldtradingdata.com/api/v1/history?symbol=MSFT&api_token=gdMSThs2CG5iSj5V9UUJro9n89E5rJ28CcbyW7W7LZcLrIGBGr8ilIr6fY7i")
        .then(response => response.json())
        .then(data => {
        
            let initialArrayOutput = []
            let finaleArrayOutput = initialArrayOutput.reverse()
            let dataObj = data["history"]
            // console.log(dataObj)
            for (var prop in dataObj){
                initialArrayOutput.push({open: parseInt(dataObj[prop]['open']), high: parseInt(dataObj[prop]['high']), low: parseInt(dataObj[prop]['low']), close: parseInt(dataObj[prop]['close']), volume: parseInt(dataObj[prop]['volume']), datetime: prop, date: new Date(prop)})
            }
            console.log(initialArrayOutput)
            console.log(finaleArrayOutput)
            return finaleArrayOutput
        })
            
    return promise;
}




// export default Data