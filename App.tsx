import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';

import './global.css';
import { LoginScreen } from './components/LoginScreen';

export default function App() {
  return (
    <>
      <LoginScreen />
    </>
  );
}
