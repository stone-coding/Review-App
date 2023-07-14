import React from 'react'
import ModalContainer from './ModalContainer'
import MovieForm from '../admin/MovieForm'

export default function UpdateMovie({visible, busy , initialState}) {
  return (
    <ModalContainer visible={visible}>
      <MovieForm initialState={initialState}/>
    </ModalContainer>
  )
}
