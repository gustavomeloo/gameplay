import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

type Props = TouchableOpacityProps & {
  title? : string;
  isTrue? : boolean
}

export function ButtonSignOut ({title, isTrue, ...rest} : Props) {

  const { primary } = theme.colors

  return (
    <TouchableOpacity style={ isTrue ? [styles.container, {backgroundColor : primary, borderColor : primary}] : styles.container} {...rest} >
     
      <Text style={styles.title}>
       {title}
      </Text>
    </TouchableOpacity>
  )
}