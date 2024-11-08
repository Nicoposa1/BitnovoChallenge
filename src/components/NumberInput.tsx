import React from 'react';
import { Dimensions, StyleSheet, TextInput } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../interfaces/General';

export const NumberInput = (
  { amount, handleAmountChange }: { amount: string, handleAmountChange: (amount: string) => void }
) => {
  return (
    <TextInput
      placeholder="0.00"
      value={amount}
      onChangeText={handleAmountChange}
      keyboardType="numeric"
      style={[styles.amountInput, { color: amount ? Colors.tertiary : Colors.gray }]}
    />
  );
};

const styles = StyleSheet.create({
  amountInput: {
    fontSize: 40,
    fontWeight: '700',
    fontFamily: Fonts.MulishSemiBold,
    textAlign: 'center',
    height: 50,
    maxWidth: Dimensions.get('window').width - 50,
  },
});
