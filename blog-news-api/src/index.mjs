import express from 'express';
import cors from 'cors';
import economy from './economy.json';
import technology from './technology.json'
import world from './world.json';


const GROUP_NEWS = {
    economy,
    technology,
    world
}

const app = express();

const PORT = process.env.PORT || 3001;


app.use(cors());

app.get('/api', function(req, res){ //busca todos p/ home
    res.status(200).json({economy,technology,world})});


app.get('/api/:subject', function(req, res){ //por categoria
    const {subject} = req.params; //pega assunto passado pela url
    res.status(200).json(GROUP_NEWS[subject]);
});

app.get('/api/:subject/:id', function (req, res){
    const {subject, id} = req.params;
    const allNews = GROUP_NEWS[subject].value;
    const News = allNews.find((New) => New.id === id);
    res.json(News);
})

app.listen(PORT, function(){
    console.log(`servidor rodando na porta ${PORT}`);
})

