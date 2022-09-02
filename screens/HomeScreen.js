import { React, useEffect, useLayoutEffect, useState } from 'react';
import { View,Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronDownIcon, UserIcon, SearchIcon, CogIcon } from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import  SanityClient  from '../sanity';
import { TouchableOpacity } from 'react-native'

export default function HomeScreen() {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [])

  useEffect(() => {
    SanityClient.fetch(`
    *[_type == 'Featured'] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->
        }
      }`).then((data) => {
      setFeaturedCategories(data)
    })
  }, [])

  return (
    <SafeAreaView>
      {/* Header */}
      <View className="flex-row items-center mx-4 space-x-4 mb-5">
        <Image 
          source={{
            uri: 'http://links.papareact.com/wru'
          }} 
          className="h-20 w-20 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-xl">Deliver now</Text>
          <Text className="text-gray-400">
            Current location
          </Text>
        </View>
        <TouchableOpacity>
          <UserIcon
          onPress={() => {
            navigation.navigate('Profile')
          }}
          color='#9472CB'
          size={25}/>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-1 pd-2 mx-2 mb-4">
          <View className="flex-row flex-1 space-x-2 p-2 bg-gray-200" style={{borderRadius: 20}}>
            <SearchIcon size={25} color='#C3C3C3' />
            <TextInput 
              className="ml-4 mr-4 flex-1" 
              placeholder='Restaurant & Cuisines' 
              keyboardType='default' 
            />
          </View>
          <CogIcon size={25} color='#9472CB'/>
      </View>

      {/* Body */}
      <ScrollView className="flex-1" contentContainerStyle={{paddingBottom: 150}}>
        {/* Categories */}
        <Categories />
        
        {/* Featured Row */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
          key={category._id}
          id={category._id}
          title={category.name} 
          description={category.short_description} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
