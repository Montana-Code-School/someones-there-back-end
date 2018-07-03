import mongoose, { Schema } from 'mongoose';


const DeviceSchema = new Schema({
    deviceId : String,
    platform : String
});

module.exports = mongoose.model('Device', DeviceSchema);
