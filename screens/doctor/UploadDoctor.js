/* eslint-disable */

import React, {useState} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector, useDispatch} from 'react-redux';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Button,
  Alert,
} from 'react-native';

import {uploadDoctor} from './../../store/actions/doctor';
 
export default UploadArticle = props => {
  const theme = useSelector(state => state.appReducer.colors);
  const [imgs, setImgs] = useState([]);
  const [uploadImgs, setUploadImgs] = useState(false);
  const dispatch = useDispatch();

  const getLatLon = () => {
    const regex = /\@[-?\d\.]*\,([-?\d\.]*)/gm;
    let m;

    while ((m = regex.exec(locationUrl)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      let [lat, long] = m[0].split(',');
      lat = lat.split('@')[1];
      console.log(lat, long, 'aaaa');
      return [lat, long];
    }
  };

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

  const [name, setName] = useState('');
  const [specializations, setSpecializations] = useState('');
  const [location, setLocation] = useState('');
  const [locationUrl, setLocationUrl] = useState('');
  const [about, setAbout] = useState('');
  const [services, setServices] = useState('');

  const submitUploadDoctor = async() => {
    // if(!name || !specializations || !location || !locationUrl || !about || !services) {
    //   return Alert.alert('Incomplete Form', 'Please fill all the details in order to upload yourslef');
    // }
    let lat, long;
    

    // if(!uploadImgs) {
    //   console.log('hey');
    //   return Alert.alert(
    //     'No Images',
    //     'Are you sure you want to proceed without any images?',
    //     [
    //       {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
    //       {text: 'Confirm', onPress: () => setUploadImgs(true)},
    //     ],
        
    //   );
    // }  

    

    // try {
    //   [lat, long] = getLatLon();
    // } catch (error) {
    //   return Alert.alert(
    //     'Invalid URL',
    //     'Please copy the correct URL from address bar of browser.',
    //   );
    // }

    let wholeData = {
      imgs
    }
    let res = await dispatch(uploadDoctor(wholeData));
    console.log(res);
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
                    value={name}
                    onChangeText={txt => setName(txt)}
                  />
                  <TextInput
                    style={{
                      marginBottom: Dimensions.get('window').height * 0.05,
                      borderRadius: 50,
                    }}
                    placeholder="Specializations (seprate with comma ' , ' )"
                    placeholderTextColor={theme.text_primary}
                    multiline={true}
                    numberOfLines={2}
                    value={specializations}
                    onChangeText={txt => setSpecializations(txt)}
                  />
                  <TextInput
                    style={{
                      marginBottom: Dimensions.get('window').height * 0.05,
                      borderRadius: 50,
                    }}
                    placeholder="Location"
                    placeholderTextColor={theme.text_primary}
                    value={location}
                    onChangeText={txt => setLocation(txt)}
                  />
                  <TextInput
                    style={{
                      marginBottom: Dimensions.get('window').height * 0.05,
                    }}
                    placeholder="Location URL from GoogleMap "
                    placeholderTextColor={theme.text_primary}
                    multiline={true}
                    numberOfLines={3}
                    value={locationUrl}
                    onChangeText={txt => setLocationUrl(txt)}
                  />
                  <TextInput
                    style={{
                      marginBottom: Dimensions.get('window').height * 0.05,
                    }}
                    placeholder="About Hospital/Clinic"
                    placeholderTextColor={theme.text_primary}
                    multiline={true}
                    numberOfLines={5}
                    value={about}
                    onChangeText={txt => setAbout(txt)}
                  />
                  <TextInput
                    style={{
                      marginBottom: Dimensions.get('window').height * 0.05,
                    }}
                    placeholder="Services offered (seprate with comma ' , ' )"
                    placeholderTextColor={theme.text_primary}
                    multiline={true}
                    numberOfLines={5}
                    value={services}
                    onChangeText={txt => setServices(txt)}
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
                        onPress={submitUploadDoctor}
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
