const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const mongoose = require('mongoose');
const Job = require('./models/job');
const Jobschema = require('./models/jobschema');

//const dbUrl = process.env.DB_URL || 'mongodb+srv://abhishek123:abhishek123@interviewex.nkexl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbUrl = 'mongodb://localhost:27017/jobs';
//const dbUrl = 'mongodb+srv://abhishek123:abhishek123@cluster0.ctegg.mongodb.net/interviewex?retryWrites=true&w=majority'
//const dbUrl = process.env.DB_URL || 'mongodb+srv://abhishek123:abhishek123@cluster0.ctegg.mongodb.net/interviewex?retryWrites=true&w=majority';


mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

//logic check for mongoose connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/recruiter', async (req, res) => {
    const jobs = await Job.find({});
    //res.send(jobs);
    res.render('recruiter/index', { jobs });
});

app.get('/recruiter/new', (req, res) => {
    res.render('recruiter/new');
});

app.post('/recruiter', async (req, res) => {
    //if (!req.body.interview) throw new ExpressError('Invalid Interview data', 400);
    const job = new Job(req.body);
    //console.log(job);
    await job.save();
    //res.send(job);
    //res.render('recruiter/show', { job });
    res.redirect(`/recruiter/${job._id}`);
});

app.get('/recruiter/:id', async (req, res) => {
    const job = await Job.findById(req.params.id);
    //console.log(job);
    // const matched = await Jobschema.find({
    //     "skillset1": { "$in": [job.skillset] }
    //     // "skillset2": { "$in": [job.skillset] },
    //     // "skillset3": { "$in": [job.skillset] },
    //     // "skillset4": { "$in": [job.skillset] },
    //     // "skillset5": { "$in": [job.skillset] }
    // });

    const matched = await Jobschema.find({
        $and: [
            {
                $or: [
                    { "skillset1": { "$in": [job.Musthaveskillset1] } },
                    { "skillset2": { "$in": [job.Musthaveskillset1] } },
                    { "skillset3": { "$in": [job.Musthaveskillset1] } },
                    { "skillset4": { "$in": [job.Musthaveskillset1] } },
                    { "skillset5": { "$in": [job.Musthaveskillset1] } },
                ]
            }
            , {
                $or: [
                    { "skillset1": { "$in": [job.Musthaveskillset2] } },
                    { "skillset2": { "$in": [job.Musthaveskillset2] } },
                    { "skillset3": { "$in": [job.Musthaveskillset2] } },
                    { "skillset4": { "$in": [job.Musthaveskillset2] } },
                    { "skillset5": { "$in": [job.Musthaveskillset2] } },
                ]
            }
        ]

    });

    //console.log("MA");
    //console.log(matched);
    //res.send(matched);
    res.render('recruiter/show', { job, matched });
});


app.get('/jobseeker', (req, res) => {
    res.render('jobseeker/index');
    //const jobs = await Job.find({});
    //res.send(jobs);
    //res.render('jobseeker/index', { jobs });
});

app.post('/jobseeker', async (req, res) => {
    //if (!req.body.interview) throw new ExpressError('Invalid Interview data', 400);
    //res.send(req.body);
    const job = new Jobschema(req.body);
    //console.log(job);
    await job.save();
    //res.send(job);
    res.redirect(`/jobseeker/${job._id}`);
    //res.render('jobseeker/show', { job });
});

app.get('/jobseeker/:id', async (req, res) => {
    const job = await Jobschema.findById(req.params.id);
    const matched = await Job.find({
        $or: [
            { "skillset1": { "$in": [job.skillset1, job.skillset2, job.skillset3, job.skillset4, job.skillset5] } },
            { "skillset2": { "$in": [job.skillset1, job.skillset2, job.skillset3, job.skillset4, job.skillset5] } },
            { "skillset3": { "$in": [job.skillset1, job.skillset2, job.skillset3, job.skillset4, job.skillset5] } },
            { "skillset4": { "$in": [job.skillset1, job.skillset2, job.skillset3, job.skillset4, job.skillset5] } },
            { "skillset5": { "$in": [job.skillset1, job.skillset2, job.skillset3, job.skillset4, job.skillset5] } },
        ]
    });
    res.render('jobseeker/show', { matched, job });
});

app.get('/login', (req, res) => {
    res.render('users/login');
});

app.get('/register', (req, res) => {
    res.render('users/login');
});

app.all('*', (req, res) => {
    //next(new ExpressError('Page Not Found', 404));
    res.send('error');
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});