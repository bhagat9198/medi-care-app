/* eslint-disable */

import React, {useState} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
} from 'react-native';

export default UploadArticle = props => {
  const theme = useSelector(state => state.appReducer.colors);
  const [topImg, setTopImg] = useState(null);
  const [middleImg, setMiddleImg] = useState(null);
  const [lastImg, setLastImg] = useState(null);

  console.log(topImg);

  const updateState = (imgOrder, imgPath) => {
    if (imgOrder === 'top') {
      setTopImg(imgPath);
    }
    if (imgOrder === 'middle') {
      setMiddleImg(imgPath);
    }
    if (imgOrder === 'last') {
      setLastImg(imgPath);
    }
  };

  const openCameraHandler = imgOrder => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      updateState(imgOrder, image.path);
    });
  };

  const openGalleryHandler = imgOrder => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      updateState(imgOrder, image.path);
    });
  };

  const mediaBtnUI = mediaBtnType => {
    return (
      <FileInput style={{marginBottom: Dimensions.get('window').height * 0.05}}>
        <SubText>Choose the image which should be displayed in article</SubText>
        <FileInputBtns>
          <MediaBtnHolder>
            <TouchableNativeFeedback
              style={{flex: 1}}
              onPress={() => openCameraHandler('top')}>
              <MediaBtn
                style={{
                  padding: Dimensions.get('window').width * 0.03,
                }}>
                <Feather
                  name="camera"
                  size={20}
                  color={theme.text_secondary}
                  style={{paddingRight: 5}}
                />
                <Text>Camera</Text>
              </MediaBtn>
            </TouchableNativeFeedback>
          </MediaBtnHolder>
          <MediaBtnHolder>
            <TouchableNativeFeedback
              onPress={() => openGalleryHandler(mediaBtnType)}>
              <MediaBtn
                style={{
                  padding: Dimensions.get('window').width * 0.03,
                }}>
                <AntDesign
                  name="picture"
                  size={20}
                  color={theme.text_secondary}
                  style={{paddingRight: 5}}
                />
                <Text>Gallery</Text>
              </MediaBtn>
            </TouchableNativeFeedback>
          </MediaBtnHolder>
        </FileInputBtns>
      </FileInput>
    );
  };

  const ImgPreviewUI = imgOrder => {
    let path;
    if (imgOrder === 'top') {
      path = topImg;
    }
    if (imgOrder === 'middle') {
      path = middleImg;
    }
    if (imgOrder === 'last') {
      path = lastImg;
    }
    return (
      <FilePreview
        style={{marginBottom: Dimensions.get('window').height * 0.05}}>
        <Image
          style={{width: 300, height: 300}}
          resizeMode={'cover'}
          source={{uri: path}}
        />
      </FilePreview>
    );
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
                    placeholder="Title"
                    placeholderTextColor={theme.text_primary}
                    style={{borderRadius: 50}}
                  />
                  {mediaBtnUI('top')}
                  {topImg ? ImgPreviewUI('top') : null}
                  <TextInput
                    placeholder="First Paragraph"
                    placeholderTextColor={theme.text_primary}
                    multiline={true}
                    numberOfLines={5}
                  />
                  {mediaBtnUI('middle')}
                  {middleImg ? ImgPreviewUI('middle') : null}
                  <TextInput
                    placeholder="Last Paragraph"
                    placeholderTextColor={theme.text_primary}
                    multiline={true}
                    numberOfLines={5}
                  />
                  {mediaBtnUI('last')}
                  {lastImg ? ImgPreviewUI('last') : null}
                  <BtnContainer>
                    {/* <EachBtn>
                      <Button color="red" title="Cancel" style={{borderRadius: 5, marginBottom: Dimensions.get('window').height * 0.05}} />
                    </EachBtn> */}
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
  padding-bottom: 10px
`;
const BtnContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
`;

const MediaBtnHolder = styled.View`
  flex-direction: row;
  width: 30%;
`;

const MediaBtn = styled.View`
  flex: 1;
  flex-direction: row;
  border-color: ${props => props.theme.text_secondary};
  border-width: 1px;
  width: 30%;
  align-items: center;
  justify-content: center;
`;

const SubText = styled.Text`
  color: ${props => props.theme.text_secondary};
  font-size: 17;
  margin-bottom: ${() => Dimensions.get('window').height * 0.03};
`;

const FilePreview = styled.View`
  flex: 1;
  height: 300;
  width: 100%;
  align-items: center;
`;

const FileInputBtns = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
`;

const FileInput = styled.View`
  flex: 1;
`;

const TextInput = styled.TextInput`
  flex: 1;
  border-bottom-color: ${props => props.theme.text_secondary};
  border-bottom-width: 1px;
  color: ${props => props.theme.text_primary};
  font-size: 20px;
  width: 100%;
  background-color: ${props => props.theme.secondary};
  padding-left: 20;
  margin-bottom: ${() => Dimensions.get('window').height * 0.05};
`;

const Text = styled.Text`
  flex: 1;
  color: ${props => props.theme.text_primary};
`;

const MainContainer = styled.View`
  padding-top: 20px;
  flex: 1;
`;

const styles = StyleSheet.create({});
