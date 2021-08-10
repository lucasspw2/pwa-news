import React,{memo, useEffect, useState} from 'react';
import {Row, Col} from 'antd';
import api from '../../api';
import Economy from '../components/Economy';
import World from '../components/World';
import Technology from '../components/Technology';

function Home(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false); //state p/ render condicional enquando busca response api

    //funcao recebe a res e repassa p/ state
    const handleNews = (articles) => {
        console.log('ar', articles);
        setData({
            world: articles[0]?.value.value, // (?) p/ nao deixar quebrar se nao existir a prop value
            economy: articles[1]?.value.value,
            technology: articles[2]?.value.value
        }); 
        setLoading(false);
    }


    useEffect(() =>{
        setLoading(true);
        //Promise.allSettled faz varias chamadas api, se alguma falhar nao quebra, chama o proximo
        Promise.allSettled([
            api.getNews('world'),
            api.getNews('economy'),
            api.getNews('technology')
        ]).then(handleNews); //passando a resposta p/ fun handleNews - resposta array com 3 posicoes                                           
        
    }, [])

    if(loading) return <div>Carregando...</div> //render enquanto executa fetch p/ nao tentar montar sem info api
       
    return(
        <div>
            <Row gutter={[16, 16]}>
                <Col span={24} md={16}>
                    <h2>World</h2>
                    <World data={data?.world} />

                </Col>
                <Col span={24} md={8}>
                    <h2>Economy</h2>
                    <Economy data={data?.economy}/>
                </Col>
            </Row>
            <hr />  
            <Row gutter={[16, 16]}>
                <Col span={24} >
                    <h2>Tecnology</h2>
                    <Technology data={data?.technology}/>
                </Col>
            </Row> 
        </div>
    )
}


export default memo(Home)