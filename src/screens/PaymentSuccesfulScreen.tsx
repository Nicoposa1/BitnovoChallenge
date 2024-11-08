import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BitnovoLogo from '../assets/icons/bitnovo.svg'
import SuccesfulLogo from '../assets/icons/succesful.svg'
import { ButtonComponent } from '../components/ButtonComponent'
import { Colors } from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../interfaces/Navigation'
import { ButtonNewRequest } from '../components/ButtonNewRequest'
import { Fonts } from '../interfaces/General'
import { setCountryCode } from '../store/currencySlice'
import { useDispatch } from 'react-redux'

export const PaymentSuccesfulScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12
      }}>
        <BitnovoLogo />
      </View>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <SuccesfulLogo />
        <Text style={styles.title}>Pago recibido</Text>
        <Text style={styles.subTitle}>El pago se ha confirmado con éxito</Text>
      </View>
      <ButtonNewRequest
        title={'Finalizar'}
        onPress={() => {
          navigation.navigate('CreatePaymentScreen')
          dispatch(setCountryCode({}));
        }}
        logo={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  title: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    fontFamily: Fonts.MulishBold,
  },
  subTitle: {
    color: Colors.gray,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 16,
    fontFamily: Fonts.MulishRegular
  }
})