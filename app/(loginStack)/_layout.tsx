import React from 'react'
import { Stack } from 'expo-router'

const LoginStackLayout = () => {
  return (
    <Stack screenOptions={{
      animation: 'fade_from_bottom',
    }}>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  )
}

export default LoginStackLayout