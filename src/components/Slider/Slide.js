import React from 'react';

function Slide({width, content}) {
    const slideStyle = {
        height: '500px',
        width: `${width}px`,
        backgroundImage: `url('${content}')`,
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: `center`
    }
    return (
        <div style={slideStyle}>
            
        </div>
    );
}

export default Slide;