import React, {useEffect, useRef} from 'react'
import { alpha, styled } from '@mui/material/styles'
import { Card, Typography } from '@mui/material'
import PropTypes from "prop-types";
import './scss/DataCard.scss'

const StyledCard = styled(Card)(({theme}) => {
  
})


const DataCard = (props) => {

  const { currentReactions, totalReactions, emotion, ...rest } = props
  const divRef = useRef(null)
  const cardRef = useRef(null)
  const textRef = useRef(null)


  useEffect(() => {
    divRef.current.style.height = `${parseInt(currentReactions*100/totalReactions)}%`
  }, [currentReactions, totalReactions])
  
  useEffect(() => {
    textRef.current.style.height = `${cardRef.current.offsetHeight}px`
  })

  const getEmotion = () => {
    switch(emotion) {
      case 'confused':
        return ['🤔', 'Confused']
      case 'understand': 
        return ['😁', 'Understand']
      case 'bored':
        return ['😴', 'Bored']
      case 'mind':
        return ['🤯', 'Mind Blown']
    }
  }

  return (
  <Card ref={cardRef} className="data-card" {...rest}>
    <div ref={divRef} className={`data-card--fill-color--${emotion}`} >
    </div>
    <div ref={textRef} className="data-card--text-container">
      <Typography variant="h1" component="div" align="center" className="data-card--text-container--text">{getEmotion()[0]}</Typography>
      <Typography variant="h5" component="div" align="center" className="data-card--text-container--text">{getEmotion()[1]}</Typography>
    </div> 
  </Card>
  )
}

DataCard.propTypes = {
  totalReactions : PropTypes.number.isRequired,
  currentReactions : PropTypes.number.isRequired,
  emotion: PropTypes.oneOf(['confused', 'understand', 'bored', 'mind' ]).isRequired
}

export default DataCard