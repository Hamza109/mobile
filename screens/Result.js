import React,{useState,useEffect} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,BackHandler,Alert,TouchableOpacity} from 'react-native';
import { useTheme } from '@react-navigation/native';
import axios from 'axios';
// import { Searchbar } from 'react-native-paper';
import { Link } from 'react-router-dom';
import Autocomplete from './Autocomplete';
import AllPost from './AllPost';



const Result = ({navigation}) => {

      

  const [backPressed,setBack] = React.useState(1)
 


 

  const { colors } = useTheme();

  const theme = useTheme();

  const [value, setValue] = useState()
  function updateSearch(value) {
      //do your search logic or anything
    
      console.log(value)
  }
 const [data,setData]=useState([])
 const [offset,setOffset]=useState(0)
 const [perPage,setperPage]=useState(8)
 const [slice,setSlice]= useState()
 const [postData,setpostData]=useState()


 const receivedData=()=>{



axios.get(`http://192.168.29.160:8080/cures/article/all`)
.then(res=> {
   data=res.data
   slice = data.slice(offset, offset + perPage)
   postData=slice.map((pd)=> <View>
             
             <AllPost
                                            key={pd[0]}
                                            id = {pd[0]}
                                            title = {pd[1]}
                                            f_title = {pd[2]}
                                            w_title = {pd[6]}
                                            dis={pd[15]}
                                        />

   </View>)
})

}
useEffect(()=> {
  receivedData()
}
)
  
    return (
   
      <View style={styles.container}>
  <Autocomplete/>
 
  <View style={styles.subcontainer2}>
      <TouchableOpacity style={styles.b2}
        
        onPress={() => navigation.goBack()}
    ><Text style={styles.text}>Back</Text></TouchableOpacity>
    </View>
    
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
       

      </View>
     
    );
};


export default Result;

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
