import * as React from 'react';
import { View, Text } from 'react-native'
export default function AskScreen({ route, navigation }) {
  // const { userID } = route.params;
  // const { userType } = route.params;
  // console.log(userType);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Ask anything here!</Text>
      </View>
    );
  }