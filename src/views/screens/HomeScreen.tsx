import { KeyHeader } from '@/components/KeyHeader'
import { KeysValuesCard } from '@/components/KeysValuesCard'
import { Keys } from '@/models/Keys'
import { KeysLocalService } from '@/services/KeysLocalService'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

export default function HomeScreen() {

  const [keys, setKeys] = useState<Keys[]>([])

  async function getKeys() {
    const response = await KeysLocalService.getKeys();
    setKeys(response);
    console.log("Keys:", response);
  }

  useEffect(() => {
    getKeys();
  }, [])

  return (
    <View>
      <KeyHeader/>
      {/*  */}
      <FlatList data={keys} keyExtractor={(item, index) => item.id || `key${index}`} renderItem={({item}) => (
        <KeysValuesCard keys={item} />
      )}/>
    </View>
  )
}

const styles = StyleSheet.create ({
  container: {

  }
  
})