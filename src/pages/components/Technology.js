import React,{memo} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';
import {useHistory} from 'react-router-dom';
import {createMarkup} from '../../util';

function Technology({data}) {
 
 const history = useHistory();
 
    const renderImg =({image, description}) => (
        <div>
            <img src={image.url} alt={description} width="100%" />
        </div>
    )


    const openPost = (id) => {
         history.push(`/technology/${id}`); //fun redirect p/ pagina de detalhes
    }

    
    const renderPost = (post, index) => {
       const {title, image, description, id} = post;
       
       return (
           <Col span={12} md={6} key={`tech-${index}`} >
               <article onClick={() => openPost(id)}>
                    <p>
                        <strong dangerouslySetInnerHTML={createMarkup(title)}  />
                    </p>
                    <p dangerouslySetInnerHTML={createMarkup(description)} />

                    {image.url && renderImg({image, description})} {/*ternario pq nem toda resposta possui img */}

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

Technology.defaultProps = {
    data: []
}

Technology.propTypes = {
    data: PropTypes.array.isRequired  // indicando que a prop recebida é um array obrigatorio 
}


export default memo(Technology);