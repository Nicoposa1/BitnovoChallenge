import React, { useState, useCallback } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/Colors';
import ArrowLeft from '../assets/icons/arrow-left.svg';
import ItemList from '../components/ItemList';
import { Country, Fonts } from '../interfaces/General';
import { Searcher } from '../components/Searcher';

export const PhoneCodeScreen: React.FC = () => {
  const countries = useSelector((state: any) => state.currency.countries);
  const countryCode = useSelector((state: any) => state.currency.countryCode);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const filteredCountries = countries.filter((country: Country) =>
    country.name.toLowerCase().includes(searchText.toLowerCase()) ||
    country.code.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = useCallback(({ item }: { item: Country }) => (
    <ItemList item={item} itemSelected={countryCode} />
  ), [countryCode]);

  const keyExtractor = useCallback((item: Country) => `${item.code}-${Math.random().toString(36).substr(2, 9)}`, []);


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.btn} onPress={handleGoBack}>
            <ArrowLeft />
          </TouchableOpacity>
          <View style={styles.spacer} />
          <Text style={styles.title}>Seleccionar país</Text>
          <View style={styles.spacer} />
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Searcher searchText={searchText} setSearchText={setSearchText} />
          <FlatList
            data={filteredCountries}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

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
    fontFamily: Fonts.MulishBold,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
