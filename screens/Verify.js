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

import * as Animatable from 'react-native-animatable';
;
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';


const Verify= ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setError] = useState(false);
    const [status, setStatus] = useState("");
    const [buttonClick, setClicked] = useState("");
    const [data, setData] = useState([])

    const [submitAlert, setAlert] = useState(false)
    const [notAlert, noAlert] = useState(false)
    const [errAlert, erAlert] = useState(false)
  
    const [alert, setSubmitAlert] = useState(false)


    const { colors } = useTheme();

    const resetPass=()=>{
navigation.navigate('ResetPass')
    }
   


    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

  
    const submitForm = async (e) => {
        e.preventDefault()
        
        setSubmitAlert(true)
        if(email){
            axios.post(`http://192.168.29.170:8080/cures/users/checkemail`,
            {
                "email": email
            })
            .then(res => {
                if(res.data == 1){
                    return(
                        <Text>Check Your Email!</Text>,
                        resetPass() 
                    
                
                        
                 
                    )
                  
                
            }else {
                noAlert(true)
                setTimeout(()=>{
                    noAlert(false)
                },2000)
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
            <Text style={styles.text_header}>Verify your email</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                marginTop: 45,
                color: colors.text
            }]}>email</Text>
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
          

            

          
            <View style={styles.button}>
            {
      buttonClick === 1?
        submitForm()
        : null
    }
                <TouchableOpacity
                    style={styles.verify}
                    onPress={submitForm}
                >
            
{
                   submitAlert?
                   <Text variant="success" className="h6 mx-3">Check Your Email!</Text>
                   : null
                             }
                             
                             {
                   notAlert?
                   Alert.alert('Email not found!')
                   : null
                             }
{
                  errAlert?
                  Alert.alert('error in resetting')
                   : null
                             }
             
                
                    <Text style={[styles.textSign, {
                        color:'#fff',
                    
                    }]}>Submit</Text>
         
                </TouchableOpacity>


           
            </View>
        </Animatable.View>
      </View>
    );
};

export default Verify;

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
    verify: {
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
