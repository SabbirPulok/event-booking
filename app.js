const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const app = express();

const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');

const isAuth = require('./middleware/is-auth');

const uri = process.env.DB_PATH.toString();

app.use(bodyParser.json());
app.use(isAuth);

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control_Allow-Methods','POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    if(req.method === 'OPTIONS')
    {
        return res.sendStatus(200); //ignore the request
    }
    next();
})
app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}));
const port =process.env.PORT || 3000;

mongoose.connect(uri,  { useNewUrlParser: true, useUnifiedTopology: true  })
.then(()=>{
    app.listen(port,()=>console.log("Listening to port ",port));
})
.catch(error => {
    console.log(error);
})
;