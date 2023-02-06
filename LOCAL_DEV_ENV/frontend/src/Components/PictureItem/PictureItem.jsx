import React from 'react';
import { styles } from '../../css/PictureItemCSS';

const PictureItem = (props) => {   
    return (
        <div classname='picture-item'>
            <div className="card">
                <img className="card-img-top" alt="no-text" src={`${props.picture.url}`} />
                <div className="card-body">
                    <h3 className="card-title">{ props.picture.search }</h3>
                    <p style={ styles.date } className="card-text"><b>Date</b>: { props.picture.createdAt.split("T")[0] }</p>
                    <p className="card-text"><b>Requested Size</b>: { props.picture.size.substring(0, 1).toUpperCase() + props.picture.size.substring(1).toLowerCase() }</p>
                    <p className="card-text"><b>Time</b>: { props.picture.createdAt.split("T")[1].split("Z")[0].split(".")[0] + " - GMT" }</p>
                    <button class="btn btn-danger" onClick={ props.deletePicture } value={ props.picture.url }>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default PictureItem;