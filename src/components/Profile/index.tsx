import React from "react";

import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { useAuth } from "../../hooks/auth";
import { Avatar } from "../Avatar";
import { styles } from "./styles";

export function Profile() {
  const { user, signOut } = useAuth()

  function handleSignOut() {
    Alert.alert('Logout', 'Deseja sair do Gameplay',
    [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => signOut()
      }
    ])
  }
  return(
    <View style={styles.container} >


      <TouchableOpacity onPress={handleSignOut}>
        <Avatar urlImage={user.avatar} />
      </TouchableOpacity>
     
      <View>
        <View style={styles.user} >
          <Text style={styles.greeting}>Olá,</Text>

          <Text style={styles.username}>{user.firstname}</Text>
        </View>

        <Text style={styles.message} >Hoje é dia de vitória</Text>
      </View>


    </View>
  )
}