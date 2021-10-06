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
import HomeScreen from './HomeScreen';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../components/context';

import Users from '../model/users';

const SignInScreen = ({navigation}) => {

    const [email, setEmail] = useState("anilraina@etheriumtech.com");
    const [password, setPass] = useState("Pass123456");
    const [message, setMessage] = useState("");
    const [isError, setError] = useState(false);
    const [status, setStatus] = useState("");
    const [buttonClick, setClicked] = useState("");
    const [data, setData] = useState([])

    const verify=()=>
    {
        navigation.navigate('Verify')
    }
  



    const { colors } = useTheme();

    
   


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
    function AfterLogin() {
        
    
        if(status.status === 200){
            console.log(status.status)
            navigation.navigate('MainTabScreen')
        } else if(status.status === 401){
          return(
            <View  role="alert">{data}</View>
          )
        // } else if(status === 401){
        //   return(
        //     <div className="alert alert-secondary">Incorrect email or password!</div> 
        //   )
        } else {
          return(
            <Text className="alert alert-secondary" role="alert">Some Error Occured!</Text>
          )
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
                    returnKeyType='done'
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
                    returnKeyType='go'
                    value={password}
              onSubmitEditing={loginForm}
                    onChangeText={
                        e => setPass(e)
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
{/*             
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            } */}
            

            <TouchableOpacity>
                <Text style={{color: '#00415e', marginTop:15}} onPress={verify}  >Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
            {
      buttonClick === 1?
        AfterLogin()
        : null
    }
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={loginForm}

                >
            
             
                
                    <Text style={[styles.textSign, {
                        color:'#fff',
                    
                    }]}>Sign In</Text>
         
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signUp,{
                        borderColor: '#00415e',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#00415e'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

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
