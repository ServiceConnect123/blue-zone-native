import { View, ActivityIndicator, Text } from 'react-native'
import React from 'react'

const LoadScreen = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="black" />
      <Text className="text-black font-bold text-lg mt-2">Cargando...</Text>
    </View>
  )
}

export default LoadScreen