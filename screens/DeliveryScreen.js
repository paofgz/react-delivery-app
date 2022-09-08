import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XIcon } from 'react-native-heroicons/solid'
import { Image } from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as Constants from 'expo-constants'

export default function DeliveryScreen() {
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)
  const [current, setCurrent] = useState({
    locationResult: 'None'
  })
  useEffect(() => {
    _getLocationAsync();
  }, [])

  const _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
      locationResult: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    setCurrent({ locationResult: location });
    console.log(current)
  }

  return (
    <View className='bg-[#9472CB] flex-1'>
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
            <Progress.Bar size={30} color='#9472CB' indeterminate={true} />
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
        description={restaurant.short_description}
        identifier='origin'
        pinColor='#9472CB'
        />
        <Marker
        coordinate={{
            latitude: current.locationResult.coords ? current.locationResult.coords.latitude : 19.2951278196816,
            longitude: current.locationResult.coords ? current.locationResult.coords.longitude : -99.12820370251724
        }}
        title='You'
        description='You are here'
        pinColor='red'
        />
      </MapView>

    </View>
  )
}