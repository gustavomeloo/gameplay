import React, {ReactNode} from "react";
import {
  View,
  Modal,
  ModalProps,
  TouchableWithoutFeedback

} from 'react-native'
import { Background } from "../Background";

import { styles } from './styles'

type Props = ModalProps & {
  children : ReactNode
  closeModal: () => void
  hasSignOut?: boolean
}

export function ModalView({hasSignOut = false, children, closeModal, ...rest}: Props){
  return (    
    <Modal
      transparent
      animationType="slide"
      statusBarTranslucent
      {...rest}
    >
      <TouchableWithoutFeedback onPress={closeModal} >
        <View style={styles.overlay}>
          <View style={ hasSignOut ? {marginTop: 600, flex : 1} : styles.container }>
            <Background>
              {
                !hasSignOut && 
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