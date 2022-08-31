import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XIcon } from 'react-native-heroicons/solid'
import { Image } from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import MapView, { Marker } from 'react-native-maps'

export default function DeliveryScreen() {
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant)

  return (
    <View className='bg-[#00CCBB] flex-1'>
      <SafeAreaView className='z-50'>
        <View className='flex-row justify-between items-center p-5'>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <XIcon color='white' size={30} />
            </TouchableOpacity>
            <Text className='font-light text-white text-lg'>Order help</Text>
        </View>

        <View className='bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md'>
            <View className='flex-row justify-between'>
                <View>
                    <Text className='text-lg text-gray-400'>Estimated Arrival</Text>
                    <Text className='text-4xl font-bold'>40 - 50 Minutes</Text>
                </View>
                <Image 
                source={{uri:'https://links.papareact.com/fls'}}
                className='h-20 w-20'
                />
            </View>
            <Progress.Bar size={30} color='#00CCBB' indeterminate={true} />
            <Text className='mt-3 text-gray-500'>
                Your order at {restaurant.title} is being prepared
            </Text>
        </View>
      </SafeAreaView>
      <MapView
      initialRegion={{
        latitude: 19.2951278196816,
        longitude: -99.12820370251724,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }}
      className='flex-1 mt-10 z-0'
      mapType='mutedStandard'>
        <Marker
        coordinate={{
            latitude: 19.2951278196816,
            longitude: -99.12820370251724
        }}
        title={restaurant.title}
        description={restaurant.description}
        identifier='origin'
        pinColor='#00CCBB'
        />
      </MapView>

    </View>
  )
}