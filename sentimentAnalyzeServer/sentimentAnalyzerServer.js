const express = require('express');
const dotenv = require('dotenv');
const bp = require('body-parser')
dotenv.config();

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
        });
        return naturalLanguageUnderstanding
    }

const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.use(express.json());
app.use(express.urlencoded());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const analyzeParams = {
        'url' : req.query.url,
        'features': {
        'emotion': {
            }
        }       
    };

    const nlu = getNLUInstance();

    nlu.analyze(analyzeParams)
        .then(analysisResults => {
            emotion = analysisResults.result.emotion.document.emotion
            // emotion = JSON.stringify(analysisResults.result.emotion.document.emotion, null, 2)
            // temp = JSON.stringify(analysisResults, null, 2)
            console.log(emotion);
            return res.send(emotion);
        })
        .catch(err => {
            console.log('error:', err);
            return res.send('error');
        });
});

app.get("/url/sentiment", (req,res) => {
    const analyzeParams = {
        'url' : req.query.url,
        'features': {
        'sentiment': {
            }
        }       
    };

    const nlu = getNLUInstance();

    nlu.analyze(analyzeParams)
        .then(analysisResults => {
            sentiment = analysisResults.result.sentiment.document
            console.log(sentiment);
            return res.send(sentiment);
        })
        .catch(err => {
            console.log('error:', err);
            return res.send('error');
        });
    
});

app.get("/text/emotion", (req,res) => {
    const analyzeParams = {
        'text' : req.query.text,
        'features': {
        'emotion': {
            }
        }       
    };

    const nlu = getNLUInstance();

    nlu.analyze(analyzeParams)
        .then(analysisResults => {
            emotion = analysisResults.result.emotion.document.emotion
            // emotion = JSON.stringify(analysisResults.result.emotion.document.emotion, null, 2)
            // temp = JSON.stringify(analysisResults, null, 2)
            console.log(emotion);
            return res.send(emotion);
        })
        .catch(err => {
            console.log('error:', err);
            return res.send('error');
        });
    
});

app.get("/text/sentiment", (req,res) => {
    const analyzeParams = {
        'text' : req.query.text,
        'features': {
        'sentiment': {
            }
        }       
    };

    const nlu = getNLUInstance();

    nlu.analyze(analyzeParams)
        .then(analysisResults => {
            sentiment = analysisResults.result.sentiment.document
            console.log(sentiment);
            return res.send(sentiment);
        })
        .catch(err => {
            console.log('error:', err);
            return res.send('error');
        });
    
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

