import React, {useState} from "react";
import {
  View,
  FlatList
} from 'react-native'
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Profile } from "../../components/Profile";
import { ListDivider } from "../../components/ListDivider";
import { Background } from "../../components/Background";
import { Load } from "../../components/Load";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
export function Home () {

  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<AppointmentProps[]>([])
  const navigation = useNavigation()


  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId)
  }

  function handleAppointmentDetails() {
    navigation.navigate('AppointmentDetails')
  }
  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate')
  }

  async function loadAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)

    const storage: AppointmentProps[] = response ? JSON.parse(response) : []

    if(category){
      setAppointments(storage.filter(item => item.category === category))
    }else {
      setAppointments(storage)
    }

    setLoading(false)

    
  }



  return (
    <Background>
      <View style={styles.header}>
        <Profile/>
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>
      <CategorySelect  categorySelected={category} setCategory={handleCategorySelect}/>

      {
        loading ? <Load/> :
        <>
          <ListHeader title="Partidas Agendadas" subtitle="Total 6" /> 

          <FlatList  
            data={appointments}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Appointment 
                data={item}
                onPress={handleAppointmentDetails}
                
                /> 
              )}
              ItemSeparatorComponent={() => <ListDivider/>}
              contentContainerStyle={{paddingBottom : 69}}
            style={styles.matches}
            showsVerticalScrollIndicator={false}
            />
        </>
      }
    </Background>
  )
}