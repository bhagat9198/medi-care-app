/* eslint-disable */

import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled, {ThemeProvider} from 'styled-components';
import Mailer from 'react-native-mail';
import {
  Button,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {addMedReport} from './../../store/actions/patient';
import { DrawerPatient} from './../../constants/Navigation';

export default function MedReports(props) {
  const [filePath, setFilePath] = useState(null);
  const [mimeType, setmimeType] = useState(null);
  const theme = useSelector(state => state.appReducer.colors);
  const dispatch = useDispatch();

  const [to, setTo] = useState('');
  const [bcc, setBcc] = useState('');
  const [ccc, setCcc] = useState('');
  const [subject, setSubject] = useState('');
  const [mailBody, setMailBody] = useState('');

  const handleMailer = async () => {
    if(!to || !subject || !mailBody) {
      return Alert.alert('Empty Fields', 'To, Subject and MailBody cant be empty. Please type something and proceede.')
    }

    await Mailer.mail(
      {
        subject: subject,
        recipients: [to],
        ccRecipients: [ccc],
        bccRecipients: [bcc],
        body: mailBody,
        isHTML: false,

        // attachments: [
        //   {
        //     // Specify either `path` or `uri` to indicate where to find the file data.
        //     // The API used to create or locate the file will usually indicate which it returns.
        //     // An absolute path will look like: /cacheDir/photos/some image.jpg
        //     // A URI starts with a protocol and looks like: content://appname/cacheDir/photos/some%20image.jpg
        //     // The absolute path of the file from which to read data.
        //     // path: filePath, // The uri of the file from which to read the data.
        //     // Specify either `type` or `mimeType` to indicate the type of data.
        //     // type: 'png', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
        //   },
        // ],
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: 'Ok',
              onPress: () => console.log('OK: Email Error Response'),
            },
            {
              text: 'Cancel',
              onPress: () => console.log('CANCEL: Email Error Response'),
            },
          ],
          {cancelable: true},
        );
      },

    );

    let medReportData = {
      to,
      bcc,
      ccc,
      subject,
      mailBody,
      created: new Date().valueOf(),
    };

    let res = await dispatch(addMedReport(medReportData));
    if (res.status) {
      // return Alert.alert('Success', 'Your email is succesfully sent');
      props.navigation.navigate(DrawerPatient.dashboardDrawer)
    } else {
      return Alert.alert(res.title, res.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <KeyboardAvoidingView style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <MainContainer
              style={{
                paddingLeft: Dimensions.get('window').width * 0.02,
                paddingRight: Dimensions.get('window').width * 0.02,
                paddingBottom: Dimensions.get('window').height * 0.08,
              }}>
              <InputCont
                style={{
                  marginBottom: Dimensions.get('window').height * 0.03,
                }}>
                <InputLabel
                  style={{
                    paddingLeft: Dimensions.get('window').width * 0.02,
                    paddingRight: Dimensions.get('window').width * 0.02,
                  }}>
                  <LabelText>To :</LabelText>
                </InputLabel>
                <Input
                  autoCompleteType="email"
                  autoCorrect={false}
                  autoFocus={true}
                  blurOnSubmit={true}
                  keyboardType="email-address"
                  onChangeText={txt => setTo(txt)}
                  placeholder="Sender Email Address"
                  placeholderTextColor={theme.text_secondary}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                  }}
                  value={to}
                />
              </InputCont>
              <InputCont
                style={{
                  marginBottom: Dimensions.get('window').height * 0.03,
                }}>
                <InputLabel
                  style={{
                    paddingLeft: Dimensions.get('window').width * 0.02,
                    paddingRight: Dimensions.get('window').width * 0.02,
                  }}>
                  <LabelText>Bcc :</LabelText>
                </InputLabel>
                <Input
                  autoCompleteType="email"
                  autoCorrect={false}
                  autoFocus={true}
                  blurOnSubmit={true}
                  keyboardType="email-address"
                  onChangeText={txt => setBcc(txt)}
                  placeholder="Bcc Email Address"
                  placeholderTextColor={theme.text_secondary}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                  }}
                  value={bcc}
                />
              </InputCont>
              <InputCont
                style={{
                  marginBottom: Dimensions.get('window').height * 0.03,
                }}>
                <InputLabel
                  style={{
                    paddingLeft: Dimensions.get('window').width * 0.02,
                    paddingRight: Dimensions.get('window').width * 0.02,
                  }}>
                  <LabelText>Ccc :</LabelText>
                </InputLabel>
                <Input
                  autoCompleteType="email"
                  autoCorrect={false}
                  autoFocus={true}
                  blurOnSubmit={true}
                  keyboardType="email-address"
                  onChangeText={txt => setCcc(txt)}
                  placeholder="Ccc Email Address"
                  placeholderTextColor={theme.text_secondary}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                  }}
                  value={ccc}
                />
              </InputCont>
              <InputCont
                style={{
                  marginBottom: Dimensions.get('window').height * 0.03,
                }}
                flexColoumn={true}>
                <InputLabel
                  style={{
                    paddingLeft: Dimensions.get('window').width * 0.02,
                    paddingRight: Dimensions.get('window').width * 0.02,
                  }}>
                  <LabelText>Subject :</LabelText>
                </InputLabel>
                <Input
                  autoCompleteType="email"
                  autoCorrect={false}
                  autoFocus={true}
                  blurOnSubmit={true}
                  onChangeText={txt => setSubject(txt)}
                  placeholder="Email Subject"
                  placeholderTextColor={theme.text_secondary}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                  }}
                  value={subject}
                  multiline={true}
                  numberOfLines={2}
                />
              </InputCont>
              <InputCont
                style={{
                  marginBottom: Dimensions.get('window').height * 0.03,
                }}
                flexColoumn={true}>
                <InputLabel
                  style={{
                    paddingLeft: Dimensions.get('window').width * 0.02,
                    paddingRight: Dimensions.get('window').width * 0.02,
                  }}>
                  <LabelText>Mail Body :</LabelText>
                </InputLabel>
                <Input
                  autoCompleteType="email"
                  autoCorrect={false}
                  autoFocus={true}
                  blurOnSubmit={true}
                  onChangeText={txt => setMailBody(txt)}
                  placeholder="Email Body"
                  placeholderTextColor={theme.text_secondary}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                  }}
                  value={mailBody}
                  multiline={true}
                  numberOfLines={2}
                />
              </InputCont>

              <BtnContainer
                style={{
                  marginTop: Dimensions.get('window').height * 0.03,
                  marginBottom: Dimensions.get('window').height * 0.03,
                }}>
                <Button title="Send Mail" onPress={handleMailer} />
              </BtnContainer>
            </MainContainer>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </ThemeProvider>
  );
}

const BtnContainer = styled.View``;

const Input = styled.TextInput`
  flex: 1;
  color: ${props => props.theme.text_primary};
  font-size: 20px;
  justify-content: flex-start;
  /* width: 100%; */
`;
const LabelText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-size: 20px;
`;
const InputLabel = styled.View`
  justify-content: center;
`;
const InputCont = styled.View`
  flex-direction: ${props => (props.flexColoumn ? 'column' : 'row')};
`;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
`;
