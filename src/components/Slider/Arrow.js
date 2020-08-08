import React from 'react'
import leftArrow from '../../images/left-arrow.svg'
import rightArrow from '../../images/right-arrow.svg'

const Arrow = ({ direction, handleClick }) => {

    const divStyle = {
        display: 'flex',
        position: 'absolute',
        top: '50%',
        right: direction === 'right' ? '25px' : '',
        left: direction === 'right' ? '' : '25px',
        height: '50px',
        width: '50px',
        justifyContent: 'center',
        background: 'white',
        borderRadius: '50%',
        cursor: 'pointer',
        alignItems: 'center',
        transition: 'transform ease-in 0.1s',
        '&: hover': {
            transform: 'scale(1.1)'
        }
    }

    const imgStyle = {
        transform: `translateX(${direction === 'left' ? '-2' : '2'}px)`,
        '&:focus' :{
          outline: '0'
        }
      }
    return (
        < div
            onClick={handleClick}
            style={divStyle}
        >
            {direction === 'right' ? <img style={imgStyle} src={rightArrow} /> : <img src={leftArrow} alt="arrow" />}
        </div >
    )
}

export default Arrow