const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://Daxerder:danebalto26@clusterdax.obisz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

let client;

module.exports = function(){
    if(!client){
        try{
            client = new MongoClient(uri, {userNewUrlParser:true, useUnifiedTopolgy:true});
        } catch(e){
            console.log("Error al conectarse a la BD ", e)
        }        
    }

    return client;
}