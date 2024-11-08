import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import SearchIcon from '../assets/icons/search.svg'
import { Colors } from '../constants/Colors'

export const Searcher = ({
  searchText,
  setSearchText
}: {
  searchText: string,
  setSearchText: (text: string) => void
}) => {
  return (
    <View style={styles.input}>
      <SearchIcon />
      <TextInput
        placeholder="Buscar"
        style={{ flex: 1, marginLeft: 10 }}
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    marginHorizontal: 10,
    height: 48,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  }
})