import React,{memo} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';
import {useHistory} from 'react-router-dom';
import {createMarkup} from '../../util';

function World({data}) {
    
    
 
 const history = useHistory();
 
    const renderImg =({image, description}) => (
        <div>
            <img src={image.url} alt={description} width="100%" />
        </div>
    )



    const openPost = (id) => {
         history.push(`/world/${id}`); //fun redirect p/ pagina de detalhes
    }

    
    const renderPost = (post, index) => {
        const {title, image, description, id} = post;
        const isFirst = index === 0;   
        const spanValue = isFirst ? 24 : 12;
        console.log(id);
       


       return (
           <Col span={spanValue} key={`world-${index}`} >
               <article onClick={() => openPost(id)}>
                    <p>
                        <strong dangerouslySetInnerHTML={createMarkup(title)}  />
                    </p>
                    <p dangerouslySetInnerHTML={createMarkup(description)} />
                    
                    {isFirst && renderImg({image, description})}    

               </article>
           </Col>
       )
    }


    return (
        <Row gutter={[16,16]}>
            {data?.map(renderPost)}
        </Row>
    );
}



  // indicando que a prop recebida é um array obrigatorio 



export default memo(World);