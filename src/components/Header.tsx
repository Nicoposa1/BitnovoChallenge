import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../constants/Colors';
import ArrowDown from '../assets/icons/arrow-down.svg';
import { useSelector } from 'react-redux';
import { Fonts } from '../interfaces/General';

export const Header = ({ title, onPress }: { title: string; onPress?: () => void }) => {
  const currencySelected = useSelector((state: any) => state.currency.currencySelected);

  return (
    <View style={styles.container}>
      <View style={styles.spacer} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={onPress} style={styles.btn}>
          <Text style={styles.txt}>{currencySelected?.code || 'USD'}</Text>
          <ArrowDown />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary,
  },
  spacer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    flex: 2,
    textAlign: 'center',
    fontFamily: Fonts.MulishBold,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  btn: {
    backgroundColor: Colors.darkGray,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '700',
    marginRight: 8,
    fontFamily: Fonts.MulishBold
  },
});