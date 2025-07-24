const http = require('http');

const routes = require('./routes');

const app = express()

app.use((req,res,next)=>{
    res.send()
    next()
})

app.listen(3000);
