import React from 'react';

const PictureItem = (props) => {   

    return (
        <div classname='picture-item'>
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">Search Query</h3>
                    <p class="card-text">{props.picture.search}</p>
                    <h4>Date: </h4>
                    <p class="card-text">{props.picture.createdAt.split("T")[0]}</p>
                </div>
            </div>
        </div>
    )
}

export default PictureItem;