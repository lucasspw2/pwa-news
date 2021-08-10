const params = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    } 
}

const URL = 'https://stormy-brook-79548.herokuapp.com/api';
//const URL = 'http://localhost/api';

function getNews(subject){ //func fetch busca por assunto
    return fetch(`${URL}/${subject}` , params).then(response => response.json()) //convertendo a resposta da api
    .catch(error => console.log('ocorreu erro',error)) 
}


function getNewsById(subject, id){ //func p/ post(detalhe)
    return fetch(`${URL}/${subject}/${id}` , params).then(response => response.json()) //convertendo a resposta da api
    .catch(error => console.log('ocorreu erro',error)) 
}


export default {
    getNews,
    getNewsById
}