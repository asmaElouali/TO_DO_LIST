const express = require('express');
const ejs = require('ejs');
const app = express();
const session = require('express-session');
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

/*const tasks = [
    {
       title : 'apprendre a programmer',
       done : false
    },
    {
        title : 'apprendre a developper',
        done : false
    },
    {
        title : 'faire les courses',
        done : true,
    },
];*/

app.set('views engine','ejs');
app.get('/', (req, res)=>{
     if(!req.session.tasks){
        req.session.tasks = [];
     }
      res.render('todolist.ejs', {Tache : req.session.tasks});
});

app.post('/tache',(req,res)=>{
    req.session.tasks.push({
        title : req.body.task,
        done : true
        });
    res.redirect('/')
})
app.get('/task/:id/done',(req,res)=>{
    if( req.session.tasks[req.params.id]){
        req.session.tasks[req.params.id].done = false;
    }
    res.redirect('/');
    
})
app.get('/task/:id/delete',(req,res)=>{
    if( req.session.tasks[req.params.id]){
        req.session.tasks.splice(req.params.id, 1);
    }
    res.redirect('/');
})
app.listen(port,() => {
    console.log(`server connect at : ${port}`);
});