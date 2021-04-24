/* eslint-disable */

import React, {useState} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector, useDispatch} from 'react-redux';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableNativeFeedback,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  StyleSheet,
  Button,
} from 'react-native';

export default UploadArticle = props => {
  const theme = useSelector(state => state.appReducer.colors);
  const [imgs, setImgs] = useState([]);

  const regex = /\@[-?\d\.]*\,([-?\d\.]*)/gm;
  const str = `https://www.google.com/maps/place/Nagappa+Hadli+Hospital/@13.0830973,77.5467358,17z/data=!3m1!4b1!4m5!3m4!1s0x3bae2297a826c479:0x2459f8c0a7fa5742!8m2!3d13.0830973!4d77.5489245`;
  let m;

  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      console.log(`Found match, group ${groupIndex}: ${match}`);
    });
  }

  // const regex1 = /ll=[-?\d\.]*\,([-?\d\.]*)/gm;
  // const str1 = ` https://maps.google.com/maps?ll=43.6474528,-79.3799409,&amp;z=16&amp;t=m&amp;hl=en-US&amp;gl=US&amp;mapclient=apiv3`;
  // let m1;
  // console.log(regex1.exec(str1), 'koko');
  // while ((m1 = regex1.exec(str1)) !== null) {
  //   console.log(m1, 'hahah');
  //   // This is necessary to avoid infinite loops with zero-width matches
  //   if (m1.index === regex1.lastIndex) {
  //     regex1.lastIndex++;
  //   }

  //   // The result can be accessed through the `m`-variable.
  //   m1.forEach((match, groupIndex) => {
  //     console.log(`Found match, group ${groupIndex}: ${match}`);
  //   });
  // }

  const openGalleryHandler = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      multiple: true,
    }).then(images => {
      console.log(images);
      setImgs(prevImages => {
        return [...prevImages, ...images];
      });
    });
  };

  const ImgPreviewUI = () => {
    if (!imgs) return;
    console.log(imgs);
    return imgs.map(img => (
      <FilePreview
        style={{
          width: Dimensions.get('window').width * 0.44,
          height: Dimensions.get('window').width * 0.44,
        }}>
        <Image
          style={{
            width: Dimensions.get('window').width * 0.44,
            height: Dimensions.get('window').width * 0.44,
          }}
          resizeMode={'cover'}
          source={{uri: img.path}}
        />
      </FilePreview>
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <View
        style={{flex: 1, backgroundColor: theme.primary, paddingBottom: 50}}>
        <ScrollView>
          <KeyboardAvoidingView style={{flex: 1, alignItems: 'center'}}>
            <View
              style={{
                flex: 1,
                width: '90%',
              }}>
              <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
                style={{flex: 1}}>
                <MainContainer>
                  <TextInput
                    style={{
                      marginBottom: Dimensions.get('window').height * 0.05,
                      borderRadius: 50,
                    }}
                    placeholder="Name of Hospital/Clinic"
                    placeholderTextColor={theme.text_primary}
                  />
                  <TextInput
                    style={{
                      marginBottom: Dimensions.get('window').height * 0.05,
                      borderRadius: 50,
                    }}
                    placeholder="Specialization/Specialist"
                    placeholderTextColor={theme.text_primary}
                  />
                  <TextInput
                    style={{
                      marginBottom: Dimensions.get('window').height * 0.05,
                      borderRadius: 50,
                    }}
                    placeholder="Location"
                    placeholderTextColor={theme.text_primary}
                  />
                  <TextInput
                    style={{
                      marginBottom: Dimensions.get('window').height * 0.05,
                    }}
                    placeholder="Location URL from GoogleMap "
                    placeholderTextColor={theme.text_primary}
                    multiline={true}
                    numberOfLines={3}
                  />
                  <TextInput
                    style={{
                      marginBottom: Dimensions.get('window').height * 0.05,
                    }}
                    placeholder="About Hospital/Clinic"
                    placeholderTextColor={theme.text_primary}
                    multiline={true}
                    numberOfLines={5}
                  />

                  <TextInput
                    style={{
                      marginBottom: Dimensions.get('window').height * 0.05,
                    }}
                    placeholder="Services offered (seprate with comma ' , ' )"
                    placeholderTextColor={theme.text_primary}
                    multiline={true}
                    numberOfLines={5}
                  />
                  <View style={{flex: 1, paddingBottom: 20}}>
                    <Button
                      title="Upload Images"
                      color="red"
                      onPress={openGalleryHandler}
                    />
                  </View>
                  <UploadedImgs>{imgs ? ImgPreviewUI() : null}</UploadedImgs>

                  <BtnContainer>
                    <EachBtn>
                      <ButtonStyled
                        color="green"
                        title="Post Article"
                        style={{
                          marginBottom: Dimensions.get('window').height * 0.05,
                        }}
                      />
                    </EachBtn>
                  </BtnContainer>
                </MainContainer>
              </TouchableWithoutFeedback>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </ThemeProvider>
  );
};

const ButtonStyled = styled.Button`
  border-radius: 5px;
`;

const EachBtn = styled.View`
  width: 50%;
  padding-bottom: 10px;
`;
const BtnContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
`;

const UploadedImgs = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

const FilePreview = styled.View`
  /* flex: 1; */
  /* height: 250px;
  width: 200px; */
  /* align-items: center; */
`;

const TextInput = styled.TextInput`
  flex: 1;
  border-bottom-color: ${props => props.theme.text_secondary};
  border-bottom-width: 1px;
  color: ${props => props.theme.text_primary};
  font-size: 20px;
  width: 100%;
  background-color: ${props => props.theme.secondary};
  padding-left: 20px;
`;

const Text = styled.Text`
  flex: 1;
  color: ${props => props.theme.text_primary};
`;

const MainContainer = styled.View`
  padding-top: 20px;
  flex: 1;
`;
