import React, {ReactNode} from "react";
import {
  Modal,
  ModalProps,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { Background } from "../Background";

import { styles } from './styles'

type Props = ModalProps & {
  children : ReactNode
  closeModal: () => void
  isSignOut?: boolean
}

export function ModalView({isSignOut = false, children, closeModal, ...rest}: Props){
  return (    
    <Modal
      transparent
      animationType="slide"
      statusBarTranslucent
      {...rest}
    >
      <TouchableWithoutFeedback onPress={closeModal} >
        <View style={styles.overlay}>
          <View style={ isSignOut ? {marginTop: 610, flex : 1} : styles.container }>
            <Background>
              {
                !isSignOut && 
                <View style={styles.bar}/> 
              }
                {children}
            </Background>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}