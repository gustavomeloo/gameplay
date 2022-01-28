import React from "react";
import {
  Image,
} from 'react-native'

import { styles } from "./styles";

export function GuildIcon () {
  const uri = 'https://www.purarteadesivos.com.br/wp-content/uploads/2016/11/adesivo-personalizado-pikachu-de-paredes-home-office-carro-sticker-pokemon-geek-nerd-pura-arte-adesivos.png'

  return (
    <Image 
      source={{ uri }}
      style={styles.image}
      resizeMode="cover"
    />
    
  )
}