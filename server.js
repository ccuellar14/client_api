'use strict'

const Hapi = require('hapi');
const Request = require('request');
const Vision = require('vision');
const Handlebars = require('handlebars');
const LodashFilter = require('lodash.filter');
const LodashTake = require('lodash.take');

const server = new Hapi.Server();

server.connection({
   host: 'localhost',
   port: 3000
});

// Register vision for our views
server.register(Vision, (err) => {
   server.views({
       engines: {
           html: Handlebars
       },
       relativeTo: __dirname,
       path: './views',
   });
});

server.start((err) => {
   if (err) {
       throw err;
   }

   console.log('Server running at:', server.info.uri);
});

server . route ( { 
    method :   'GET' , 
    path :   '/' , 
    handler :   function   ( request ,   reply )   { 
        Request . get ( 'https://82yxm8sh2f.execute-api.us-west-2.amazonaws.com/dev/cursos/' ,   function   ( error ,   response ,   body )   { 
            if   ( error )   { 
                throw   error ; 
            } 

            const   data   =    JSON.parse (body); 
            reply . view ( 'index' ,   {   result :   data[0], result2: data[1]   } ) ; 
            console.log(data)
        } ) ; 
    } 
} ) ; 
