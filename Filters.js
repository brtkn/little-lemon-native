import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          onPress={() => {
            onChange(index);
          }}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 12,
            backgroundColor: selections[index] ? "#EE9972" : "#495E57",
            borderWidth: 1,
            borderColor: "white",
            height: 45,
            borderRadius: 12,
          }}
        >
          <View>
            <Text
              style={{
                color: selections[index] ? "black" : "white",
              }}
            >
              {section}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
});

export default Filters;
