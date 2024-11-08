import { Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Colors } from '../constants/Colors';
import { ButtonComponent } from '../components/ButtonComponent';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../interfaces/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { NumberInput } from '../components/NumberInput';
import { orders_create } from '../services/orders';
import { setPaymentDetails, setValueAmount } from '../store/currencySlice';
import { Fonts } from '../interfaces/General';


export const CreatePaymentScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const currencySelected = useSelector((state: any) => state.currency.currencySelected);
  const [amount, setAmount] = useState('');
  const [concept, setConcept] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [inputHeight, setInputHeight] = useState(50);
  const [buttonActive, setButtonActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setButtonActive(amount !== null && amount.toString().length > 0);
  }, [amount]);

  const handleAmountChange = (newAmount: string) => {
    setAmount(newAmount);
  };

  const handleCreatePayment = async () => {
    setButtonActive(false);
    setLoading(true);
    try {
      const orderData = {
        expected_output_amount: parseFloat(amount),
        notes: concept,
        fiat: currencySelected.code,
      };
      const response = await orders_create(orderData);
      dispatch(setPaymentDetails(response));
      dispatch(setValueAmount(amount));
      navigation.navigate('PaymentDetailsScreen');
      setButtonActive(true);
      setLoading(false);
      setAmount('');
      setConcept('');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error creating payment:', error.message);
        setLoading(false);
        setButtonActive(true);
      } else {
        console.error('Error creating payment:', error);
        setLoading(false);
        setButtonActive(true);
      }
    }
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Header title="Crear pago"
          onPress={() => {
            navigation.navigate('SelectCurrencyScreen');
          }
          }
        />
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View>
            <View style={styles.amountContainer}>
              {currencySelected?.code === 'USD' && amount !== null && amount.toString().length > 0 && <Text style={styles.currencySymbol}>$</Text>}
              <NumberInput amount={amount} handleAmountChange={handleAmountChange} />
              {currencySelected?.code !== 'USD' && amount !== null && amount.length > 0 && <Text style={styles.currencySymbol}>{currencySelected?.symbol}</Text>}
            </View>
            <View style={styles.centeredView}>
              <View style={styles.inputContainer}>
                <Text style={styles.text}>Concepto</Text>
                <TextInput
                  placeholder="Añade descripción de pago"
                  value={concept}
                  onChangeText={setConcept}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  multiline
                  onContentSizeChange={(event) => setInputHeight(event.nativeEvent.contentSize.height)}
                  style={[
                    styles.input,
                    {
                      borderColor: isFocused ? Colors.tertiary : Colors.secondary,
                      height: Math.max(50, inputHeight),
                      textAlignVertical: 'center', 
                      paddingVertical: 10, 
                    }
                  ]}
                  maxLength={140}
                />
                <Text style={styles.charCounter}>{concept.length}/140 caracteres</Text>
              </View>
            </View>
          </View>
          <View>
            <ButtonComponent title={'Continuar'}
              onPress={() => {
                handleCreatePayment();
              }}
              active={buttonActive}
              loading={loading}
            />
          </View>
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
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 64,
  },
  currencySymbol: {
    fontSize: 40,
    fontWeight: '700',
    color: Colors.tertiary,
    fontFamily: Fonts.MulishBold

  },

  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  inputContainer: {
    width: '100%',
    padding: 20,
  },
  input: {
    minHeight: 50,
    maxHeight: 160,
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 4,
    paddingHorizontal: 12,
    alignItems: 'center',
    fontFamily: Fonts.MulishRegular,
    textAlignVertical: 'center', 
    paddingVertical: 10, 
  },

  centeredView: {
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
  },
  charCounter: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
    fontWeight: '400',
    color: Colors.gray,
    fontFamily: Fonts.MulishRegular,
  },
});