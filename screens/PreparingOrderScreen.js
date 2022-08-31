import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'

export default function PreparingOrderScreen() {
  const navigation = useNavigation()
  useEffect(() => {
    setTimeout(() => {
        navigation.navigate('Delivery')
    }, 3000)
  }, [])
  return (
    <SafeAreaView className='flex-1 justify-center items-center'>
      <Animatable.Image 
        source={require('../assets/badbunnypizza.gif')}
        animation='slideInUp'
        iterationCount={1}
        className='h-96 w-96'
      />
      <Animatable.Text 
      animation='slideInUp'
      iterationCount={1}
      className='text-lg my-10 text-black font-bold text-center'
      >Waiting for restaurant to accept your order</Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color='blue' />
    </SafeAreaView>
  )
}