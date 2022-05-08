import { StyleSheet } from 'react-native';
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent : 'space-evenly', 
    alignItems : 'center'
  },
  title : {
    fontFamily: theme.fonts.title700,
    marginTop : 8,
    fontSize: 24,
    color: theme.colors.heading
  },
  span : {
    color : theme.colors.primary
  },
  buttons : {
    justifyContent : 'space-between',
    flexDirection : 'row'
  }
}) 