import React from 'react'
import './imageform.css'
const Imageform = ({onInputChange,onButtonSubmit}) => {
    return (
        <div className="f3">
            <p>
                {'this site will detect the faces in an image. '}
            </p>
            <div className="center ">
                <div className="form center pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type='text' onChange={onInputChange} />
                    <button className="w-30 grow f4 link ph3 pv2 dib bg-light-blue" onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}
export default Imageform;