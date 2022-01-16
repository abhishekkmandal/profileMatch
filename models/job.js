const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    jobtitle: String,
    jobdesc: String,
    dept: String,
    skillset1: String,
    exponskillset1: String,
    skillset2: String,
    exponskillset2: String,
    skillset3: String,
    exponskillset3: String,
    skillset4: String,
    exponskillset4: String,
    skillset5: String,
    exponskillset5: String,
    Musthaveskillset1: String,
    Musthaveskillset2: String,
    expiry: Date,
    status: String
});

module.exports = mongoose.model('Job', jobSchema);