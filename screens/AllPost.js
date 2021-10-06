import React,{useState,useEffect} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,BackHandler,Alert,TouchableOpacity} from 'react-native';
import { useTheme } from '@react-navigation/native';
import axios from 'axios';
// import { Searchbar } from 'react-native-paper';
import { Link } from 'react-router-dom';
const AllPost = ({id, title, f_title, w_title}) => {
    console.log('id: ', id)
        return (
            <>
            <View >
                <View  >
                    {/* <View className="card-body"> */}
                        
                            <View className="d-flex justify-content-between align-items-center">
                            <View>
                            <Link to={ `/blog/${id}` }  className="d-flex justify-content-between align-items-center">
                            <View className="pb-2"> {title}</View>
                            </Link>
                            </View>
                            
                            </View>
                        
                        <View >
                         
                        <View className="pb-2">{w_title}</View>
                        </View>
                    {/* </View> */}
                </View>
            </View>
        
            </>
        )    
  
  }
  
  export default AllPost;