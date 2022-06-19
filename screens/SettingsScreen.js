import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TouchableNativeFeedback,
  Animated,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import ColorPalette from "react-native-color-palette";
import { useDispatch, useSelector } from "react-redux";
import {
  setPitch,
  setRate,
  setRating,
  setSelectedColor,
} from "../store/actions/appActions";
import appColors from "../assets/theme/appColors";
import Slider from "react-native-slider";
import { Rating } from "react-native-ratings";

export default function SettingsScreen() {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const [showThemeModal, setShowThemeModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const { selectedColor, pitch, rate, rating } = useSelector(
    (state) => state.appReducer
  );

  const showModal = (item) => {
    setModalType(item);
    setShowThemeModal(!showThemeModal);
  };

  const colors = {
    background:
      selectedColor === "gold" ? appColors.lightGray : appColors.black,
    headerBg: selectedColor === "gold" ? appColors.white : appColors.lightBlack,
    text: selectedColor === "gold" ? appColors.black : appColors.white,
    light: selectedColor === "gold" ? appColors.gray : appColors.gray,
    main: selectedColor === "#000" ? appColors.gold : selectedColor,
  };

  const features = [
    {
      title: "Account",
      icon: (
        <MaterialCommunityIcons name="account" size={24} color={colors.text} />
      ),
    },
    {
      title: "Theme",
      icon: (
        <MaterialCommunityIcons
          name="theme-light-dark"
          color={colors.text}
          size={24}
        />
      ),
    },
    {
      title: "Speech",
      icon: (
        <MaterialCommunityIcons
          name="text-to-speech"
          size={24}
          color={colors.text}
        />
      ),
    },
    {
      title: "Rate",
      icon: <MaterialIcons name="star-rate" size={24} color={colors.text} />,
    },
    {
      title: "Share",
      icon: <Entypo name="share" size={24} color={colors.text} />,
    },
  ];

  //=========== modal header ===========
  const renderModalHeader = (title) => {
    return (
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: colors.main,
          height: 250,
          paddingHorizontal: 16,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center" }}
          onPress={() => setShowThemeModal(!setShowThemeModal)}
        >
          <AntDesign name="left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 40,
              fontWeight: "bold",
              color: colors.text,
            }}
          >
            {title}
          </Text>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
    );
  };

  // ============ Account Settings screen ==============
  const renderAccountScreen = () => {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {renderModalHeader("Account")}
        <View
          style={{
            marginTop: 30,
            marginHorizontal: 16,
            backgroundColor: colors.headerBg,
            borderRadius: 10,
            paddingVertical: 20,
            paddingHorizontal: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 20,
                fontWeight: "bold",
                marginRight: 20,
              }}
            >
              Name
            </Text>
            <Text
              style={{
                color: colors.text,
                fontSize: 20,
              }}
            >
              Augustine Cobbold
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 20,
                fontWeight: "bold",
                marginRight: 20,
              }}
            >
              Email
            </Text>
            <Text
              style={{
                color: colors.text,
                fontSize: 20,
              }}
            >
              augustinecobbold123@gmail.com
            </Text>
          </View>
          <View>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(appColors.red, false)}
            >
              <View
                style={{
                  width: "100%",
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  borderColor: appColors.red,
                  borderWidth: 1,
                }}
              >
                <Text style={{ color: colors.text }}>Sign out</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    );
  };

  // ================ Theme settings screen ===========
  const renderThemeScreen = () => {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {renderModalHeader("Theme")}
        <View
          style={{
            paddingHorizontal: 16,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View
            style={{
              backgroundColor: colors.headerBg,
              width: "100%",
              height: 80,
              borderRadius: 10,
            }}
          >
            <ColorPalette
              onChange={(color) => dispatch(setSelectedColor(color))}
              value={selectedColor}
              colors={["gold", "#E74C3C", "#000", "#8E44AD", "#2980B9"]}
              title={""}
              icon={<AntDesign name="checkcircleo" size={24} color="black" />}
            />
          </View>
        </View>
      </View>
    );
  };

  // ============= Slider settings screen ===========
  const slides = ["pitch", "rate"];

  const handleSliderChange = (type, value) => {
    if (type === "pitch") {
      dispatch(setPitch(value));
    } else if (type === "rate") {
      dispatch(setRate(value));
    }
  };

  const renderSlider = (type) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{}}>
          <Text
            style={{
              fontSize: 20,
              color: colors.text,
            }}
          >
            {type}
          </Text>
        </View>

        <Slider
          style={{ width: Dimensions.get("window").width - 100, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          step={0.1}
          value={type === "pitch" ? pitch : rate}
          onValueChange={(value) => handleSliderChange(type, value)}
          minimumTrackTintColor={colors.main}
          maximumTrackTintColor={colors.text}
          thumbTintColor={colors.text}
        />
      </View>
    );
  };

  // ============== Speech settings screen ===========

  const renderSpeechScreen = () => {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {renderModalHeader("Speech")}
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 30,
          }}
        >
          {slides.map((item, index) => {
            return <View key={index}>{renderSlider(item)}</View>;
          })}
        </View>
      </View>
    );
  };

  // ============== Rate settings screen ===========
  const renderRateScreen = () => {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {renderModalHeader("Rate")}
        <View
          style={{
            marginTop: 30,
            paddingHorizontal: 16,
          }}
        >
          <Rating
            type="custom"
            showRating
            onFinishRating={(value) => dispatch(setRating(value))}
            defaultRating={rating}
            style={{ paddingVertical: 16 }}
            size={20}
            style={{
              backgroundColor: colors.headerBg,
              borderRadius: 10,
              paddingVertical: 20,
            }}
          />
        </View>
      </View>
    );
  };

  // ================== Share settings screen ===========
  const renderShareScreen = () => {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {renderModalHeader("share")}
      </View>
    );
  };

  // =============== render modal ===============
  const renderModal = () => {
    return (
      <Modal visible={showThemeModal} animationType="slide" transparent={true}>
        {modalType === "Account" ? (
          renderAccountScreen()
        ) : modalType === "Theme" ? (
          renderThemeScreen()
        ) : modalType === "Speech" ? (
          renderSpeechScreen()
        ) : modalType === "Rate" ? (
          renderRateScreen()
        ) : modalType === "Share" ? (
          renderShareScreen()
        ) : (
          <View style={{ flex: 1, backgroundColor: "#fff" }}></View>
        )}
      </Modal>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {renderModal()}
      {renderModalHeader("Settings")}

      <FlatList
        data={features}
        keyExtractor={(item, index) => `settings-${item.title}-${index}`}
        renderItem={({ item, index }) => (
          <RenderFeatures
            item={item}
            index={index}
            showModal={showModal}
            colors={colors}
          />
        )}
      />
    </View>
  );
}

const RenderFeatures = ({ item, index, showModal, colors }) => {
  return (
    <TouchableNativeFeedback
      onPress={() => showModal(item.title)}
      background={TouchableNativeFeedback.Ripple(colors.main, false)}
    >
      <View
        style={{
          paddingVertical: 30,
          paddingHorizontal: 10,
          backgroundColor: colors.headerBg,
          marginVertical: 10,
          marginHorizontal: 16,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ marginRight: 20 }}>{item.icon}</View>
        <View>
          <Text
            style={{
              fontSize: 20,
              color: colors.text,
            }}
          >
            {item.title}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
