import React, { useState } from "react";

import { Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from "../Avatar";
import { ModalView } from "../ModalView";
import { SignOut } from "../../screens/SignOut";
import { styles } from "./styles";
import { useAuth } from "../../hooks/auth";

export function Profile() {
  const { user } = useAuth()
  const [openSignOutmodal, setOpenSignOutModal] = useState(false)

  function handleOpenSignOutModal() {
    setOpenSignOutModal(true)
  }

  function handleCloseSignOutModal() {
    setOpenSignOutModal(false)
  }

  return(
    <View style={styles.container} >

      <TouchableOpacity onPress={handleOpenSignOutModal}>
        <Avatar urlImage={user.avatar} />
      </TouchableOpacity>
     
      <View>
        <View style={styles.user} >
          <Text style={styles.greeting}>Olá,</Text>

          <Text style={styles.username}>{user.firstname}</Text>
        </View>

        <Text style={styles.message} >Hoje é dia de vitória</Text>
      </View>

      <ModalView visible={openSignOutmodal} closeModal={handleCloseSignOutModal} isSignOut={true} >
        <SignOut closeSignOut={handleCloseSignOutModal} />
      </ModalView>

    </View>

   
  )
}