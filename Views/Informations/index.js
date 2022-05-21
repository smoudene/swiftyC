import React from 'react'
import {Image, ImageBackground , SafeAreaView, Text, TextInput, useWindowDimensions, View,StyleSheet,Pressable, ScrollView} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Picker } from "@react-native-picker/picker";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


const Informations = ({route, navigation}) => {
  const [selectedValue, setSelectedValue] = React.useState("42Cursus");
  const userData  = route.params.data
  const coalitionsData = route.params.coalition
  const [checked, setChecked] = React.useState(true);
  const imageCover = coalitionsData[0].image_url
  const colName = coalitionsData[0].name
  const lenghtC = userData?.cursus_users.length

  var radio_props = [
    {label: ' Projects  ', value: 0 },
    {label: ' Achievements', value: 1}
  ];
  const achievements = () => (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.cardS}>
          {
            userData?.achievements.map((item, i) => {
              return (
                <Card style={styles.cardc} key={i}>
                  <Card.Content>
                    <Title>{item.name}</Title>
                    <Paragraph style={styles.textI}>{item.description}</Paragraph>
                  </Card.Content>
                </Card>
              )
          })
          }
        </View>
        </ScrollView> 
      </SafeAreaView>
  );
  
  const projects = () => (
    <SafeAreaView>
          <View style={styles.cardS}>
            {
              userData?.projects_users.map((item, i) => {
                return (
                  <Card style={styles.cardc} key={i}>
                    <Card.Content>
                      <Title>{item.project.name}</Title>
                      <Paragraph style={styles.textI}>{ `${item.status}` + " " + `${item.final_mark ? item.final_mark : "" }`}</Paragraph>
                    </Card.Content>
                  </Card>
                )
            })
            }
          </View>
      </SafeAreaView>
  )

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor : "#011F26"
    },
    input: {
      height: 40,
      width: "80%",
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    button1: {
      backgroundColor: "#7CE019",
      width: '80%',
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
  },
  container1:{
    flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      backgroundColor : "#5C7373",
      margin : 5,
      borderRadius : 10,
      

  },
  cardS:{
    margin: 10
  },
  cardc:{
    margin: 5,
    borderRadius:10,
    backgroundColor : "#5C7373"
  },
  scroll: {
    width: "100%",
    height: "100%",
  },
  textI : {
    color : "#f1f2f3",
    marginBottom : 2
  },
  radios : {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageB: {
    flex: 1,
    width : 100,
    height : 100
  },
  });


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
              <View>
                {console.log("datatatata",coalitionsData)}
                  {/* <Pressable
                  style={styles.button1}
                  onPress={()=> console.log("data", userData, "coalitions", coalitionsData,"lenghtttt===",lenghtC)}
                  >
                  </Pressable> */}
                  <View style={styles.container1}>
                    <Image
                    style={{
                      // width: 50,
                      // height: 50,
                      overflow: 'hidden',
                      // resizeMode: 'cover',
                      // position : 'absolute',
                      // left : 0,
                      // top : 2,
                    }}
                    // source={ imageCover }
                    source={{uri : imageCover , width: 50, height: 20,}}
                    /> 
                    <Text
                      style={{
                        position : 'absolute',
                        left : 60,
                        top :  15
                      }}>{colName}</Text>
                    {/* <Text></Text> */}
                  <Image
                    style={{
                      borderRadius: 100,
                      width: 90,
                      height: 90,
                      overflow: 'hidden',
                      resizeMode: 'cover',
                    }}
                    // source={ userData?.image_url }
                    source={{ uri: userData?.image_url }}
                    />
                    <Text style={styles.textI}>Full Name : {userData?.displayname}</Text>
                    <Text style={styles.textI}>Login : {userData?.login}</Text>
                    <Text style={styles.textI}>Email : {userData?.email}</Text>
                    <Text style={styles.textI}>Correction Points : {userData?.correction_point}</Text>
                    <Text style={styles.textI}>level : {userData?.cursus_users[lenghtC - 1].level}</Text>
                    {/* <Progress.Bar progress={userData.cursus_users[0].level} width={200} /> */}
                    {/* </ImageBackground> */}
                  </View>
                  <View style={styles.radios}>
                    
                      <RadioForm  
                      radio_props={radio_props}
                      initial={0}
                      onPress={(checked) => { setChecked(() => !checked)       
                        }}
                        formHorizontal={true}
                        labelColor="white"
                        selectedLabelColor="whitesmoke"
                        buttonColor="#5C7373"
                        selectedButtonColor="#027368"
                        buttonWrapStyle = {{
                          marginLeft : 5
                        }}
                      />
                  </View>
                  <View>
                 { console.log("checkeddddd",checked)}
                    {
                      checked != 0 ? 
                          projects()  
                       : 
                        achievements()   
                  }
                  </View>
                
              </View>
          </ScrollView>
    </SafeAreaView>
  )
}

export default Informations