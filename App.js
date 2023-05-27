import React, { useState } from "react";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./screens/Onboarding";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const checkIsSignedIn = async () => {
    try {
      const value = await AsyncStorage.getItem("isSignedIn");
      if (value !== null) {
        setIsSignedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = async () => {
    try {
      await AsyncStorage.setItem("isSignedIn", "true");
      setIsSignedIn(true);
      navigation.navigate("Profile", {
        firstName: "Sdfsd",
        email: "sadf@sfds.co",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("isSignedIn");
      setIsSignedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    checkIsSignedIn();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Onboarding"}>
        {!isSignedIn ? (
          <Stack.Screen name="Onboarding">
            {(props) => <Onboarding {...props} setIsSignedIn={setIsSignedIn} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
