import React from 'react'
import swal from '@sweetalert/with-react'
import {AeaModal} from '../components/AeaModal'

const Aea = () => {
  const onPick = value => {
    swal("Thanks for your rating!", `You rated us ${value}/3`, "success")
  }
    const openModal = () => {
      swal({
        buttons:false,
        content:(<AeaModal onClick={onPick}/>)
      })
    }
    return (
        <div>
          <button onClick={openModal}>Modal</button>  
        </div>
    )
}

export default Aea
