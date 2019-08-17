import React, { Fragment } from 'react';
import NotifService from './NotifService';
import firebase from "react-native-firebase";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("sdndsn");
    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    const channel = new firebase.notifications.Android.Channel('insider', 'insider channel', firebase.notifications.Android.Importance.Max)
    firebase.notifications().android.createChannel(channel);
    this.checkPermission();
    this.createNotificationListeners();
  }

  onRegister(token) {
    Alert.alert("Registered !", JSON.stringify(token));
    console.log(token);
  }

  onNotif(notif) {
    console.log(notif);
  }

  async getToken() {
    console.log("Getting token")
    fcmToken = await firebase.messaging().getToken();
    console.log(fcmToken);
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    console.log(enabled);
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    firebase.notifications().onNotification(notification => {
      console.log(notification);
      notification.android.setChannelId('insider').setSound('default')
      firebase.notifications().displayNotification(notification)
    });
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <Text>This is new react</Text>
      </Fragment>
    );
  }
};



const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});

export default App;
