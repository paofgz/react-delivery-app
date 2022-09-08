import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native'
import { LocationMarkerIcon } from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';

export default function RestaurantCardsCategories({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat
}) {

  const navigation = useNavigation()

  return (
    <TouchableOpacity 
    onPress={() => {
      navigation.navigate('Restaurant', {
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat
      })
    }}
    className='bg-white shadow rounded-xl mb-5 ml-5 mr-5'>
      <Image
      source={{
        uri: urlFor(imgUrl).url(),
      }} 
      className='h-40 w-100 rounded-xl'/>
      <View className='px-3 pb-4' >
        <Text className='font-bold text-3xl pt-2'>{title}</Text>
        <View className='flex-row items-center space-x-1' >
          <StarIcon color='green' opacity={0.5} size={30} />
          <Text className='text-lg text-gray-500'>
            <Text className='text-green-500'>{rating}</Text>              {genre}
          </Text>
        </View>
      </View>
      
    </TouchableOpacity>
  ) 
}
