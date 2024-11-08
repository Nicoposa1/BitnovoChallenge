import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/store';
import { useFonts } from 'expo-font';
export default function App() {

  const [loaded] = useFonts({
    'Mulish-Regular': require('./src/assets/fonts/Mulish-Regular.ttf'),
    'Mulish-Bold': require('./src/assets/fonts/Mulish-Bold.ttf'),
    'Mulish-SemiBold': require('./src/assets/fonts/Mulish-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }


  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}