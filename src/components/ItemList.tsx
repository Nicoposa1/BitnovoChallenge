import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {   setCountryCode, setCurrencySelected } from '../store/currencySlice';
import { Country, CurrencyName, Fonts } from '../interfaces/General';
import { Colors } from '../constants/Colors';
import ArrowRight from '../assets/icons/arrow-right.svg';
import { useNavigation } from '@react-navigation/native';
import EuroIcon from '../assets/union-europea.svg';
import DollarIcon from '../assets/usa.svg';
import PoundIcon from '../assets/reino-unido.svg';
import CheckIcon from '../assets/icons/check.svg';
import Spain from '../assets/Spain.svg';
import Ecuatorial from '../assets/Ecuatorial.svg';
import Grec from '../assets/Grec.svg';
import Georgia from '../assets/Georgia.svg';
import Guatemala from '../assets/Guatemala.svg';
import Guayana from '../assets/Guayana.svg';
import HongKong from '../assets/HongKong.svg';
import Honduras from '../assets/Honduras.svg';

const svgMapping: { [key: string]: React.FC<any> } = {
  EUR: EuroIcon,
  USD: DollarIcon,
  GBP: PoundIcon,
  '+34': Spain,
  '+240': Ecuatorial,
  '+30': Grec,
  '+500': Georgia,
  '+502': Guatemala,
  '+592': Guayana,
  '+852': HongKong,
  '+504': Honduras,
};


interface ItemListProps {
  item: CurrencyName | Country;
  itemSelected?: CurrencyName | Country;
}


const ItemList: React.FC<ItemListProps> = ({ item, itemSelected }) => {
  const SvgComponent = svgMapping[item.code];
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => {
      navigation.goBack();
      if ('symbol' in item) {
        dispatch(setCurrencySelected(item));
      } else {
        dispatch(setCountryCode(item));
      }
    }}>
      <View style={styles.itemSubContainer}>
        {SvgComponent && <SvgComponent width={50} height={50} />}
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subTitle}>{item.code}</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        {itemSelected?.code === item.code ? (
          <CheckIcon width={20} height={20} />
        ) : (
          <ArrowRight width={20} height={20} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginHorizontal: 10,
  },
  itemSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: Fonts.MulishBold,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.gray,
    fontFamily: Fonts.MulishRegular,
  },
});

export default ItemList;