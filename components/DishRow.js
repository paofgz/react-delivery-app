import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { urlFor } from '../sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../features/basketSlice'

export default function DishRow({
    id,
    name,
    description,
    price,
    image}) {
    const [isPressed, setIsPressed] = useState(false)
    const dispatch = useDispatch()
    const items = useSelector((state) => selectBasketItemsWithId(state, id))

    const addItemToBasket = () => {
        dispatch(addToBasket({id, name, description, price, image}))
    }

    const removeItemFromBasket = () => {
        if (items.length <= 0)
            return
        dispatch(removeFromBasket({id}))
    }
    return (
        <>
        <TouchableOpacity className='bg-white border p-4 border-gray-200'
        onPress={() => setIsPressed(!isPressed)}>
        <View className='flex-row'>
            <View className='flex-1 pr-2'>
                <Text className='text-lg mb-1'>{name}</Text>
                <Text className='text-gray-400'>{description}</Text>
                <Text className='text-gray-400 mt-2'>${price}</Text>
            </View>
            <View>
                <Image
                className='h-20 w-20 bg-gray-300 p-4'
                style={{
                    borderWidth: 1,
                    borderColor: 'black'
                }}
                source={{uri: urlFor(image).url()}}/>
            </View>
        </View>
        </TouchableOpacity>
        {isPressed && (
            <View className='gb-white px-4'>
                <View className='flex-row items-center space-x-2 pb-3'>
                    <TouchableOpacity>
                        <MinusCircleIcon
                        onPress={removeItemFromBasket} 
                        color={items.length > 0 ? '#00CCBB' : 'gray'}
                        size={40}/>
                    </TouchableOpacity>
                    <Text>{items.length}</Text>
                    <TouchableOpacity>
                        <PlusCircleIcon
                        onPress={addItemToBasket}
                        color={items.length > 0 ? '#00CCBB' : 'gray'}
                        size={40}/>
                    </TouchableOpacity>
                </View>
            </View>
        )}
        </>
    )
}