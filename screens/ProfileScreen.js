import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { ArrowLeftIcon, LocationMarkerIcon, MailIcon, PhoneIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'


export default function ProfileScreen() {
const navigation = useNavigation()

  return (
    <ScrollView>
      <View className='bg-white'>
        <View className='px-4 pt-4'>
          <View className="flex-row items-center space-x-4 space-y-10 p-5 mt-5">
            <TouchableOpacity
              onPress={navigation.goBack}
              className='absolute top-0 left-0 p-2 bg-gray-100 rounded-full'>
                <ArrowLeftIcon size={20} color='#9472CB'/>
            </TouchableOpacity>
            <Image
            source={{
              uri: 'https://pbs.twimg.com/profile_images/1399375588226387972/ps2w_vbD_400x400.jpg'
            }} 
            className="h-20 w-20 bg-gray-300 rounded-full mt-10"/>
            <View className="flex-1">
              <Text className="font-light text-l">Hola</Text>
              <Text className="font-bold text-xl">
                Paola Fernández
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className='bg-white border p-4 border-gray-200'>
        <View> 
          <View className='flex-row items-center'>
            <MailIcon color='#9472CB' opacity={0.4} size={22} />
            <Text>&emsp;</Text>
            <Text className='text-lg mb-1'>paofgz2000@gmail.com</Text>
          </View>
          <View className='flex-row items-center'>
            <PhoneIcon color='#9472CB' opacity={0.4} size={22} />
            <Text>&emsp;</Text>
            <Text className='text-lg mb-1'>+51 (1) 55-2725-4450</Text>
          </View>
        </View>
      </View>

      <View className='bg-white border p-3 border-gray-200 mt-5 '>
        <View className='flex-row items-center'>
          <LocationMarkerIcon color='#9472CB' opacity={0.4} size={22} />
          <Text>&emsp;</Text>
          <Text className='text-lg'>Coapa, San Bartolo el Chico, 14380 Ciudad de México, CDMX</Text>
        </View>
      </View>
      

    </ScrollView>
  )
}