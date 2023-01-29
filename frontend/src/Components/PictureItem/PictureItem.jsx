import React from 'react';

const PictureItem = (props) => {    
    return (
        <div classname='picture-item'>
            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Search Query</h4>
                            <p class="card-text">{props.search}</p>
                            <h3>Date: </h3>
                            <p class="card-text">{props.time.split("T")[0]}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default PictureItem;