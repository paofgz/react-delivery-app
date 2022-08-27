import { View, Text, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';

export default function RestaurantScreen() {
    const navigation = useNavigation();

    const {
        params: {
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
        }
    } = useRoute()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        })
    }, [])
  return (
    <ScrollView>
      <Text>RestaurantScreen</Text>
    </ScrollView>
  )
}