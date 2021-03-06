/**
 * @format
 */

/* eslint-disable*/

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// import PushNotification from 'react-native-push-notification';

// PushNotification.createChannel(
//   {
//     channelId: '9198', // (required)
//     channelName: 'mediCare_dark', // (required)
//     channelDescription: 'RN app', // (optional) default: undefined.
//     playSound: true, // (optional) default: true
//     soundName: 'android.resource://com.med/raw/alaram.WAV', // (optional) See `soundName` parameter of `localNotification` function
//     importance: 4, // (optional) default: 4. Int value of the Android notification importance
//     vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
//   },
//   // created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
// );




AppRegistry.registerComponent(appName, () => App);
