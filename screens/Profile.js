import React, { useState } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Profile = ({ navigation, route }) => {
  const firstName = route.firstName;
  const email = route.email;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstNameValue, setFirstNameValue] = useState(firstName);
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState(email);
  const [notificationValue, setNotificationValue] = useState(false);

  const handleSignOutPress = async () => {
    try {
      // Remove all data from AsyncStorage
      await AsyncStorage.multiRemove([
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "notification",
      ]);
      navigation.navigate("Onboarding");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveChangesPress = async () => {
    navigation.navigate("Home");
    try {
      // Save all input values to AsyncStorage
      await AsyncStorage.multiSet([
        ["firstName", firstNameValue],
        ["lastName", lastNameValue],
        ["email", emailValue],
        ["phoneNumber", phoneNumber],
        ["notification", notificationValue ? "true" : "false"],
      ]);
      alert("Changes saved successfully!");
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View>
      <Text style={styles.title}>Personal Information {route.firstName}</Text>
      <Text style={styles.inputText}>Welcome First Name {firstName}!</Text>
      <TextInput style={styles.input} />
      <Text style={styles.inputText}> Last Name {firstName}</Text>
      <TextInput style={styles.input} autoCapitalize="none" />
      <Text style={styles.inputText}>Your email is {email}</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Text style={styles.inputText}>Your Phone Number</Text>
      <MaskedTextInput
        style={styles.input}
        keyboardType="phone-pad"
        mask={"(999) 999-9999"}
        value={phoneNumber}
        onChangeText={(formatted, extracted) => {
          setPhoneNumber(extracted);
        }}
      />
      <Text style={styles.inputText}>Email Notifications!</Text>
      <View style={styles.checkboxContainer}>
        <Checkbox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Text style={styles.checkboxText}>Order Status</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Text style={styles.checkboxText}>Password Changes</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Text style={styles.checkboxText}>Special Offers</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Text style={styles.checkboxText}>Newsletter</Text>
      </View>

      <Pressable onPress={handleSignOutPress} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </Pressable>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Pressable onPress={handleSignOutPress} style={styles.buttonSecondary}>
          <Text style={styles.buttonText}>Discard Changes</Text>
        </Pressable>
        <Pressable
          onPress={handleSaveChangesPress}
          style={styles.buttonSecondary}
        >
          <Text style={styles.buttonText}>Save Changes</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  logo: {
    alignItems: "center",
    marginTop: 25,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    height: 30,
    margin: 15,
  },
  invalidInput: {
    borderColor: "red",
  },
  button: {
    backgroundColor: "yellow",
    justifyContent: "center",
    height: 40,
    width: "80%",
    marginBottom: 28,
    alignSelf: "center",
    borderRadius: 9,
  },
  buttonSecondary: {
    backgroundColor: "green",
    justifyContent: "center",
    height: 40,
    width: "40%",
    marginBottom: 28,
    alignSelf: "center",
    borderRadius: 9,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  inputText: {
    fontSize: 20,
    textAlign: "center",
  },
  inputContainer: {
    justifyContent: "space-between",
  },
  errorText: {
    color: "red",
    marginHorizontal: 20,
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  checkboxContainer: {
    flexDirection: "row",
    padding: 12,
  },
  checkboxText: {
    marginLeft: 9,
    alignSelf: "center",
  },
});
