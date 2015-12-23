import express from 'express';
import http from 'http';
import React from 'react';
import routes from './routes';
import {match,RoutingContext} from 'react-router';
import {renderToString} from 'react-dom/server';

const app = express();
app.use(express.static('public'));
app.set('view engine','ejs');

app.get('*',(req,res) => {
  match({routes,location:req.url},(err, redirectLocation,props) => {
     if(err) {
       res.status(500).send(err.message);
     } else if(redirectLocation) {
        res.redirect(302,redirectLocation.pathname +redirectLocation.search);       
     } else if(props) {
       const markup = renderToString(<RoutingContext {...props}/>);
       res.render('index',{markup});
     } else {
	res.sendStatus(404);
     }
  });

});

const server = http.createServer(app);
server.listen(3000);
server.on('listening',function(){
  console.log('Server is listening on port 3000');
});
