import {Linking, Alert, Platform} from 'react-native';

export const callNumber = (phone: string) => {
  console.log('callNumber ----> ', phone);
  let phoneNumber = phone;
  phoneNumber = `tel:${phone}`;
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => console.log(err));
};
