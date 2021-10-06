import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Alert
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import SearchDropDown from './Result';
import axios from 'axios';
import { max, set } from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
export default function Autocomplete({navigation}) {



  const [dataSource,setDataSource] = useState([])

  const [colors] = useState(['#84DCC6', '#FEC8C8', '#F7E4CF', "#E8DEF3",])

  const isearch=(text)=>{
  
  Promise.all([
  axios.get(`http://192.168.29.160:8080/cures/isearch/combo/${text}`)

    .then(res => res.data),
  ]).then((diseaseData) => {
    console.log(diseaseData)
    setDataSource(diseaseData);

    // axios.get(`http://192.168.29.160:8080/cures/isearch/combo/${param.type}`)
    // .then((res) => res.json())
    // .then((json) => {
    //   console.log(json);
  
    //     setisLoaded(true)
    //     setItem(json)

    // }); 

  })
  // .then(() => {
  //   speciality.map((i) => {
  //     spec1.push(i[3])
  //   })
  // })
  .catch(res => {
     console.error(res)
  })

}




  const [isLoaded,setisLoaded]=useState(false)
  
  const [filtered, setFiltered] = useState(dataSource)

  const [searching, setSearching] = useState(false)

  const [value,setValue]=useState([])


   const result=(text)=>{
     if(text)
     {

     
navigation.navigate("Result")
     
   }
   else{
     Alert.alert('type something')
   }

  }



  const onSearch = (text) => {
    setValue(null)
    if (text) {
      
      console.log('if'+text)
      isearch(text)
     
      setSearching(true)
    
       
  
     
  
     
    }
    else {
      
      console.log('else')
      
     
  
    }
   
  }
  
  const getItem = (([item]) =>{
  

    return (
    
       

        <FlatList data={item} renderItem={({item}) =><TouchableOpacity onPress= {()=>setValue(item) & setSearching(false)} ><View style={styles.itemView}><Text style={styles.itemText}>{item}</Text></View></TouchableOpacity>} />
// {/*              
//             <Text style={styles.itemText}>{item}</Text>
//             */}
          
         
           
        
       

        
    )
}
  )
  
  return (
    <View style={styles.container}>
      
 <Searchbar
   style={styles.textInput}
   placeholder="Search for articles"
   placeholderTextColor='lightgrey'
   value={value}
   returnKeyType='go'
      onSubmitEditing={result}
      onChangeText={onSearch}
    
       />
    
      <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20, }}> </Text>
        <View style={{
          flexWrap: 'wrap', flexDirection: 'row',
          justifyContent: 'center'

        }}>
          
        </View>

      </View>


      
     {searching &&
     
      <TouchableOpacity
      
      style={styles.containers}>
      
      <View >
        
          {  
          
            dataSource.length ?
              
               getItem(dataSource)

                  :
                
                  <View
                      style={styles.noResultView}>
                      <Text style={styles.noResultText}>No search items matched</Text>
                      
                  </View>
          }
           

      </View>
  </TouchableOpacity>
}


      {/* your components can stay here like anything */}
      {/* and at the end of view */}
      {/* {
        searching &&
        <SearchDropDown
        
          onPress={ ()=> 
            setSearching(false)
     } 
          dataSource={filtered} />
      } */}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // borderColor:'black',
    alignItems: 'center',
    marginTop: '20%',
    flex: 1

  },
  containers: {
    position: 'absolute',
    top: 0,
    left: 0, right: 0, bottom: 0,
    zIndex: 999,
   overflow:'scroll'


},
  textInput: {
    backgroundColor: '#fff',
    width: 350,
    borderRadius:4,
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginTop: -50
  },

itemView: {
 

  borderWidth:1,
    borderColor:'black',
    backgroundColor: 'aliceblue',
    height: 30,
    width: '100%',
  justifyContent:'center',
  alignItems:'center',
  padding: 15,
    zIndex: 999
    

},
itemText: {
    color: 'black',
    paddingHorizontal: 10,
    fontSize: 17,
    zIndex: 999
},
noResultView: {
    alignSelf: 'center',
    // margin: 20,
    height: 100,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
},
noResultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
},
});