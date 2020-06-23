const express = require("express")
const app = express();
const config = require('config');
const PORT = config.get("port") || 3000;
const mongoose = require('mongoose')
const auth = require('./middleware/auth.js');
const id = require('./middleware/id.js');
const Counter = require('./models/counter.js');

app.use(express.json({extended: true}))
app.use((req, res, next)=> {
        res.header('Access-Control-Allow-Origin',  "*");
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers', 'content-type, JWT');
        req.header('Access-Control-Allow-Origin',  "*");
        req.header('Access-Control-Allow-Methods', '*');
        req.header('Access-Control-Allow-Headers', 'content-type, JWT');
        next(); 
    })

async function start (){
    try{
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser :true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT,()=>console.log('app started on port ' + PORT))
    } catch (e) {
        console.log("server error",e.message);
        process.exit(1);
    }
}

app.use('/api',          [id],       require('./routes/create/user.js'));
app.use('/api/auth',     [],         require('./routes/auth/auth.routes.js'));
app.use('/api/auth',     [auth] ,    require('./routes/userData.js'));
app.use('/api/create',   [auth,id],  require('./routes/create/project.js'));
app.use('/api/create',   [],         require('./routes/create/task.js'));
app.use('/api/create',   [auth,id],  require('./routes/create/comment'));
app.use('/api/create',   [auth,id],  require('./routes/create/invite'))
app.use('/api/get',      [auth],     require('./routes/get/projects.js'));
app.use('/api/transfer', [auth],     require('./routes/transfer/accept_invite'));
app.use('/api/transfer', [auth],     require('./routes/transfer/taskBetweenTaskLists'));
app.use('/api/transfer', [auth],     require('./routes/transfer/take_task'));
app.use('/api/delete',   [auth],     require('./routes/delete/reject_invite'));
app.use('/api/delete',   [auth],     require('./routes/delete/task'));
app.use('/api/delete',   [auth],     require('./routes/delete/project'));
app.use('/api/delete',   [auth],     require('./routes/delete/comment'))
start();