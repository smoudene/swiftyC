import React  from 'react'
import {Image, ImageBackground, SafeAreaView, Text, TextInput, TouchableWithoutFeedback,ActivityIndicator , View,StyleSheet,Pressable} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {_id, _secret} from "../../helpers/data.json"
import axios from 'axios';
import Informations from '../Informations';
import { useAuthRequest } from "expo-auth-session";

const Login = ({navigation}) => {

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor : "#011F26"
    },
    input: {
      height: 40,
      width: 200,
      marginBottom: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius : 5,
      backgroundColor : "#FFF"
    },
    button: {
      backgroundColor: "#5C7373",
      color : "#FFF",
      width: 160,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      alignSelf : 'center'
  },
  });

const config = {
    authorizationEndpoint: 'https://api.intra.42.fr/oauth/authorize',
    tokenEndpoint: 'https://api.intra.42.fr/oauth/token',
  };

const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: _id,
      scopes: ["public"],
      redirectUri: "exp://skmdn",
      responseType: "code",
    },
    config
  );
React.useEffect(() => {
    if (
      response?.type === "success"
    ) {
      console.log("responseeeeee: ",response.type)
      navigation.navigate("Home")
    }else if (response?.type === "error") {
        console.log("response1: ",response?.type)
        alert("login failed")
    }
    
  }, [response]);
  
  return (
    <View style={styles.container} >
        <View style={styles.viewContainer}>
            <Pressable
                style={styles.button}
                onPress={() => promptAsync()}
            >
                <Text style={styles.text}>Login with intra 42</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default Login