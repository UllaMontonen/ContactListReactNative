import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import React, { useState } from 'react';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [contacts, setContacts] = useState([]);

  

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
        );
        console.log(data);
        if (data.length > 0) {
          setContacts(data);
        }
    } }


  return (
    <View style={styles.container}>
      <FlatList 
         
          data={contacts}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            const { name, phoneNumbers } = item;
            return ( <Text>{`${name} ${phoneNumbers ? phoneNumbers[0].number : '(no phone number)'}`} </Text>);
          }
        }
      />
      <View style={styles.button}>
        <Button title="Get Contacts" onPress={getContacts} />
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // iPhone button does not have bacground color
  button: {
    backgroundColor: "#AED6F1",
    marginBottom: 30,
    marginTop: 10,
  },
});
