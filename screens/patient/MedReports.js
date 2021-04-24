/* eslint-disable */

import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled, {ThemeProvider} from 'styled-components';
import email from 'react-native-email';
import Mailer from 'react-native-mail';
import {Button, Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default function MedReports() {
  const [filePath, setFilePath] = useState(null);
  const [mimeType, setmimeType] = useState(null);
  const theme = useSelector(state => state.appReducer.colors);

  const handleEmail = () => {
    const to = ['tiaan@email.com', 'foo@bar.com']; // string or array of email addresses
    email(to, {
      // Optional additional arguments
      cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
      bcc: 'mee@mee.com', // string or array of email addresses
      subject: 'Show how to use',
      body: 'Some body right here',
    }).catch(console.error);
  };

  const openGalleryHandler = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
    }).then(images => {
      console.log(images);
      console.log(images.path);
      console.log(images.mime);
      setFilePath(images.path);
      setmimeType(images.mime);
    });
  };

  const handleMailer = () => {
    console.log(Mailer);
    console.log(filePath, mimeType);
    Mailer.mail(
      {
        subject: 'need help',
        recipients: ['support@example.com'],
        ccRecipients: ['supportCC@example.com'],
        bccRecipients: ['supportBCC@example.com'],
        body: '<b>A Bold Body</b>',
        isHTML: true,
        attachments: [
          {
            // Specify either `path` or `uri` to indicate where to find the file data.
            // The API used to create or locate the file will usually indicate which it returns.
            // An absolute path will look like: /cacheDir/photos/some image.jpg
            // A URI starts with a protocol and looks like: content://appname/cacheDir/photos/some%20image.jpg
          // The absolute path of the file from which to read data.
            path: filePath, // The uri of the file from which to read the data.
            // Specify either `type` or `mimeType` to indicate the type of data.
            type: mimeType, // Mime Type: jpg, png, doc, ppt, html, pdf, csv

          },
        ],
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
  };

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <Button title="add Email" onPress={handleEmail} />
        <Button title="add Img" onPress={openGalleryHandler} />
        <Button title="add Mailer" onPress={handleMailer} />
      </MainContainer>
    </ThemeProvider>
  );
}

const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
`;
