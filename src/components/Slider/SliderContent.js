import React from 'react';

function SliderContent({ width, transition, translate, children }) {
    const sliderContentStyle = {
        transform: `translateX(-${translate}px)`,
        transition: `transform ease-out ${transition}s`,
        height: '100%',
        width: `${width}px`,
        display: 'flex',
    }
    return (
        <div style={sliderContentStyle}>
            {children}
        </div>
    );
}

export default SliderContent;