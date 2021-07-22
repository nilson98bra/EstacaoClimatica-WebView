const { DatasetController } = require('chart.js');
const express = require('express'); 
const router = express.Router();
const Influxdb = require('influxdb-v2');
const Moment = require('moment');
async function values(start,end,param) {

    const influxdb = new Influxdb({
        host: '52.191.8.121',
        port: 8086,
        protocol: 'http',
        token: 'cVyV1G8DxT1jGK6wS--Ibvbe1TNPsYtgOOeON1Rv07gVc4_0wGn0U9I3SseENzi-IT1XmqPnm6ubugQ_8Hh6qw=='
    });
        let result
        if(param === "Temperatura"){

            const valores = await influxdb.query(
                { orgID: '0f616107822aece2' },
                { query: `from(bucket: "measurements") |> range(start: ${start}, stop: ${end}) |> filter(fn: (r) => r._measurement == "mqtt_consumer" and r._field == "payload_fields_temperatura" )` }    
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
                { query: `from(bucket: "measurements") |> range(start: ${start}, stop: ${end}) |> filter(fn: (r) => r._measurement == "mqtt_consumer" and r._field == "payload_fields_umidade" )` }    
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
                { query: `from(bucket: "measurements") |> range(start: ${start}, stop: ${end}) |> filter(fn: (r) => r._measurement == "mqtt_consumer" and r._field == "payload_fields_pressao" )` }    
            );
            result = valores[0].map((atual,index)=>{
            return {
                x:Moment(atual["_time"]).format('DD/MM/YYYY HH:mm'),
                y:atual["_value"]
            }
            })
        }

return result

}
 
  

router.get('/:parametro/:start/:end/',(req,res)=>{
    let start = req.params.start
    let end = req.params.end 
    let param = req.params.parametro
    values(start,end,param).then((result)=>{
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
    })
    
 
});

module.exports = router