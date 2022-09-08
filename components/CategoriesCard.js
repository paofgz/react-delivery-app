import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, Image } from 'react-native'
import { urlFor } from '../sanity';


export default function CategoryCard({imgUrl, title}) {
    const navigation = useNavigation()

    return (
        <TouchableOpacity 
        onPress={() => {
        navigation.navigate('Category', {
            title,
            imgUrl
        })
        }} 
        className="relative mr-3">
            <Image 
                source={{uri: urlFor(imgUrl).width(200).url()}} 
                alt={title} 
                className="h-20 w-20 rounded"/>
            <Text className="absolute bottom-1 left-1 text-white font-bold">{title}</Text>
        </TouchableOpacity>
    ) 
}
