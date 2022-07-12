import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import store from "./store/store";
import Mytabs from "./navigation/MyTabs";

export default function App() {
  return (
    
    <SafeAreaProvider>
      <NavigationContainer>
        <Provider store={store}>
        <Mytabs/>
        </Provider>
        
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

