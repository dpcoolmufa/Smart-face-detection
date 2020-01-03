import React from 'react'
import './Facerecognition.css'

const Facerecognition = ({ imageUrl, box }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputImage" src={imageUrl} alt="source" width='500px' height='auto'  />
                <div className="bounding-box" style={{ top: box.top, right: box.right, bottom: box.bottom, left: box.left }}></div>
            </div>
        </div>
    );
}
export default Facerecognition;