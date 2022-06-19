import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  MaterialIcons,
  Feather,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Entypo } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { useSelector } from "react-redux";
import appColors from "../assets/theme/appColors";

export default function DiscoverDetails({ navigation, route }) {
  const [playText, setPlayText] = useState(false);
  const [favoriteList, setFavoriteList] = React.useState([]);
  const { selectedColor } = useSelector((state) => state.appReducer);
  const { pitch, rate } = useSelector((state) => state.appReducer);


  const blog = {
    image: route.params.image,
    headline: route.params.headline,
    personName: route.params.personName,
    paragraph: route.params.paragraph,
    category: route.params.category,
    timeRead: route.params.text,
  };

  const speakSpeech = () => {
    Speech.speak(blog.headline, {
      pitch: pitch,
      rate: rate,
    });
    Speech.speak(blog.paragraph);
    setPlayText(true);
  };
console.log(pitch);
  const stopSpeech = () => {
    if (Speech.stop()) {
      setPlayText(false);
    }
  };

  const [loaded] = useFonts({
    serif: require("../assets/fonts/PTSerif-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  // function to add an item to favorite list
  const onFavorite = (restaurant) => {
    setFavoriteList([...favoriteList, restaurant]);
  };

  // function to remove an item from favorite list
  const onRemoveFavorite = (restaurant) => {
    const filteredList = favoriteList.filter(
      (item) => item.id !== restaurant.id
    );
    setFavoriteList(filteredList);
  };

  // function to check if an item exists in the favorite list or not
  const ifExists = (restaurant) => {
    if (favoriteList.filter((item) => item.id === restaurant.id).length > 0) {
      return true;
    }
    return false;
  };

  const colors = {
    background:
      selectedColor === "gold" ? appColors.lightGray : appColors.black,
    headerBg: selectedColor === "gold" ? appColors.white : appColors.lightBlack,
    text: selectedColor === "gold" ? appColors.black : appColors.white,
    light: selectedColor === "gold" ? appColors.gray : appColors.gray,
    main: selectedColor === "#000" ? appColors.gold : selectedColor,
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background }]}>
      <View style={[styles.backgroundSquare, {backgroundColor: colors.main}]} />
      <ScrollView style={styles.mainWrapper}>
        <View style={styles.imageAndNavWrapper}>
          <View style={styles.navWrapper}>
            <View style={styles.navLeft}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={50}
                  color={colors.text}
                />
              </TouchableOpacity>
              <View style={{ width: "60%" }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 22,
                    fontFamily: "serif",
                    fontWeight: "bold",
                    color: colors.text,
                  }}
                >
                  {blog.category}
                </Text>
              </View>
            </View>
            <View style={styles.navRight}>
              {playText === false ? (
                <TouchableOpacity onPress={() => speakSpeech()}>
                  <Feather name="headphones" size={24} color="grey" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => stopSpeech()}>
                  <MaterialCommunityIcons
                    name="headphones"
                    size={24}
                    color={colors.main}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onLongPress={() =>
                  navigation.navigate("Favorite", { favoriteList })
                }
                onPress={() => {
                  ifExists(blog) ? onRemoveFavorite(blog) : onFavorite(blog);
                }}
              >
                <MaterialIcons
                  name={ifExists(blog) ? "favorite" : "favorite-outline"}
                  size={24}
                  color={ifExists(blog) ? colors.main : "grey"}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign name="sharealt" size={24} color="grey" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.imageWrapper}>
            {blog.image != null ? (
              <Image
                source={{
                  uri: blog.image,
                }}
                style={styles.image}
              />
            ) : (
              <Image
                source={{
                  uri: "https://avatarfiles.alphacoders.com/105/thumb-105223.jpg",
                }}
                style={styles.image}
              />
            )}
          </View>
        </View>
        <View style={styles.headlineWrapper}>
          <Text style={[styles.headline, { fontFamily: "serif" }]}>
            {blog.headline}
          </Text>
        </View>
        <View style={styles.bylineWrapper}>
          <View style={styles.bylineImageWrapper}>
            <Image
              source={{
                uri: "https://avatarfiles.alphacoders.com/105/thumb-105223.jpg",
              }}
              style={styles.bylineImage}
            />
          </View>
          <View style={styles.bylineName}>
            <Text
              numberOfLines={1}
              style={[
                styles.bylineText,
                { fontFamily: "serif", color: "grey" },
              ]}
            >
              {blog.personName}
            </Text>
          </View>
          <View style={styles.bylineTimeRead}>
            <Entypo name="dot-single" size={20} color="grey" />
            <Text style={[styles.bylineText, { fontFamily: "serif" }]}>
              {blog.timeRead}
            </Text>
          </View>
        </View>
        <View style={styles.paragraphWrapper}>
          <Text style={styles.paragraphText}>{blog.paragraph}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
  },
  mainWrapper: {
    // backgroundColor: "#f1f1f1",
    marginTop: 30,
  },
  backgroundSquare: {
    backgroundColor: "gold",
    width: 200,
    height: 230,
    position: "absolute",
  },
  imageAndNavWrapper: {
    flex: 4,
    // backgroundColor: "red",
  },
  navWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingRight: 25,
  },
  navLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 7,
  },
  navRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 3,
  },
  headlineWrapper: {
    // backgroundColor: "pink",
    flex: 2,
    marginHorizontal: 25,
    paddingVertical: 10,
  },
  headline: {
    fontSize: 18,
    fontWeight: "bold",
  },
  imageWrapper: {
    alignItems: "center",
  },
  image: {
    height: 270,
    width: "90%",
    borderWidth: 10,
    borderColor: "#fff",
  },
  bylineWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  bylineImageWrapper: {
    marginRight: 10,
  },
  bylineName: {
    marginRight: 10,
  },
  bylineTimeRead: {
    marginRight: 10,
    flexDirection: "row",
  },
  bylineImage: {
    height: 25,
    width: 25,
    borderRadius: 15,
  },
  bylineText: {
    color: "#c4c4c4",
  },
  paragraphWrapper: {
    flex: 4,
    paddingHorizontal: 25,
  },
  paragraphText: { fontFamily: "serif", fontSize: 16, color: "grey" },
});
