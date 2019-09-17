
var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
var app = express();
var mongoose=require('mongoose');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
var api = require('./api/api');
app.use('/api', api);

app.use(express.static(__dirname + '/build'));


app.get('/',function(req,res){
    res.sendFile(__dirname+'/boilerplate.html');
  })

  // app.get('/', function(req, res){
  //   res.render('/Users/Iman/Desktop/reveal/reveal.js/index.html', {
  //     title: 'Consolidate This'
  //   })
  // })
  mongoose.connect('mongodb+srv://imand:iman.123@cluster0-aet92.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
    if (!err)
        console.log('Connected to Mongo');
        else {
            console.log(err)
        }
})

// mongoose.connect('mongodb+srv://imandz:iman@meduni-vneye.mongodb.net/medUniAdmin?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
//     if (!err)
//         console.log('Connected to Mongo - MedUniAdmin');
//         else {
//             console.log(err)
//         }
// })

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
