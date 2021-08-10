import React,{memo, useCallback, useEffect, useState} from 'react';
import { Link, useHistory, useParams  } from 'react-router-dom';
import { Row, Col } from 'antd';
import api from '../../api';
import {createMarkup} from '../../util';
import Actions from '../components/Actions'; //compartilhar

 function Post() {
 
    const {subject, id} = useParams(); //recebendo os valores passados pela url
    const [data, setData] = useState([]); //fetch com posts
    const [post, setPost] = useState({}); //fetch post
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const renderImg = ({image, description}) => <img src={image.url} alt={description} width="75%" />



    const handleNews = useCallback((response) => { //  useCallback porque a funcao esta dentro do useEffect / cache dos valores
       setData(response[0]?.value);
       setPost(response[1]?.value);
    }, []); 



    useEffect(() =>{
       setLoading(true); 

       Promise.allSettled([
           api.getNews(subject),
           api.getNewsById(subject, id)
       ]).then(handleNews)

       setLoading(false);


    }, [id, subject, handleNews]); //useEffect monitora os itens


    const renderDescription = (description) => <p dangerouslySetInnerHTML={createMarkup(description)} />

    const openPost = (id) => {
      history.push(`/${subject}/${id}`)
    }

    const renderPost = (post, index) => {
      const {title, image, description, id} = post;

   return(
      <Col span={12} key={`post-${index}`}> 
         <article onClick={ () => openPost(id) }>
            <p>
               <strong dangerouslySetInnerHTML={createMarkup(title)} />
            </p>
            {image?.url ? renderImg({image, description}) : renderDescription(description)}

         </article>
      </Col>
   )
}

   if(loading) return <div>Carregando...</div> //ideal não ter muitos return

   if(!post?.id) return null;

   const {title, description, image, body, datePublished } = post;

    return (
   <div>
      <Link to="/">Back</Link> 
      <Actions post={post} subject={subject}/>
      <Row gutter={[16, 16]} >
         <Col span={24} md={16}> 
            <p>{datePublished}</p>
            <h1 dangerouslySetInnerHTML={createMarkup(title)} />
            {image.url && renderImg({image, description})}
            <p className="text" dangerouslySetInnerHTML={createMarkup(description)}/>
            <hr />
            <p className="text" dangerouslySetInnerHTML={createMarkup(body)}/>
         </Col>
         <Col span={24} md={8}>
            <Row gutter={[16,16]}>
               {data?.value?.map(renderPost)}

            </Row>
         </Col>
      </Row>

   </div>
 );
}


export default memo(Post);