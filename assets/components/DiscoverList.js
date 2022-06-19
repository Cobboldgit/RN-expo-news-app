import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useFonts } from "expo-font";
import axios from "axios";
import { useReadingTime } from "react-hook-reading-time";
import * as Animatable from "react-native-animatable";

export default function DiscoverList({ navigation, articleData, colors }) {
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <FlatList
      data={articleData}
      keyExtractor={(item, index) => `${item}-${index}-discover`}
      renderItem={({ item, index }) => (
        <List
          articleData={articleData}
          blog={item}
          index={index}
          navigation={navigation}
          colors={colors}
        />
      )}
      refreshControl={
        <RefreshControl
          progressBackgroundColor={"gold"}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    />
  );
}

const styles = StyleSheet.create({});

const List = ({ blog, navigation, index, colors, articleData }) => {
  const [loaded] = useFonts({
    serif: require("../fonts/PTSerif-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  let uriVar;
  try {
    if (blog.multimedia[0].url) {
      uriVar = `https://static01.nyt.com/${blog.multimedia[0].url}`;
    }
  } catch (err) {
    console.log(err);
  }

  let personName;
  if (blog.byline.person) {
    const name = blog.byline.person.map(
      (item, index) => `${item.firstname} ${item.lastname}`
    );
    personName = name;
  }

  const {
    text, // 1 min read
    minutes, // 1
    words, // 168
    time, // 0.5309090909090909
  } = useReadingTime(blog.lead_paragraph);

  return (
    <Animatable.View
    style={{
      marginBottom: index === articleData.length - 1 ? 100 : 0,
    }}
     animation="fadeInUp" delay={index * 100} useNativeDriver>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Details", {
            image: uriVar,
            headline: blog.headline.main,
            personName: personName,
            paragraph: blog.lead_paragraph,
            category: blog.keywords[0].value,
            text: text,
          })
        }
        activeOpacity={0.9}
        style={[ListStyles.blogWrapper, { backgroundColor: colors.headerBg }]}
      >
        <View style={ListStyles.imageWrapper}>
          <View
            style={{
              backgroundColor: colors.main,
              height: 100,
              width: "70%",
              position: "absolute",
            }}
          ></View>
          {uriVar != null ? (
            <Image source={{ uri: uriVar }} style={ListStyles.image} />
          ) : (
            <Image
              source={{
                uri: "https://avatarfiles.alphacoders.com/105/thumb-105223.jpg",
              }}
              style={ListStyles.image}
            />
          )}
        </View>
        <View style={ListStyles.textWrapper}>
          <Text style={[ListStyles.headline, { color: colors.text }]}>
            {blog.headline.main}
          </Text>
          <View style={ListStyles.bottomTextWrapper}>
            <View style={{ flex: 1.5 }}>
              <Image
                source={{
                  uri: "https://avatarfiles.alphacoders.com/105/thumb-105223.jpg",
                }}
                style={ListStyles.profileImage}
              />
            </View>
            <View style={{ flex: 4.5 }}>
              {personName != "" ? (
                <Text numberOfLines={1} style={ListStyles.bottomText}>
                  {personName}
                </Text>
              ) : (
                <Text style={ListStyles.bottomText}>no name</Text>
              )}
            </View>
            <View style={{ flex: 4, alignItems: "center" }}>
              <Text style={ListStyles.bottomText}>
                . {text === "less than a min" ? "below 1 min" : text}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const ListStyles = StyleSheet.create({
  blogWrapper: {
    flexDirection: "row",
    // backgroundColor: "#fff",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  imageWrapper: {
    flex: 3.5,
    paddingRight: 10,
  },
  image: {
    height: 150,
    width: "100%",
    borderWidth: 8,
    borderColor: "#fff",
    marginLeft: 10,
    marginTop: 11,
  },
  textWrapper: {
    flex: 6.5,
    padding: 10,
    justifyContent: "space-between",
  },
  headline: {
    fontFamily: "serif",
    fontWeight: "bold",
    fontSize: 20,
  },
  profileImage: {
    height: 25,
    width: 25,
    borderRadius: 23,
  },
  bottomTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomText: {
    color: "#c4c4c4",
    fontFamily: "serif",
  },
});
