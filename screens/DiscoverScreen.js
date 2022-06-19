import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import DiscoverList from "../assets/components/DiscoverList";
import { useSelector } from "react-redux";
import appColors from "../assets/theme/appColors";

export default function DiscoverScreen({ navigation }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [articleData, setArticleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("world");
  const [text, setText] = useState("");
  const [filterBy, setFilterBy] = useState(null);
  const { selectedColor } = useSelector((state) => state.appReducer);

  const openSearchBar = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showSearchBar) {
      Animated.spring(openSearchBar, {
        toValue: Dimensions.get("window").width,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(openSearchBar, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [showSearchBar]);

  const getArticleData = async () => {
    fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&api-key=C7T6xzk3S2ju7DVqLMu2odwU7SvbrWVC`
    )
      .then((res) => res.json())
      .then(
        (json) => {
          let article = json.response.docs;
          setArticleData(article);
          setLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    getArticleData();
  }, [search]);

  const [loaded] = useFonts({
    serif: require("../assets/fonts/PTSerif-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const handleShowSearchBar = () => {
    setShowSearchBar(true);
  };

  const handleSubmit = () => {
    setArticleData([]);
    setLoading(true);
    setSearch(text.trim().toLocaleLowerCase());
    setText("");
    setTimeout(() => {
      setShowSearchBar(false);
    }, 1000);
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
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <StatusBar style="auto" backgroundColor={colors.main} />
      <TouchableWithoutFeedback onPress={() => setShowSearchBar(false)}>
        <View
          style={[styles.headerWrapper, { backgroundColor: colors.headerBg }]}
        >
          <Animated.View
            style={{
              position: "absolute",
              zIndex: 1,
              width: openSearchBar,
              backgroundColor: "transparent",
              opacity: showSearchBar ? 1 : 0,
              height: 70,
              paddingHorizontal: 10,
              overflow: "hidden",
            }}
          >
            <View style={styles.SearchBarWrapper}>
              <View style={{ flex: 8.5 }}>
                <TextInput
                  defaultValue={text}
                  onChangeText={(value) => setText(value)}
                  placeholder="Search here. eg: election, fashion ,..."
                  style={[
                    styles.SearchBar,
                    {
                      borderColor: colors.background,
                      backgroundColor: colors.headerBg,
                      color: colors.text,
                    },
                  ]}
                  onSubmitEditing={() => handleSubmit()}
                  placeholderTextColor={colors.text}
                />
              </View>
              <View style={{ flex: 1.5 }}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  activeOpacity={0.6}
                  style={[
                    styles.searchButton,
                    {
                      height: styles.SearchBar.height,
                      backgroundColor: colors.main,
                    },
                  ]}
                >
                  <AntDesign name="search1" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
          <View style={styles.headerMenuDots}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile", { text: "hi" })}
            >
              <Image
                source={require("../assets/dots-menu.png")}
                style={[styles.headerDots, { tintColor: colors.text }]}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              styles.headerTitle,
              { fontFamily: "serif", color: colors.text },
            ]}
          >
            Discover
          </Text>
          <View style={styles.headerSearchBar}>
            <TouchableOpacity onPress={handleShowSearchBar}>
              <AntDesign name="search1" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.bodyWrapper}>
        {loading ? (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator size="large" color="gold" />
          </View>
        ) : (
          <DiscoverList
            navigation={navigation}
            articleData={articleData}
            colors={colors}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  SearchBarWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  SearchBar: {
    borderWidth: 1,
    // borderColor: "gold",
    width: "100%",
    height: 40,
    paddingLeft: 10,
    backgroundColor: "white",
  },
  searchButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gold",
  },
  headerWrapper: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    paddingVertical: 25,
  },
  headerMenuDots: {},
  headerDots: {
    height: 25,
    width: 25,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "bold",
  },
  headerSearchBar: {},
  bodyWrapper: {
    flex: 9,
  },
});
