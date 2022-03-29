import React from 'react'
import {Image, ImageBackground,Picker , SafeAreaView, Text, TextInput, useWindowDimensions, View,StyleSheet,Pressable, ScrollView} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


const Informations = ({route, navigation}) => {
  const userData  = route.params.data
  const coalitionsData = route.params.coalition
  const [checked, setChecked] = React.useState(true);

  var radio_props = [
    {label: 'Achievements', value: 0 },
    {label: 'Projects', value: 1}
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
      backgroundColor : "#0f0f10"
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
      backgroundColor : "#2b2c2d",
      margin : 5,
      borderRadius : 10,

  },
  cardS:{
    margin: 10
  },
  cardc:{
    margin: 5,
    borderRadius:10,
    backgroundColor : "#2b2c2d"
  },
  scroll: {
    width: "100%",
    height: "100%",
  },
  textI : {
    color : "#f1f2f3"
  }
  });


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
              <View>
                  {/* <Pressable
                  style={styles.button1}
                  onPress={()=> console.log("data", userData, "coalitions", coalitionsData)}
                  >
                  </Pressable> */}
                  <View style={styles.container1}>
                  <Image
                    style={{
                      borderRadius: 50,
                      width: 90,
                      height: 90,
                      overflow: 'hidden',
                      resizeMode: 'contain',
                    }}
                    // source={ userData?.image_url }
                    source={{ uri: userData?.image_url }}
                    />
                    <Text style={styles.textI}>Full Name : {userData?.displayname}</Text>
                    <Text style={styles.textI}>Login : {userData?.login}</Text>
                    <Text style={styles.textI}>level : {userData?.cursus_users[0].level}</Text>
                    {/* <Progress.Bar progress={userData.cursus_users[0].level} width={200} /> */}
                  </View>
                  <View>
                    {/* <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width }}   
                      /> */}
                        {/* <RadioButton
                          value="Projects"
                          status={ checked === 'first' ? 'checked' : 'unchecked' }
                          onPress={() => setChecked('first')}
                        /> 
                        <RadioButton
                          value="Achievements"
                          status={ checked === 'second' ? 'checked' : 'unchecked' }
                          onPress={() => setChecked('second')}
                        /> */}
                      <RadioForm  
                      radio_props={radio_props}
                      initial={0}
                      onPress={(checked) => { setChecked(() => !checked)       
                        }}
                        formHorizontal={true}
                        labelColor="white"
                      />
                  </View>
                  <View>
                 { console.log("checkeddddd",checked)}
                    {
                      checked == 0 ? 
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