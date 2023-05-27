import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";

const HomeSecond = ({ navigation, route }) => {
  const [listData, setListData] = useState([]);

  const handleProfile = () => {
    navigation.navigate("Profile");
    console.log("Home is listData rendered/1", data);
  };

  const URL =
    "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

  const fetcData = async () => {
    try {
      const urlData = await fetch(URL);
      const data = await urlData.json();
      setListData(data.menu);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetcData();
  }, []);

  const data = listData;

  console.log("Home is listData rendered/1", data);

  const Item = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: "green",
        borderBottomWidth: 1,
      }}
    >
      <View>
        <Text style={styles.title}>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text style={styles.price}>$ {item.price}</Text>
      </View>
      <View>
        <Image
          source={{
            uri: `../assets/${item.image.replace(".jpg", ".png")}`,
          }}
          resizeMode="cover"
        />
      </View>
    </View>
  );

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Image source={require("../assets/Logo.png")} />
        <Pressable onPress={handleProfile}>
          <Image
            source={require("../assets/Profile.png")}
            resizeMode="cover"
            style={{ width: 50, height: 50, borderRadius: 20, marginRight: 18 }}
          />
        </Pressable>
      </View>
      <View style={{ backgroundColor: "#495E57" }}>
        <View>
          <Text style={{ color: "#F4CE14", fontSize: 29, padding: 5 }}>
            Little Lemon
          </Text>
          <Text
            style={{
              color: "#EDEFEE",
              fontSize: 19,
              fontWeight: "500",
              padding: 5,
            }}
          >
            Chicago
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
            padding: 5,
          }}
        >
          <Text style={{ width: "45%", color: "#EDEFEE", fontSize: 19 }}>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </Text>
          <Image
            source={require("../assets/heroImage.png")}
            resizeMode="cover"
            style={{
              height: 125,
              width: 125,
              borderRadius: 15,
              marginRight: 25,
            }}
          />
        </View>
      </View>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 24,
            fontWeight: "600",
            paddingBottom: 15,
          }}
        >
          Order for Delivery
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 5,
            borderBottomWidth: 2,
            borderBottomColor: "green",
            marginBottom: 10,
          }}
        >
          <Pressable style={styles.filterButton}>
            <Text>Starters</Text>
          </Pressable>
          <Pressable style={styles.filterButton}>
            <Text>Mains</Text>
          </Pressable>
          <Pressable style={styles.filterButton}>
            <Text>Desserts</Text>
          </Pressable>
          <Pressable style={styles.filterButton}>
            <Text>Drinks</Text>
          </Pressable>
        </View>
      </View>
      <SafeAreaView>
        <FlatList data={data} renderItem={({ item }) => <Item item={item} />} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  foodCardText: {
    fontSize: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    padding: 5,
  },
  price: {
    padding: 3,
  },
  filterButton: {
    backgroundColor: "#ECEFEE",
    borderColor: "green",
    borderWidth: 1,
    padding: 9,
    borderRadius: 9,
  },
});

export default HomeSecond;
