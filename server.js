const express = require('express');
const app = express();
const path = require('path');

//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));
app.use('/build/', express.static(path.join(__dirname, './build')));
app.use('/jsm/', express.static(path.join(__dirname, './three/examples/jsm')));

app.listen(4000, ()=>{
    console.log('visit http://www.funnylocks.com');
    //console.log('visit http://127.0.0.1:4000');
});
