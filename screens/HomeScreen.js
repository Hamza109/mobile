import React,{useState,useEffect} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,BackHandler,Alert,TouchableOpacity} from 'react-native';
import { useTheme } from '@react-navigation/native';
import axios from 'axios';
// import { Searchbar } from 'react-native-paper';

import { DrawerContent } from './DrawerContent';
import SearchDropDown from './Result';
import Autocomplete from './Autocomplete'


const HomeScreen = ({navigation}) => {

      

  const [backPressed,setBack] = React.useState(1)
  useEffect(() => {
   
BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
     BackHandler.removeEventListener("hardwareBackPress", backAction);



  },[])


  const backAction = () => {
    if(backPressed > 0)
    {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  
  }
  };
  const { colors } = useTheme();

  const theme = useTheme();

  const [value, setValue] = useState()
  function updateSearch(value) {
      //do your search logic or anything
    
      console.log(value)
  }


  
    return (
   
      <View style={styles.container}>
  <Autocomplete/>
  <View style={styles.subcontainer1}>
       
      
        <TouchableOpacity style={styles.b1}
           
            onPress={() => navigation.push("Editor")}
        ><Text style={styles.text}>Create Article</Text></TouchableOpacity>
      
        <TouchableOpacity
            title="Go back"
            onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.subcontainer2}>
      <TouchableOpacity style={styles.b2}
        
        onPress={() => navigation.navigate("Result")}
    ><Text style={styles.text}>Search</Text></TouchableOpacity>
    </View>

    
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
       

      </View>
     
    );
};


export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b9daf1' ,
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
   
  },
 
  search: {
   
position:'relative',
bottom:282,
    backgroundColor: '#fff' ,

  },
  subcontainer1: {

    position:'relative',
    bottom: 300,
    backgroundColor: '#fff',
    right:90
  },
  subcontainer2: {

    position:'relative',
    bottom: 400,
    left: 90,
    backgroundColor: '#fff',
  
  },
  b1:{
   backgroundColor:'#00415e',
   padding: 40,
 },
 b2:{
  backgroundColor:'#00415e',
  paddingTop:50,
  paddingBottom: 30,
  paddingLeft:70,
  paddingRight:70
},
  text:{
    color:'#fff',
      textAlign:'center',
    
  }

});
