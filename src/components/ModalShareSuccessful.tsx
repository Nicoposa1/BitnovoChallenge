import React, { useCallback } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '../constants/Colors';
import { Fonts } from '../interfaces/General';
import CheckIcon from '../assets/icons/checkIcon.svg';
import { ButtonComponent } from './ButtonComponent';

interface ModalShareSuccessfulProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

export const ModalShareSuccessful: React.FC<ModalShareSuccessfulProps> = ({ modalVisible, setModalVisible }) => {
  const handleClose = useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
      visible={modalVisible}
    >
      <BlurView intensity={5} style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <CheckIcon />
            <Text style={styles.text}>Solicitud enviada</Text>
            <Text style={styles.subText}>
              Tu solicitud de pago enviada ha sido enviada con éxito por WhatsApp.
            </Text>
          </View>
          <ButtonComponent
            title="Entendido"
            onPress={handleClose}
            active={true}
          />
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 40, 89, 0.5)',
  },
  contentContainer: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 20,
    borderRadius: 24,
    marginBottom: 50,
    paddingTop: 70,
  },
  iconContainer: {
    alignItems: 'center',
  },
  text: {
    color: Colors.primary,
    fontFamily: Fonts.MulishBold,
    fontSize: 26,
    textAlign: 'center',
    marginTop: 16,
  },
  subText: {
    color: Colors.primary,
    fontFamily: Fonts.MulishRegular,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
});
