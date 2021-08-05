//importing required libraries
const mongoose = require("mongoose");

//defining the schema for storing records
const Schema = new mongoose.Schema(
    {
        Name:String,
        CurTemp:String,
        MinTemp:String,
        MaxTemp:String,
        Pressure:String,
        Humidity:String,
        WindSpd: String,
        WindDeg: String,
        Visibility:String
    }
);

module.exports = mongoose.model("Weather", Schema);