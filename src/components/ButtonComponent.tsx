import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { Fonts } from '../interfaces/General'

export const ButtonComponent = ({ title, onPress, active, loading }: {
  title: String,
  onPress: () => void,
  active?: boolean,
  loading?: boolean,
}) => {
  return (
    <TouchableOpacity style={[styles.backgroundButton, { backgroundColor: active ? Colors.tertiary : Colors.lightBlue, }]} onPress={onPress} disabled={!active}>
      {
        !loading ? (
          <Text style={[styles.text, { color: active ? '#FFF' : Colors.blue }]}>{title}</Text>
        ) : (
          <ActivityIndicator size="small" color={Colors.blue} style={{paddingVertical: 18}} />
        )
      }
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  text: {
    color: Colors.blue,
    paddingVertical: 18,
    fontWeight: "600",
    fontFamily: Fonts.MulishBold,
  },
  backgroundButton: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 24,
  },
})