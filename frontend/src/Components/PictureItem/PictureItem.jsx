import React from 'react';

const PictureItem = (props) => {   
    return (
        <div classname='picture-item'>
            <div class="card">
                <img class="card-img-top" alt="no-text" src={`${props.picture.url}`} />
                <div class="card-body">
                    <h3 class="card-title">{ props.picture.search.charAt(0).toUpperCase() + props.picture.search.substring(1).toLowerCase() }</h3>
                    <p style={{ marginTop: '3rem' }} class="card-text"><b>Date</b>: { props.picture.createdAt.split("T")[0] }</p>
                    <p class="card-text"><b>Time</b>: { props.picture.createdAt.split("T")[1].split("Z")[0].split(".")[0] + " - GMT" }</p>
                </div>
            </div>
        </div>
    )
}

export default PictureItem;