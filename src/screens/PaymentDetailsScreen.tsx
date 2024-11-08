import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { Alert, Dimensions, Keyboard, KeyboardAvoidingView, Linking, SafeAreaView, Share, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { orders_info_read } from '../services/orders';
import { setCountryCode, setPaymentInfo } from '../store/currencySlice';
import MoneyTimeIcon from '../assets/money-time.svg';
import LinkIcon from '../assets/icons/link.svg';
import ScanIcon from '../assets/icons/scan-qr.svg';
import MailIcon from '../assets/icons/mail.svg';
import ShareIcon from '../assets/icons/share.svg';
import { Colors } from '../constants/Colors';
import * as Clipboard from 'expo-clipboard';
import { ButtonNewRequest } from '../components/ButtonNewRequest';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../interfaces/Navigation';
import { Fonts } from '../interfaces/General';
import { ItemShareWhatsApp } from '../components/ItemShareWhatsApp';
import { ModalShareSuccessful } from '../components/ModalShareSuccessful';

export const PaymentDetailsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const paymentDetails = useSelector((state: any) => state.currency.paymentDetails);
  const paymentInfo = useSelector((state: any) => state.currency.paymentInfo);
  const valueAmount = useSelector((state: any) => state.currency.valueAmount);
  const countryCode = useSelector((state: any) => state.currency.countryCode);
  const [modalVisible, setModalVisible] = useState(false);
  const [number, setNumber] = useState('');
  const [numberToShow, setNumberToShow] = useState('');

  const fetchPaymentDetails = useCallback(async () => {
    try {
      const response = await orders_info_read(paymentDetails.identifier);
      dispatch(setPaymentInfo(response));
    } catch (error) {
      console.error('Error getting payment details:', error);
    }
  }, [dispatch, paymentDetails.identifier]);

  useEffect(() => {
    if (paymentDetails.identifier) {
      fetchPaymentDetails();
    }
  }, [fetchPaymentDetails, paymentDetails.identifier]);

  useEffect(() => {
    if (paymentDetails.identifier) {
      const ws = new WebSocket(`wss://payments.pre-bnvo.com/ws/merchant/${paymentDetails.identifier}`);
      ws.onopen = () => {
        console.log('WebSocket connection opened');
      };
      ws.onmessage = () => {
        navigation.navigate('PaymentSuccesfulScreen');
      };
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        Alert.alert('Error de conexión', 'Ocurrió un error al conectar con el servidor de pagos.');
      };
      return () => {
        if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
          ws.close();
        }
      };
    }
  }, [paymentDetails.identifier, navigation]);

  const handleShare = useCallback(async () => {
    if (paymentDetails.web_url) {
      try {
        await Share.share({
          message: `Paga usando este enlace: ${paymentDetails.web_url}`,
        });
      } catch (error) {
        console.error('Error sharing payment link:', error);
      }
    }
  }, [paymentDetails.web_url]);

  const renderAmountWithSymbol = useCallback((amount: number, fiat: string) => {
    switch (fiat) {
      case 'USD':
        return <Text style={styles.headerSubtitle}>${amount}</Text>;
      case 'EUR':
        return <Text style={styles.headerSubtitle}>{amount} €</Text>;
      case 'GBP':
        return <Text style={styles.headerSubtitle}>{amount} £</Text>;
      default:
        return <Text style={styles.headerSubtitle}>{amount} {fiat}</Text>;
    }
  }, []);

  const getShortenedUrl = useCallback((url: string) => {
    return url.replace(/^https?:\/\//, '');
  }, []);

  const copyToClipboard = useCallback(() => {
    if (paymentDetails.web_url) {
      Clipboard.setString(paymentDetails.web_url);
      Alert.alert('Enlace copiado', 'El enlace de pago se ha copiado al portapapeles');
    }
  }, [paymentDetails.web_url]);

  const sendEmail = useCallback(() => {
    if (paymentDetails.web_url) {
      const emailUrl = `mailto:?subject=Enlace de pago&body=Paga usando este enlace: ${paymentDetails.web_url}`;
      Linking.openURL(emailUrl).catch((error) => {
        console.error('Error opening email client:', error);
      });
    }
  }, [paymentDetails.web_url]);


  const sendFunction = useCallback(() => {
    if (!countryCode.code || !number) {
      alert("Por favor, ingresa un número de WhatsApp completo.");
      return;
    }
    const phoneNumber = `${countryCode.code}${number.replace(/\s/g, '')}`;
    const message = "Link de pago: " + paymentDetails.web_url;
    console.log("🚀 ~ sendFunction ~ phoneNumber:", phoneNumber)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    setModalVisible(true);

    Linking.openURL(whatsappUrl).catch(() => {
      alert("No se pudo abrir WhatsApp. Asegúrate de que esté instalado.");
    });
  }, [countryCode.code, number, paymentDetails.web_url]);

  const filteredPaymentInfo = useMemo(() => paymentInfo.length > 0, [paymentInfo]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.subContainer}>
            <View style={{ paddingVertical: 16 }}>
              {filteredPaymentInfo && (
                <>
                  <View style={styles.headerContainer}>
                    <MoneyTimeIcon />
                    <View>
                      <Text style={styles.headerTitle}>Solicitud de pago</Text>
                      {renderAmountWithSymbol(valueAmount, paymentInfo[0].fiat)}
                    </View>
                  </View>
                  <Text style={styles.headerTitle}>Comparte el enlace de pago con el cliente</Text>
                </>
              )}
            </View>
            <View style={styles.secondSection}>
              <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.linkContainer} onPress={copyToClipboard}>
                  <LinkIcon />
                  <Text style={styles.linkTxt}>{getShortenedUrl(paymentDetails.web_url)}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.qrBtn} onPress={() => navigation.navigate('QRShareScreen', { qrCode: paymentDetails.web_url })}>
                  <ScanIcon />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <TouchableOpacity style={[styles.linkContainer, { marginTop: 16 }]} onPress={sendEmail}>
                  <MailIcon />
                  <Text style={styles.linkTxt}>Enviar por correo electrónico</Text>
                </TouchableOpacity>
              </View>
              <ItemShareWhatsApp
                onPress={() => navigation.navigate('PhoneCodeScreen')}
                number={number}
                setNumber={setNumber}
                sendFunction={sendFunction}
              />
              <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <TouchableOpacity style={[styles.linkContainer, { marginTop: 16 }]} onPress={handleShare}>
                  <ShareIcon />
                  <Text style={styles.linkTxt}>Compartir con otras aplicaciones</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ButtonNewRequest
            title="Nueva solicitud"
            onPress={() => {
              navigation.navigate('CreatePaymentScreen');
              dispatch(setCountryCode({}));
            }}
          />
          <ModalShareSuccessful
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  subContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: Fonts.MulishBold,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Fonts.MulishRegular,
    marginLeft: 10,
    color: Colors.gray,
  },
  headerSubtitle: {
    fontSize: 34,
    fontWeight: '700',
    marginLeft: 10,
    color: Colors.primary,
    fontFamily: Fonts.MulishBold,
  },
  secondSection: {
    marginTop: 20,
    width: Dimensions.get('window').width - 60,
    height: 300,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grayLine,
    borderRadius: 6,
    flex: 1,
  },
  qrBtn: {
    backgroundColor: Colors.tertiary,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginLeft: 10,
  },
  linkTxt: {
    marginLeft: 10,
    color: Colors.gray,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Fonts.MulishRegular,
  },
});
