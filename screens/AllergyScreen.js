import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { ArrowLeftIcon, LocationMarkerIcon, MailIcon, PhoneIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import { Button, TextInput } from 'react-native-paper'

export default function AllergyScreen() {
const navigation = useNavigation()
const checkList = [""];

  return (
    <ScrollView className='bg-white'>
      <View className='p-10 mt-5 items-center'>
        <Text className="font-bold text-xl">
          Food allergies
        </Text>
        <Text className="font-light text-lg mb-5">
          Select your alergies
        </Text>
      </View>

    <View className='mr-5 ml-5'>
      <Formik
      initialValues = {{allergies: ''}}
      onSubmit = { values => {
        alert('Allergies registered')
        console.log(values.allergies)
        navigation.goBack()
      }}
      >
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <TextInput
            onChangeText={handleChange('allergies')}
            onBlur={handleBlur('allergies')}
            value = {values.allergies}
            className='w-100'
            />
            <Button onPress={handleSubmit} title='Submit'>Submit</Button>
          </View>
        )}
      </Formik>
    </View>
      
    </ScrollView>
  )
}