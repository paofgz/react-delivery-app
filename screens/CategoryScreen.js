import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { useEffect, useState } from 'react';
import { urlFor } from '../sanity';
import SanityClient from '../sanity'
import RestaurantCardsCategories from '../components/RestaurantCardsCategories';


export default function CategoryScreen() {
  const navigation = useNavigation()

  const {
    params: {
      title,
      imgUrl
    }
  } = useRoute()

  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    SanityClient.fetch(`
        *[_type == 'Restaurant' && type->name == $title] {
            ...,
            dishes[]->
        }
    `, {title}).then((data) => {
        setRestaurants(data)
    })
  }, [])

  return (
    <>
      <ScrollView className='mt-10'>
        <View className='relative'>
          <Image 
          source={{uri: urlFor(imgUrl).url()}}
          className='w-full h-56 bg-gray-300 p-4'
          />
          <TouchableOpacity 
          onPress={navigation.goBack}
          className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full'>
            <ArrowLeftIcon size={20} color='#9472CB'/>
          </TouchableOpacity>
        </View>

        <View className='bg-white'>
          <View className='px-4 pt-4 pb-4 items-center'>
            <Text className='text-3xl font-bold justify-center'>{title}</Text>
          </View>
        </View>
          <ScrollView
          vertical
          showsHorizontalScrollIndicator={false}
          className='pt-4'
          >
            {/* RestaurantCards */}
            {restaurants?.map((restaurant) => (
              <RestaurantCardsCategories
              key={restaurant._id}
              id={restaurant._id}
              imgUrl={restaurant.image}
              title={restaurant.name}
              rating={restaurant.rating}
              address={restaurant.address}
              genre={restaurant.type?.name}
              short_description={restaurant.short_description}
              dishes={restaurant.dishes}
              long={restaurant.long}
              lat={restaurant.lat}
              />
            ))}
          </ScrollView>
      </ScrollView>
    </>
  )
}