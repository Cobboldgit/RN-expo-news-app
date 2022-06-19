import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import DiscoverScreen from "./screens/DiscoverScreen";
import FilesScreen from "./screens/FilesScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  
} from "@expo/vector-icons";
import DiscoverDetails from "./screens/DiscoverDetails";

import { Provider, useSelector } from "react-redux";
import store from "./store/store";
import ThemeSettings from "./screens/ThemeSettings";
import appColors from "./assets/theme/appColors";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DiscoverStackScreen />
      </NavigationContainer>
    </Provider>
  );
}

const HomeStack = createNativeStackNavigator();
const HomeTab = createBottomTabNavigator();

const CustomTabBar = (props) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        backgroundColor: "#000000c6",
        justifyContent: "center",
        marginHorizontal: 16,
        borderColor: "#c4c4c4",
        borderWidth: 1,
        borderRadius: 20,
        height: 70,
      }}
    >
      <BottomTabBar {...props} />
    </View>
  );
};

function DiscoverTab() {
  const { selectedColor } = useSelector((state) => state.appReducer);

  return (
    <HomeTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarBadgeStyle: { backgroundColor: "#32CD32" },
        tabBarInactiveTintColor: "#c4c4c4",
        tabBarActiveTintColor: selectedColor === "#000" ? appColors.gold : selectedColor,
        tabBarStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
     
      <HomeTab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <HomeTab.Screen
        name="File"
        component={FilesScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused ? "folder-open" : "folder-o";
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        }}
      />
      <HomeTab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarBadge: 4,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused ? "favorite" : "favorite-border";
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <HomeTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused ? "settings" : "settings-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
    </HomeTab.Navigator>
  );
}

const DiscoverStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={DiscoverTab} />
      <HomeStack.Screen name="Details" component={DiscoverDetails} />
      <HomeStack.Screen name="Profile" component={ProfileScreen} />
      <HomeStack.Screen name="theme" component={ThemeSettings} />
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
