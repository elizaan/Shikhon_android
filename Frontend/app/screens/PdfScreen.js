import * as React from 'react';
import { View, Text } from 'react-native'
export default function PdfScreen({ route, navigation }) {
  // const { userID } = route.params;
  // const { userType } = route.params;
  // console.log(userType);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>This is the PDF screen page...</Text>
      </View>
    );
  }