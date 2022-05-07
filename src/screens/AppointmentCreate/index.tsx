import React, {useState, AnimationEventHandler}  from "react";
import {Feather} from '@expo/vector-icons'
import 'react-native-get-random-values'
import {
  v4 as uuidv4
} from 'uuid'
import {
  Alert,
  TouchableOpacity,
  Text,
  View,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicatorComponent
} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";

import {COLLECTION_APPOINTMENTS} from '../../configs/database'
import { theme } from '../../global/styles/theme'
import { styles } from "./styles";
import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { CategorySelect } from "../../components/CategorySelect";
import { GuildIcon } from "../../components/GuildIcon";
import { SmallInput } from "../../components/SmallInput";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { ModalView } from "../../components/ModalView";
import { Guilds } from "../Guilds";
import { GuildProps } from "../../components/Guild";
import { useNavigation } from "@react-navigation/native";


export function AppointmentCreate(){
  const [category, setCategory] = useState('')
  const [openGuildsmodal, setOpenGuildsModal] = useState(false)
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps)

  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [description, setDescription] = useState('')

  const navigation = useNavigation()

  function handleOpenGuilds(){
    setOpenGuildsModal(true)
  }
  function handleCloseGuilds(){
    setOpenGuildsModal(false)
  }

  function handleGuildSelect(guildSelect: GuildProps){
    setGuild(guildSelect)
    setOpenGuildsModal(false)
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId)
  }

  function regexValidation(){
    const reNumber = /\d/
    if (!reNumber.test(day) || !reNumber.test(month)){
      Alert.alert('Erro', 'dia e mês incorretos')
      return false 
    }
    if (!reNumber.test(hour) || !reNumber.test(minute) ){
      Alert.alert('Erro', 'Hora e Minutos incorretos')
      return false 
    }
    return true
  }

  function validation() {
    if (category.length === 0) {
      Alert.alert('Erro', 'Selecione alguma categoria')
      return false
    }

    if (Object.keys(guild).length === 0) {
      Alert.alert('Erro', 'Selecione uma guilda')
      return false
    }

    if(!regexValidation()) return false

    if(description.trim().length === 0){
      Alert.alert('Erro', 'Digite uma descrição')
      return false
    }

    return true

  }

  async function handleSave() {
    if(validation()){
      const newAppointment = {
        id: uuidv4(),
        guild,
        category,
        date: `${day}/${month} às ${hour}:${minute}h`,
        description
      }
  
      const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
  
      const appointments = storage ? JSON.parse(storage) : []
  
      await AsyncStorage.setItem(COLLECTION_APPOINTMENTS, JSON.stringify([...appointments, newAppointment]))
  
      navigation.navigate('Home')
    }
  }
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Background>
      
        <ScrollView>
          <Header 
            title="Agendar partida"
          />

          <Text style={[styles.label, {marginLeft: 24, marginTop: 36, marginBottom: 18}]} > 
            Categoria
          </Text>

          <CategorySelect  
            hasCheckBox
            setCategory={handleCategorySelect}
            categorySelected={category}
            
            />

            <View style={styles.form} >
              <TouchableOpacity onPress={handleOpenGuilds} >

                <View style={styles.select} >
                {
                  guild.icon ? <GuildIcon guildId={guild.id} iconId={guild.icon}/> :
                  <View style={styles.image}/>
                  
                }
                  <View style={styles.selectBody}>
                    <Text style={styles.label}>
                      {guild.name ? guild.name : 'Selecione um servidor'}
                    </Text>
                  </View>

                  <Feather 
                    name="chevron-right"
                    color={theme.colors.heading}
                    size={18}
                  />
                </View>
              </TouchableOpacity>


              <View style={styles.field} > 
                <View>
                <Text style={[styles.label, {marginBottom: 12}]}>
                    Dia e Mês
                  </Text>

                  <View style={styles.column}>
                    <SmallInput maxLength={2} onChangeText={setDay} />
                    <Text style={styles.divider}>
                      /
                    </Text>
                    <SmallInput maxLength={2} onChangeText={setMonth} />
                  </View>
                </View>

                <View>
                  <Text style={[styles.label, {marginBottom: 12}]}>
                    Hora e minuto
                  </Text>

                  <View style={styles.column}>
                    <SmallInput maxLength={2} onChangeText={setHour} />
                    <Text style={styles.divider}>
                      :
                    </Text>
                    <SmallInput maxLength={2} onChangeText={setMinute}/>
                  </View>
                </View>
              </View>

              <View style={[styles.field, {marginBottom : 12}]}>
                <Text style={styles.label} >
                  Descrição
                </Text>

                <Text style={styles.caracteresLimit} >
                  Max 100 caracteres
                </Text>
              </View>
              
              <TextArea 
                onChangeText={setDescription}
                multiline 
                maxLength={100} 
                numberOfLines={5} 
                autoCorrect={false} />

              
              <View style={styles.footer} >
                <Button 
                  onPress={handleSave}
                  title="Agendar"/>
              </View>    

            </View>

        </ScrollView>
      </Background>

      <ModalView visible={openGuildsmodal} closeModal={handleCloseGuilds}>
        <Guilds handleGuildSelect={handleGuildSelect}/>
      </ModalView>
    </KeyboardAvoidingView>
  )
}

