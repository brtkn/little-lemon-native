import { View, Text, StyleSheet } from "react-native";

export default SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SplashScreen!!!! Is here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
  },
});
