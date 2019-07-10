/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';

// import PushNotification from 'react-native-push-notification'
var PushNotification = require('react-native-push-notification');

const S_WIDTH = Dimensions.get('window').width

export default class App extends Component {

  constructor(props){
    super(props)
    this._localNotification = this._localNotification.bind(this)
  }

  componentDidMount() {
    console.log("componentDidMount" + PushNotification)
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
      },

      // // (required) Called when a remote or local notification is opened or received
      // onNotification: function (notification) {
      //   console.log('NOTIFICATION:', notification);

      //   // process the notification

      //   // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
      //   notification.finish(PushNotificationIOS.FetchResult.NoData);
      // },

      // // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      // senderID: 'YOUR GCM (OR FCM) SENDER ID',

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true
    });
  }

  _localNotification() {
    console.log("_localNotification")
    PushNotification.localNotification({
      title: "My Notification Title", // (optional)
      message: "My Notification Message", // (required)
    });

    // PushNotification.localNotificationSchedule({
    //   message: "My Notification Message", // (required)
    //   date: new Date(Date.now() + (5 * 1000)) // in 60 secs
    // });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Demo Push Notification</Text>

        <TouchableOpacity onPress={this._localNotification}>
          <View style={styles.button_container}>
            <Text style={styles.button_text}>Local Notification</Text>
          </View>

        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  button_container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: S_WIDTH - 80,
    height: 50,
    borderRadius: 10,
    borderWidth: 2
  },
  button_text: {
    fontWeight: 'bold',
    fontSize: 20
  }
});
