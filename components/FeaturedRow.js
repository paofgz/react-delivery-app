import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCards from './RestaurantCards'

export default function FeautredRow({id, title, description}) {
    return (
        <View>
            <View className='mt-4 flex-row items-center justify-between px-4'>
                <Text className='font-bold text-1g'>{title}</Text>
                <ArrowRightIcon color='#00CCBB'/>
            </View>
            <Text className='text-xs text-gray-500 px-4'>{description}</Text>
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className='pt-4'
            contentContainerStyle={{
                paddingHorizontal: 15
            }}>
                {/* RestaurantCards */}
                <RestaurantCards
                id={1}
                imgUrl='http://links.papareact.com/gn7'
                title='SushiRoll'
                rating={4.5}
                address='123 Main St'
                genre='Japanese'
                short_description='This is the description'
                dishes={[]}
                long={20}
                lat={0}
                />
                <RestaurantCards
                id={1}
                imgUrl='http://links.papareact.com/gn7'
                title='SushiRoll'
                rating={4.5}
                address='123 Main St'
                genre='Japanese'
                short_description='This is the description'
                dishes={[]}
                long={20}
                lat={0}
                />
                <RestaurantCards
                id={1}
                imgUrl='http://links.papareact.com/gn7'
                title='SushiRoll'
                rating={4.5}
                address='123 Main St'
                genre='Japanese'
                short_description='This is the description'
                dishes={[]}
                long={20}
                lat={0}
                />
            </ScrollView>
        </View>
    )
}
