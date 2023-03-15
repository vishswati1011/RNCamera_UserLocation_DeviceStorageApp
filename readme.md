Using Native Device App

Using the Device Camera
User Location & Maps
Storing Data on the Device


camera react-native-image-picker  
res:   https://www.turing.com/kb/how-to-build-a-react-native-camera-app


react native library 
npm i react-native-geolocation-service
link for more details https://github.com/Agontuk/react-native-geolocation-service/blob/master/docs/setup.md

use example folder for code write

Add Google map key in AndroidManifest.xml

How to Right Meta Data In AndroidManifest.xml

<!-- <application
      android:name=".MainApplication"
      android:label="@string/app_name"
      android:icon="@mipmap/ic_launcher"
      android:roundIcon="@mipmap/ic_launcher_round"
      android:allowBackup="false"
      android:theme="@style/AppTheme">

      <meta-data
      android:name="com.google.android.geo.API_KEY" 
      android:value="Your API Key add here"/>-->

add permission also in AndroidManifest.xml

  <!-- <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" /> -->

Translate Address to coordinate and coordinate to address

we have geocoding api Google map Platform
first we need to enable it
1.go to Google Map Platform 
2.map api and services 
3. enable geocoding api 

using the map key we can also get map priview

   



