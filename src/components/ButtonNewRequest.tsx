import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../constants/Colors';
import WalletIcon from '../assets/icons/wallet.svg';
import { Fonts } from '../interfaces/General';

interface ButtonNewRequestProps {
  title: string;
  onPress: () => void;
  logo?: boolean;
}

export const ButtonNewRequest: React.FC<ButtonNewRequestProps> = ({
  title,
  onPress,
  logo = true, 
}) => {
  return (
    <TouchableOpacity style={styles.backgroundButton} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
      {logo && <WalletIcon />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.tertiary,
    paddingVertical: 18,
    fontWeight: '600',
    marginRight: 12,
    fontFamily: Fonts.MulishSemiBold,
  },
  backgroundButton: {
    backgroundColor: '#F9FAFC',
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});