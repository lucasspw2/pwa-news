import React,{memo} from 'react';
import ShareIcon from '../../images/share.svg';
import copyIcon from '../../images/copy.svg'



const navigatorHasShare = navigator.share; //verifica se api tem compartilhamento


const URL = 'http://localhost:3000';


function Actions({post, subject}) {
    const {id, title} = post;

    const shareInfo = () => { //info do compartilhamento
        navigator.share({
            title: `Pwa Blog - ${subject}`,
            text: title,
            url: URL
        })
    }

    const copyInfo = () => { //copiar info p/ compartilhar
        navigator.clipboard.writeText(`${title} - * Learn more about in ${URL}/${subject}/${id}` );
    }

    const renderActions = () => {
        const action = navigatorHasShare ? shareInfo : copyInfo;

        const icon = navigatorHasShare ? copyIcon : ShareIcon ;

        return <img alt="icon" src={icon} className="share-icon" onClick={action} />
    }


    return (
        <div className="share">
            {renderActions()}

        </div>
    )

}

export default memo(Actions);