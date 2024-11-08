import React, { useCallback } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import WhatsIcon from '../assets/icons/whats.svg';
import ArrowDown from '../assets/icons/arrow-down.svg';
import { useSelector } from 'react-redux';
import { Fonts } from '../interfaces/General';

interface ItemShareWhatsAppProps {
  onPress: () => void;
  number: string;
  setNumber: (number: string) => void;
  sendFunction: () => void;
}

export const ItemShareWhatsApp: React.FC<ItemShareWhatsAppProps> = ({ onPress, number, setNumber, sendFunction }) => {
  const countryCode = useSelector((state: any) => state.currency.countryCode);
  const formatNumber = useCallback((text: string) => {
    return text.replace(/\D/g, '') 
      .replace(/(\d{3})(\d{4})(\d{0,4})/, '$1 $2 $3') 
      .trim(); 
  }, []);

  const handleNumberChange = useCallback((text: string) => {
    const formattedNumber = formatNumber(text);
    setNumber(formattedNumber);
  }, [formatNumber, setNumber]);

  const isSendButtonDisabled = number.replace(/\D/g, '').length < 5;


  return (
    <View style={styles.container}>
      {Object.keys(countryCode).length ? (
        <View style={styles.linkContainer}>
          <WhatsIcon />
          <TouchableOpacity style={styles.btnCode} onPress={onPress}>
            <Text style={[styles.linkTxt, { color: Colors.gray }]}>{countryCode.code}</Text>
            <ArrowDown />
          </TouchableOpacity>
          <TextInput
            placeholder="Número de WhatsApp"
            style={styles.textInput}
            value={number}
            onChangeText={handleNumberChange}
            keyboardType="phone-pad"
            maxLength={14}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendFunction} disabled={isSendButtonDisabled}>
            <Text style={styles.sendTxt}>Enviar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.linkContainer} onPress={onPress}>
          <WhatsIcon />
          <Text style={styles.linkTxt}>Enviar a número de WhatsApp</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grayLine,
    borderRadius: 6,
    flex: 1,
    marginTop: 16,
  },
  linkTxt: {
    marginLeft: 10,
    color: Colors.gray,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Fonts.MulishRegular,
  },
  btnCode: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    color: Colors.gray,
  },
  sendBtn: {
    backgroundColor: Colors.tertiary,
    borderRadius: 6,
  },
  sendTxt: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: Fonts.MulishBold,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});
