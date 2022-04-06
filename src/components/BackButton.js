import React from 'react';
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './scss/BackButton.scss'

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <IconButton  className="arrow-back"  onClick={()=>{navigate(-1)}} >
      <ArrowBackIosNewIcon sx={{color: 'white'}}/>
    </IconButton>
  )
}

export default BackButton