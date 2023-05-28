import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import Home from "./Home";

import { validateEmail } from "../utils";

export default Onboarding = ({ navigation, setIsSignedIn, route }) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const handleFirstNameChange = (text) => {
    setFirstName(text);
    setValidFirstName(text.length > 0 && /^[a-zA-Z]+$/.test(text));
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setValidEmail(validateEmail(text));
  };

  const handleNextPress = () => {
    if (validFirstName && validEmail) {
      setIsSignedIn(true);
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require("../assets/Logo.png")} />
      </View>
      <Text style={styles.title}>Let us get to know you</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>First Name</Text>
        <TextInput
          style={[styles.input, !validFirstName && styles.invalidInput]}
          value={firstName}
          onChangeText={handleFirstNameChange}
        />
        {!validFirstName && (
          <Text style={styles.errorText}>Please enter a valid first name</Text>
        )}
        <Text style={styles.inputText}>Email</Text>
        <TextInput
          style={[styles.input, !validEmail && styles.invalidInput]}
          value={email}
          onChangeText={handleEmailChange}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {!validEmail && (
          <Text style={styles.errorText}>
            Please enter a valid email address
          </Text>
        )}
      </View>
      <Pressable
        style={[
          styles.button,
          (!validFirstName || !validEmail) && styles.disabledButton,
        ]}
        disabled={!validFirstName || !validEmail}
        onPress={handleNextPress}
      >
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: "space-around",
  },
  logo: {
    alignItems: "center",
    marginTop: 25,
  },
  title: {
    fontSize: 29,
    textAlign: "center",
    fontWeight: "800",
    color: "#495E57",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    height: 30,
    width: "80%",
    alignSelf: "center",
  },
  invalidInput: {
    borderColor: "red",
  },
  button: {
    backgroundColor: "green",
    justifyContent: "center",
    height: 40,
    width: 79,
    marginBottom: 28,
    alignSelf: "center",
    borderRadius: 9,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "800",
  },
  inputText: {
    fontSize: 22,
    margin: 20,
    alignSelf: "center",
    fontWeight: "800",
    color: "#495E57",
  },
  inputContainer: {
    justifyContent: "space-around",
  },
  errorText: {
    color: "blue",
    marginHorizontal: 20,
    alignSelf: "center",
  },
  disabledButton: {
    backgroundColor: "gray",
  },
});
