import React from 'react';
import { Stack, Tabs } from 'expo-router';

import Colors from '@/shared/constants/Colors';
import TabBarIcon  from '@/shared/components/TabBarIcon';

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
