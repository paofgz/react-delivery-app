import { View, Text, TouchableOpacity, Image, ScrollView, Touchable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { addToBasket, removeFromBasket, selectBascketItems, selectBasketTotal } from '../features/basketSlice'
import { useMemo } from 'react'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XCircleIcon} from 'react-native-heroicons/solid'
import { urlFor } from '../sanity';

export default function BasketScreen() {
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)
  const items = useSelector(selectBascketItems)
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])
  const dispatch = useDispatch()
  const basketTotal = useSelector(selectBasketTotal)

    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item)
            return results
        }, {})
        setGroupedItemsInBasket(groupedItems)
    }, [items])

  return (
    <SafeAreaView className='pt-5 flex-1 bg-white'>
      <View className='flex-1 bg-gray-100'>
        <View className='p-5 border-b border-[#9472CB] bg-white shadow-xs'>
          <View>
            <Text className='text-3xl font-bold text-center'>Basket</Text>
            <Text className='text-center text-gray-600'>{restaurant.title}</Text>
          </View>
          <TouchableOpacity
          onPress={navigation.goBack}
          className='rounded-full bg-gray-100 absolute top-3 left-5'>
            <XCircleIcon color='#9472CB' size={50}/>
          </TouchableOpacity>
        </View>
        <View className='flex-row items-center space-x-4 px-4 py-5 bg-white my-2'>
          <Image source={{
            uri: 'https://links.papareact.com/wru'
          }} 
          className='h-10 w-10 bg-gray-300 p-4 rounded-full'
          />
          <Text className='flex-1 text-base'>Deliver in 50-75 min</Text>
        </View>

        <ScrollView className='divide-y divide-gray-200'>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
            className='flex-row items-center space-x-3 bg-white py-2 px-5 mt-1 ml-2 mr-2 rounded-md'
            key={key}>
              <Text>{items.length}x</Text>
              <Image 
              source={{uri: urlFor(items[0]?.image).url()}}
              className='h-12 w-12 rounded-full'/>
              <Text className='flex-1'>{items[0]?.name}</Text>
              <TouchableOpacity>
                <Text className='text-[#9472CB] text-xs'
                onPress={() => dispatch(removeFromBasket({id: key}))}>REMOVE</Text>
              </TouchableOpacity>
              <Text className='text-gray-600'>${(items[0]?.price * items.length).toFixed(2)}</Text>
              <TouchableOpacity>
                <Text className='text-[#9472CB] text-xs'
                onPress={() => dispatch(addToBasket(items[0]))}>ADD</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className='p-5 bg-white mt-5 space-y-4'>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Subtotal</Text>
            <Text className='text-gray-400'>${(basketTotal).toFixed(2)}</Text>
          </View>

          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Delivery Fee</Text>
            <Text className='text-gray-400'>$1</Text>
          </View>

          <View className='flex-row justify-between'>
            <Text className='text-black'>Order Total</Text>
            <Text className='font-extrabold'>${(basketTotal + 1).toFixed(2)}</Text>
          </View>

          <TouchableOpacity 
          onPress={() => navigation.navigate('PreparingOrderScreen', {
            restaurant: restaurant.genre
          })}
          className='rounded-1 bg-[#9472CB] p-4'>
            <Text className='text-center text-white text-lg font-bold'>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
