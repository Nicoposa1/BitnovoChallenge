import { FlatList, Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Colors } from '../constants/Colors';
import { useSelector } from 'react-redux';
import ArrowLeft from '../assets/icons/arrow-left.svg'
import ItemList from '../components/ItemList';
import { useNavigation } from '@react-navigation/native';
import { CurrencyName, Fonts } from '../interfaces/General';
import { Searcher } from '../components/Searcher';

export const SelectCurrencyScreen = () => {
  const currencies = useSelector((state: any) => state.currency.currencies);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const currencySelected = useSelector((state: any) => state.currency.currencySelected);

  const filteredCurrencies = currencies.filter((currency: any) =>
    currency.name.toLowerCase().includes(searchText.toLowerCase()) ||
    currency.code.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = useCallback(({ item }: { item: CurrencyName }) => (
    <ItemList item={item} itemSelected={currencySelected} />
  ), [currencySelected]);

  const keyExtractor = useCallback((item: CurrencyName) => `${item.code}-${Math.random().toString(36).substr(2, 9)}`, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => { navigation.goBack() }}>
            <ArrowLeft
            />
          </TouchableOpacity>
          <View style={styles.spacer} />
          <Text style={styles.title}>Selecciona una moneda</Text>
          <View style={styles.spacer} />
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Searcher
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <FlatList
            data={filteredCurrencies}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  btn: {
    padding: 4,
    backgroundColor: Colors.white,
    borderRadius: 24,
  },
  spacer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary,
    fontFamily: Fonts.MulishBold
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
})