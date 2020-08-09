import React, { useState, useEffect } from 'react';
import SliderContent from './SliderContent'
import Slide from './Slide'
import Arrow from './Arrow'
import styles from './slider.module.scss'

function Slider({slides}) {

    const getWidth = () => window.innerWidth / 4
    const [translate, setTranslate] = useState(0)
    const [transition, setTransition] = useState(0.45)
    const [activeSlide, setActiveSlide] = useState(0)
    const [containerWidth, setContainerWidth] = useState(0)

    const slidesCount = slides.length

    useEffect(() => {
        setContainerWidth(getWidth() * slidesCount)
    }, [])

    const prevSlide = () => {
        if (activeSlide === 0) {
            setActiveSlide(slidesCount - 1)
            setTranslate((slidesCount - 1) * getWidth())
            return
        }

        setActiveSlide(activeSlide - 1)
        setTranslate((activeSlide - 1) * getWidth())
        return
    }

    const nextSlide = () => {
        if (activeSlide === slidesCount - 1) {
            setActiveSlide(0)
            setTranslate(0)
            return
        }

        setActiveSlide(activeSlide + 1)
        setTranslate((activeSlide + 1) * getWidth())
        return
    }

    const onResize = window.addEventListener('resize', () => {
        setContainerWidth(getWidth() * slidesCount)
    })

    return (
        <div className={styles.container}>
            <SliderContent
                translate={translate}
                transition={transition}
                width={containerWidth}
            >
                {slides.map(slide => {
                    return <Slide key={slide.name} content={slide} width={getWidth()} />
                })}
            </SliderContent>

            <Arrow direction="left" handleClick={prevSlide} />
            <Arrow direction="right" handleClick={nextSlide} />
        </div>
    );
}

export default Slider;