import React,{useState} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import axios from 'axios';
import { usePasswordValidation } from "../components/hooks/usePasswordValidation";
import HomeScreen from './HomeScreen';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../components/context';

import Users from '../model/users';
import { FlatList } from 'react-native-gesture-handler';

const ResetPass= ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState({
        firstPassword: "",
        secondPassword: "",
       });
    const [message, setMessage] = useState("");
    const [isError, setError] = useState(false);
    const [status, setStatus] = useState("");
    const [buttonClick, setClicked] = useState("");
    const [data, setData] = useState([])
    const [alert, setSubmitAlert] = useState(false)
    const [submitAlert, setAlert] = useState(false)
    const [notAlert, noAlert] = useState(false)
    const [errAlert, erAlert] = useState(false)
    const [
        validLength,
        hasNumber,
        upperCase,
        lowerCase,
        match,
        specialChar,
    ] = usePasswordValidation({
email: email,
    firstPassword: password.firstPassword,
    secondPassword: password.secondPassword,
    });
    const reset=()=>
    {
        navigation.navigate('SignInScreen')
    }
  



    const { colors } = useTheme();

    const setFirst = (event) => {
        setPassword({ ...password, firstPassword: event});
      };
      const setSecond = (event) => {
        setPassword({ ...password, secondPassword: event });
      };
   


    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const loginForm = async (e, props) => {
        e.preventDefault();
        
        setClicked(1);
        axios.post(`http://192.168.29.160:8080/cures/login?cmd=login&email=${email}&psw=${password}&rempwd=on`)
         .then(res =>{ 
             setStatus({
                 status: res.status
             })
         })
         
      
        .catch(err => err)
           
        
    }
    const submitForm = async (e) => {
        e.preventDefault()
       
        setSubmitAlert(true)    
        if(validLength && upperCase && lowerCase && match && password.firstPassword){
            axios.put(`http://192.168.29.160:8080/cures/users/updatepassword`, {
                "updated_password": password.firstPassword,
                "email": email,
                })
            .then(res => {
                if(res.data =="1"){
                    setAlert(true)
                setTimeout(()=>{
                    reset()
                },1000)
               
          
            }else if(res.data == "Sorry, the email address you entered does not exist in our database."){
                noAlert(true)
                setTimeout(()=>{
                    noAlert(false)
                },4000)
            }
            else if(res.data == "0"){
                erAlert(true)
                setTimeout(()=>{
                    noAlert(false)
                },4000)
            }
          
        }
            )
            .catch(err => {
                console.log(err);
                console.log('error in Resetting')
            })
    
        }
    }


    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#00415e' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Email"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    value={email}
                    onChangeText={
                        e => setEmail(e)
                      } 
                
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            {/* { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
            } */}
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={
                         setFirst
                      } 
                />


                
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={
                     setSecond
                      } 
                />
 {
                                alert?
                                <View>
                                <FlatList
                             
                                    {...validLength ? <Text className="px-3 py-1 alert-success">Contains minimum amount of characters</Text> : <Text className="px-3 py-1 alert-danger">Minimum 8 characters required</Text>}
                              
                          
                        
                                    {...upperCase ? <Text className="px-3 py-1 alert-success">Contains uppercase character</Text> : <Text className="px-3 py-1 alert-danger">Should contain at least one uppercase character</Text>}
                                
                                    {...lowerCase ? <Text className="px-3 py-1 alert-success">Contains Lowercase</Text> : <Text className="px-3 py-1 alert-danger">Should contain at least one lowercase character</Text>}
                                  
                                  {...match ? <Text className="px-3 py-1 alert-success">Passwords match</Text> : <Text className="px-3 py-1 alert-danger">Passwords do not match</Text>}
                                
                                />
                              </View>
                            //   :null
                              : null
                            }


                
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
{/*             
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            } */}
            

         
            <View style={styles.button}>
            {
      buttonClick === 1?
        submitForm()
        : null
    }
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={submitForm}
                >
            
             
                
                    <Text style={[styles.textSign, {
                        color:'#fff',
                    
                    }]}>ResetPass</Text>
         
                </TouchableOpacity>


               
            </View>
        </Animatable.View>
      </View>
    );
};

export default ResetPass;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#00415e'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signUp:{
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,

    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#00415e'
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
