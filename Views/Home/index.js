import React from 'react'
import {Image, ImageBackground, SafeAreaView, Text, TextInput, TouchableWithoutFeedback,ActivityIndicator , View,StyleSheet,Pressable} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {_id, _secret} from "../../helpers/data.json"
import axios from 'axios';
import Informations from '../Informations';

const Home = ({navigation}) => {

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
      width: 160,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      alignSelf : 'center'
  },
  });

  const [login, onChangeLogin] = React.useState("");
  const [loading, setLoading] = React.useState(false);

//   https://api.intra.42.fr/oauth/authorize?client_id=2582e5ab9cef84a4205e746b98e7b456fd1b1b68a37c7131e974daae1b3de7ac&redirect_uri=http%3A%2F%2Flocalhost%3A19006%2F&response_type=code
  const askLogin = async () => {
    try {
        window.open("https://api.intra.42.fr/oauth/authorize?client_id=2582e5ab9cef84a4205e746b98e7b456fd1b1b68a37c7131e974daae1b3de7ac&redirect_uri=http%3A%2F%2Flocalhost%3A19006%2F&response_type=code") 

    } catch (error) {
        return null;
    }
};

  const getAccessToken = async () => {
      try {
          const token = await axios.post("https://api.intra.42.fr/oauth/token/", {
              client_id: _id,
              client_secret: _secret,
              grant_type: "client_credentials",
          });

          if (token.data) {
              console.log(token.data)
              return token.data;
          }
      } catch (error) {
          return null;
      }
  };

  const Tokeninfos = async (token) => {
    try {
        const infos = await axios.get("https://api.intra.42.fr/oauth/token/info", {
            headers: { 
                Authorization: "Bearer " + token,
            },
        });
        if (infos.data) {
            console.log(infos.data)
            return infos.infos;
        }
    } catch (error) {
        return null;
    }
};
  // console.log("hna",token)
 const getInfos = async (login, token) => {
  try {
    var response = await axios.get(
        "https://api.intra.42.fr/v2/users/" + (login.trim()).toLowerCase(),
        {
            headers: {
                Authorization: "Bearer " + token.access_token,
            },
        }
    );
    if (response.data) {
    //   console.log("datadata",response.data)
        var coalition = await axios.get(
            "https://api.intra.42.fr/v2/users/"+response.data.id+"/coalitions",
            {
                headers: {
                    Authorization: "Bearer " + token.access_token,
                },
            }
        )
        if (coalition.data) {
            setLoading(false);
            navigation.navigate("Informations", { data: response.data, coalition: coalition.data });
        }
    }
    } catch (error) {
    console.log(error.message);
    alert("login doesnt exist");
    setLoading(false);
    }
}; 


const fetchLogin = async (login) => {
    setLoading(true);
  login.trim();
  if (login && login !== "") {
      try {
          var token = await AsyncStorage.getItem("access_token");
          if (token) {
              token = JSON.parse(token);
              console.log("token kayn",token)
              if (Tokeninfos(token.access_token)) {
                  console.log("expired");
                  token = await getAccessToken();
                  if (token)
                      await AsyncStorage.setItem("access_token", JSON.stringify(token));
              }
          }
          else {
              token = await getAccessToken();
              if (token)
                  await AsyncStorage.setItem("access_token", JSON.stringify(token));
          }
          await getInfos(login, token);
      }
      catch (error) {
          console.log(error);
          alert(error);
          setLoading(false);
      }

  }
  else
      alert("you should set a login first");
      setLoading(false);
}



  return (
    <View style={styles.container} >
         {!loading ?
                    <View style={styles.viewContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeLogin}
                            value={login}
                            placeholder="Login"
                        />
                        <Pressable
                            style={styles.button}
                            onPress={() => fetchLogin(login) }
                        >
                            <Text style={styles.text}>Search</Text>
                        </Pressable>
                    </View>
                    : <ActivityIndicator size="large" color="#00b0b2" />}
    </View>
  )
}

export default Home