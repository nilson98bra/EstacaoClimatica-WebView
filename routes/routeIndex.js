const express = require('express'); 
const router = express.Router();
const Influxdb = require('influxdb-v2');
const Moment = require('moment');
async function values(start,end) {
let values = new Array();
    console.log(`${start} - ${end}`)
    const influxdb = new Influxdb({
        host: '52.191.8.121',
        port: 8086,
        protocol: 'http',
        token: 'cVyV1G8DxT1jGK6wS--Ibvbe1TNPsYtgOOeON1Rv07gVc4_0wGn0U9I3SseENzi-IT1XmqPnm6ubugQ_8Hh6qw=='
    });
    const temperatura = await influxdb.query(
    { orgID: '0f616107822aece2' },
    { query: `from(bucket: "measurements") |> range(start: 2021-06-29T00:55:00Z, stop: 2021-06-29T00:59:00Z) |> filter(fn: (r) => r._measurement == "mqtt_consumer" and r._field == "payload_fields_temperatura" )` }    
);

    temperatura[0].map((atual)=>{
        values.push({
            data: Moment(atual["_time"]).format('DD/MM/YYYY HH:mm'),
            valor: atual["_value"],

        })
    })

return values

}
 
  

router.get('/:start/:end/',(req,res,next)=>{
    let start = req.params.start
    let end = req.params.end 
    values(start,end).then((result)=>{
        res.render('../views/pages/home',{
            title: "Home",
            start:start,
            end:end,
            values: result
        });
    })
    
 
});

module.exports = router