import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import { RootStackParamList } from '../interfaces/Navigation';
import { Colors } from '../constants/Colors';
import ArrowLeft from '../assets/icons/arrow-left.svg'
import InfoIcon from '../assets/icons/info.svg'
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Fonts } from '../interfaces/General';

type QRShareScreenRouteProp = RouteProp<RootStackParamList, 'QRShareScreen'>;

export const QRShareScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<QRShareScreenRouteProp>();
  const { qrCode } = route.params;
  const paymentInfo = useSelector((state: any) => state.currency.paymentInfo);
  const valueAmount = useSelector((state: any) => state.currency.valueAmount);

  const renderAmountWithSymbol = (amount: number, fiat: string) => {
    switch (fiat) {
      case 'USD':
        return (
          <Text style={styles.headerSubtitle}>
            ${amount}
          </Text>
        );
      case 'EUR':
        return (
          <Text style={styles.headerSubtitle}>
            {amount} €
          </Text>
        );
      case 'GBP':
        return (
          <Text style={styles.headerSubtitle}>
            {amount} £
          </Text>
        );
      default:
        return (
          <Text style={styles.headerSubtitle}>
            {amount} {fiat}
          </Text>
        );
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.btn} onPress={() => { navigation.goBack() }}>
            <ArrowLeft
            />
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <InfoIcon />
          <Text style={styles.textInfo}>Escanea el QR y serás redirigido a la pasarela de pago de Bitnovo Pay.</Text>
        </View>
        <View style={styles.qrContainer}>
          <QRCode
            value={qrCode}
            size={300}
            color={Colors.primary}
          />
        </View>
        <Text style={{ textAlign: 'center' }}>
          {renderAmountWithSymbol(valueAmount, paymentInfo[0].fiat)}
        </Text>
        <Text style={[styles.headerSubtitle, { fontSize: 14, fontWeight: '400', marginTop: 24, fontFamily: Fonts.MulishRegular, }]}>
          Esta pantalla se actualizará automáticamente.
        </Text>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.tertiary,
  },
  qrContainer: {
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 6,
    marginTop: 24,
  },
  qrText: {
    fontSize: 16,
    textAlign: 'center',
  },
  header: {
    marginBottom: 20,
    backgroundColor: Colors.white,
    height: 56,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  btn: {
    padding: 4,
    backgroundColor: Colors.white,
    borderRadius: 24,
    marginLeft: 18,
  },
  infoContainer: {
    marginHorizontal: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.lightBlue,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  textInfo: {
    fontSize: 14,
    marginLeft: 10,
    color: Colors.primary,
    fontFamily: Fonts.MulishRegular,
  },
  headerSubtitle: {
    fontSize: 26,
    fontWeight: '700',
    marginLeft: 10,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Mulish-Bold',
  },
});

export default QRShareScreen;