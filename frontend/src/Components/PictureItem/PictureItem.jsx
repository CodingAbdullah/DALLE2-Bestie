import React from 'react';

const PictureItem = (props) => {   

    return (
        <div classname='picture-item'>
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Search Query</h4>
                    <p class="card-text">{props.picture.search}</p>
                    <h3>Date: </h3>
                    <p class="card-text">{props.picture.createdAt.split("T")[0]}</p>
                </div>
            </div>
        </div>
    )
}

export default PictureItem;