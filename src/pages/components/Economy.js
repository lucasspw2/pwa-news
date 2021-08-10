import React,{memo} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';
import {useHistory} from 'react-router-dom';
import {createMarkup} from '../../util';

function Economy({data}) {
 
 const history = useHistory();
 
    const renderImg = ({image, description}) => (
        <img src={image.url} alt={description} width="100%" />
    )

    const renderDescription = (description) => (
         <p dangerouslySetInnerHTML={createMarkup(description)}  />  //dangerouslySetInnerHTML api retorna com html
    )

    const openPost = (id) => {
        history.push(`/economy/${id}`);
    }

    const renderPost = (post, index) => {
       const {title, image, description, id} = post;
       return (
           <Col span={24} md={12} key={`economy-${index}`} >
               <article onClick={() => openPost(id)}>
                    <p>
                        <strong dangerouslySetInnerHTML={createMarkup(title)}  />
                    </p>
                    {image?.url ? renderImg({image, description}) : renderDescription(description)} {/*ternario pq nem toda resposta possui img */}

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

Economy.defaultProps = {
    data: []
}

Economy.propTypes = {
    data: PropTypes.array.isRequired  // indicando que a prop recebida é um array obrigatorio 
}


export default memo(Economy);