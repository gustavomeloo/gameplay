import React from 'react';
import { useAuth } from "../../hooks/auth";
import {
  View,
  Text
} from 'react-native';

import { ButtonSignOut } from "../../components/ButtonSignOut";

import {
  styles
} from './styles';

type Props = {
  closeSignOut: () => void
}

export function SignOut({ closeSignOut }: Props){

  const { signOut } = useAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Deseja sair do Game<Text style={styles.span}>Play</Text>?
      </Text>
      <View style={styles.buttons}>
        <ButtonSignOut title="Não" onPress={closeSignOut} />
        <ButtonSignOut title="Sim" onPress={() => signOut()} isTrue={true}/>
      </View>
    </View>
  ); 
}