import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Alert,
  SectionList,
} from "react-native";
import { getSectionListData, useUpdateEffect } from "../utils/utils";
import {
  createTable,
  filterByQueryAndCategories,
  getMenuItems,
  saveMenuItems,
} from "../database";
import debounce from "lodash.debounce";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Searchbar } from "react-native-paper";
import Filters from "../Filters";

const URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

const sections = ["starters", "mains", "desserts"];

const Item = ({ name, price, description, image }) => (
  <View style={styles.item}>
    <View style={styles.itemBody}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>${price}</Text>
    </View>
    <Image
      style={styles.itemImage}
      source={{
        uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
      }}
    />
  </View>
);

/* const Item = ({ name, price, description, image, item }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomColor: "green",
      borderBottomWidth: 1,
    }}
  >
    <View style={{ width: "70%" }}>
      <Text style={styles.title}>{name}</Text>
      <Text>{description}</Text>
      <Text style={styles.price}>$ {item.map((i) => i.price)}</Text>
      <Text>{console.log(item, "1")}</Text>
      <Text>{item.map((i) => i.name)}</Text>
    </View>
    <View>
      <Image
        style={{ width: 100, height: 100, marginRight: 10 }}
        source={{
          uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
        }}
        resizeMode="contain"
      />
    </View>
  </View>
); */

const Home = ({ navigation }) => {
  const [listData, setListData] = useState([]);
  const [searchbarText, setSearchbarText] = useState("");
  const [query, setQuery] = useState("");
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    image: "",
  });

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  const fetchListData = async () => {
    try {
      const response = await fetch(URL);
      const json = await response.json();
      const menu = json.menu.map((item, index) => ({
        id: index + 1,
        name: item.name,
        price: item.price.toString(),
        image: item.image,
        category: item.category,
        description: item.description,
      }));
      return menu;
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Console log ListDATA DATA", listData);

  useEffect(() => {
    (async () => {
      let menuItems = [];
      try {
        await createTable();
        menuItems = await getMenuItems();
        console.log("get menu items worked", menuItems);
        // The application only fetches the menu data once from a remote URL
        // and then stores it into a SQLite database.
        // After that, every application restart loads the menu from the database
        if (!menuItems.length) {
          menuItems = await fetchListData();
          saveMenuItems(menuItems);
        }
        const sectionListData = getSectionListData(menuItems);
        setListData(sectionListData);
        const getProfile = await AsyncStorage.getItem("profile");
        setProfile(JSON.parse(getProfile));
      } catch (e) {
        // Handle error
        Alert.alert(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        const sectionListData = getSectionListData(menuItems);
        setListData(sectionListData);
      } catch (error) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchbarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  return (
    <View style={{ flex: 1 }}>
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
        <Searchbar
          placeholder="Search"
          placeholderTextColor="#333333"
          onChangeText={handleSearchChange}
          value={searchbarText}
          iconColor="#333333"
          style={styles.searchBar}
          inputStyle={{ color: "#333333", alignSelf: "center" }}
          elevation={0}
        />
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
        <Filters
          selections={filterSelections}
          onChange={handleFiltersChange}
          sections={sections}
        />
        <SectionList
          style={styles.sectionList}
          sections={listData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          )}
          renderSectionHeader={({ section: { name } }) => (
            <Text style={styles.itemHeader}>{name}</Text>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  foodCardText: {
    fontSize: 22,
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    padding: 5,
  },
  filterButton: {
    backgroundColor: "#ECEFEE",
    borderColor: "green",
    borderWidth: 1,
    padding: 9,
    borderRadius: 9,
  },
  sectionList: {
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    paddingVertical: 10,
  },
  itemBody: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    color: "#000000",
    paddingBottom: 5,
  },
  description: {
    color: "#495e57",
    paddingRight: 5,
  },
  price: {
    fontSize: 20,
    color: "#EE9972",
    paddingTop: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  searchBar: {
    marginBottom: 10,
    marginHorizontal: 20,
    height: 40,
  },
  itemHeader: {
    fontSize: 24,
    fontWeight: "900",
  },
});

export default Home;
