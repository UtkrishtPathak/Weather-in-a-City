
//importing required libraries
require("dotenv").config();
const express       = require("express"),
      app           = express(),
      mongoose      = require("mongoose"),
      axios         = require("axios"),
      cors          = require('cors'),
      Weather       = require("./schema/weather.js");   

//database connection
mongoose.connect(process.env.MONGO_DB,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const db=mongoose.connection;
db.on("error",console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected");
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

//router for history
app.get("/history", async (req,res) => 
{
    const data = await Weather.find({}); //fetching all the data from database
    res.json(data); //sending the data as a response

})

//router for storing weather
app.post("/weather", async (req,res) =>
{
    //creating new record 
    var weather = new Weather(
        {
            Name: req.body.name,
            CurTemp:req.body.main.temp,
            MinTemp:req.body.main.temp_min,
            MaxTemp:req.body.main.temp_max,
            Pressure:req.body.main.pressure,
            Humidity:req.body.main.humidity,
            WindSpd:req.body.wind.speed,
            WindDeg:req.body.wind.deg,
            Visibility:req.body.visibility
        }
    );
    //storing the record
    await weather.save();

    //sending back a confirmation status
    res.sendStatus(200);
})


const port = process.env.PORT||1000;
app.listen(port, function()
{
    console.log("Running on port "+port);
});
