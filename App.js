/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {Text, View, TouchableOpacity} from 'react-native';

import {client_id} from './env.json';
import {styles} from './styles';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: client_id,
    });
  }, []);

  function onAuthStateChanged(user) {
    setUserInfo(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleSignIn = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {userInfo ? (
          <>
            <View>
              <View style={styles.textContainer}>
                <Text style={styles.textBold}>Nome: </Text>
                <Text style={styles.normalText}>{userInfo?.displayName}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textBold}>Email: </Text>
                <Text style={styles.normalText}>{userInfo?.email}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textBold}>UID: </Text>
                <Text style={styles.normalText}>{userInfo?.uid}</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSignOut}
              style={styles.signOutButton}>
              <Text style={styles.signOutButtonText}>Sair</Text>
            </TouchableOpacity>
          </>
        ) : (
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleSignIn}
            // disabled={isSigninInProgress}
          />
        )}
      </View>
    </View>
  );
};

export default App;
