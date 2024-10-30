import {
  FlatList,
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  View,
} from "react-native";
import data from "@/constants/dataEx.json";
import { Item } from "@/components/item";

export default function List() {
  return (
    <>
      <Text style={styles.center}>Lista</Text>
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.background}
          data={data}
          renderItem={({ item }) => (
            <Item
              name={item.nome}
              age={item.idade}
              date={item.data}
              image={item.image}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: 32,
  },
  background: {
    paddingHorizontal: 20,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    paddingVertical: 10,
  },
});
