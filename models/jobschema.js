const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobschema = new Schema({
    resume: String,
    skillset1: String,
    exp1: String,
    skillset2: String,
    exp2: String,
    skillset3: String,
    exp3: String,
    skillset4: String,
    exp4: String,
    skillset5: String,
    exp5: String,
});

module.exports = mongoose.model('Jobschema', jobschema);