import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import appColors from '../assets/theme/appColors';

export default function ProfileScreen() {
  const {selectedColor} = useSelector(state => state.appReducer)

 const categories = [
   {
     title: '',
     icon: '',
     color: ''
   }
 ]
  
  const colors = {
    background:
      selectedColor === "gold" ? appColors.lightGray : appColors.black,
    headerBg: selectedColor === "gold" ? appColors.white : appColors.lightBlack,
    text: selectedColor === "gold" ? appColors.black : appColors.white,
    light: selectedColor === "gold" ? appColors.gray : appColors.gray,
    main: selectedColor === "#000" ? appColors.gold : selectedColor,
  };

  return (
    <View style={{
      backgroundColor: colors.background,
      flex: 1
    }}>
      
    </View>
  )
}

const styles = StyleSheet.create({})