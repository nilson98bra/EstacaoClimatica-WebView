const { DatasetController } = require('chart.js');
const express = require('express'); 
const router = express.Router();
const Influxdb = require('influxdb-v2');
const Moment = require('moment');
function generateValues(nNumbers){
    const values = Array.from(Array(nNumbers).keys()).map(()=>{
      return Math.floor(Math.random() * nNumbers)
  })
  return values
  }
  
  
  
  
  function getDates (startDate, nDays) {
    const dates = []
    let aux=0
    for(let i=0; i<nDays; i++){
    
          let day = Moment(Moment(startDate, "DD-MM-YYYY").add(i, 'minutes')).format("YYYY-MM-DD HH:mm:ss")
          dates.push(day)
        }
      
      
    return dates
  }
  
  // Usage

async function valuesTest(){
    const dates = getDates(new Date("2017-06-22"), 240)
    const values = generateValues(240)
    const result = dates.map((curr,index)=>{
        return {x: curr,
                y: values[index]}
    })
    return result
}
async function values(start,end,param) {

   
   /* const influxdb = new Influxdb({
        host: '52.191.8.121',
        port: 8086,
        protocol: 'http',
        token: 'cVyV1G8DxT1jGK6wS--Ibvbe1TNPsYtgOOeON1Rv07gVc4_0wGn0U9I3SseENzi-IT1XmqPnm6ubugQ_8Hh6qw=='
    });
        let result
        if(param === "Temperatura"){

            const valores = await influxdb.query(
                { orgID: '0f616107822aece2' },
                { query: `from(bucket: "measurements") |> range(start: ${start}, stop: ${end}) |> filter(fn: (r) => r._measurement == "mqtt_consumer" and r._field == "uplink_message_decoded_payload_temperatura" )` }    
            );
            result = valores[0].map((atual,index)=>{
            return {
                x:Moment(atual["_time"]).format('DD/MM/YYYY HH:mm'),
                y:atual["_value"]
            }
            })
        }
        else if(param === "Umidade do Ar"){
            const valores = await influxdb.query(
                { orgID: '0f616107822aece2' },
                { query: `from(bucket: "measurements") |> range(start: ${start}, stop: ${end}) |> filter(fn: (r) => r._measurement == "mqtt_consumer" and r._field == "uplink_message_decoded_payload_umidade" )` }    
            );
            result = valores[0].map((atual,index)=>{
            return {
                x:Moment(atual["_time"]).format('DD/MM/YYYY HH:mm'),
                y:atual["_value"]
            }
            })
        }
        else{
            const valores = await influxdb.query(
                { orgID: '0f616107822aece2' },
                { query: `from(bucket: "measurements") |> range(start: ${start}, stop: ${end}) |> filter(fn: (r) => r._measurement == "mqtt_consumer" and r._field == "uplink_message_decoded_payload_pressao" )` }    
            );
            result = valores[0].map((atual,index)=>{
            return {
                x:Moment(atual["_time"]).format('DD/MM/YYYY HH:mm'),
                y:atual["_value"]
            }
            })
        }*/

return result

}
 
  

router.get('/:parametro/:start/:end',(req,res)=>{
    let start = req.params.start
    let end = req.params.end 
    let param = req.params.parametro
    let x = req.params.x
    let y = req.params.y
    /*values(start,end,param).then((result)=>{
        if(param == "Temperatura"){
            param = param + " (°)"
        }else if(param == "Umidade do Ar"){
            param = param + " (%)"
        }else{
            param = param + " (hPa)"
        }
        res.render('../views/pages/home',{
            title: "Home",
            start:start,
            end:end,
            result: JSON.stringify(result),
            parametro: JSON.stringify(param)
        });
    })*/

    valuesTest(start,end,param).then((result)=>{
       
        res.render('../views/pages/home',{
            title: "Home",
            start:start,
            end:end,
            result: JSON.stringify(result),
            parametro: JSON.stringify(param)
        });
    })


});

module.exports = router