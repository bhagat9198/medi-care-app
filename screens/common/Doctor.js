/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import styled, {ThemeProvider} from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import openMap from 'react-native-open-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {extractEachDoc} from './../../store/actions/doctor';

export default function Doctor(props) {
  const theme = useSelector(state => state.appReducer.colors);
  const [docData, setDocData] = useState(false);
  const dispatch = useDispatch();
  // console.log(docData);

  useEffect(async () => {
    let res = await dispatch(
      extractEachDoc(props.route.params.uid, props.route.params.userType),
    );
    if (res.status) {
      setDocData(res.data);
    } else {
      Alert.alert(res.title, res.message);
    }
  }, []);

  const openMapHandler = () => {
    // console.log('click');
    return openMap({
      latitude: Number(docData.hospital.locationUrl[0]),
      longitude: Number(docData.hospital.locationUrl[1]),
    });
  };

  const doctorDetails = () => {
    return (
      <DoctorDetails
        style={{
          paddingTop: Dimensions.get('window').height * 0.01,
          paddingBottom: Dimensions.get('window').height * 0.01,
          paddingLeft: Dimensions.get('window').width * 0.02,
          paddingRight: Dimensions.get('window').width * 0.02,
          marginTop: Dimensions.get('window').height * 0.01,
          marginBottom: Dimensions.get('window').height * 0.01,
        }}>
        <DoctorDetail>
          <DetailLabel>
            <LabelText>Gender</LabelText>
          </DetailLabel>
          <DetailInfo>
            <InfoText>{docData.gender}</InfoText>
          </DetailInfo>
        </DoctorDetail>
        <DoctorDetail>
          <DetailLabel>
            <LabelText>Email</LabelText>
          </DetailLabel>
          <DetailInfo>
            <InfoText>{docData.email}</InfoText>
          </DetailInfo>
        </DoctorDetail>
        <DoctorDetail>
          <DetailLabel>
            <LabelText>Phone Bymber</LabelText>
          </DetailLabel>
          <DetailInfo>
            <InfoText>{docData.phone}</InfoText>
          </DetailInfo>
        </DoctorDetail>
      </DoctorDetails>
    );
  };

  const hospitalDetails = () => {
    return (
      <HospitalDetails
        style={{
          paddingTop: Dimensions.get('window').height * 0.01,
          paddingBottom: Dimensions.get('window').height * 0.01,
          paddingLeft: Dimensions.get('window').width * 0.02,
          paddingRight: Dimensions.get('window').width * 0.02,
          marginTop: Dimensions.get('window').height * 0.01,
          marginBottom: Dimensions.get('window').height * 0.01,
        }}>
        <HospitalDetail>
          <HospitalDetailLabel>
            <LabelText>Specializations</LabelText>
          </HospitalDetailLabel>
          <HospitalDetailInfo>
            {docData?.hospital?.specializations.map(el => (
              <EachSpecialization key={Math.random()}>
                <AntDesign
                  name="arrowright"
                  size={20}
                  color="white"
                  style={{
                    paddingRight: Dimensions.get('window').width * 0.02,
                  }}
                />
                <SpecializationText>{el}</SpecializationText>
              </EachSpecialization>
            ))}
          </HospitalDetailInfo>
        </HospitalDetail>
        <HospitalDetail>
          <HospitalDetailLabel>
            <LabelText>Services</LabelText>
          </HospitalDetailLabel>
          <HospitalDetailInfo>
            {docData?.hospital?.services.map(el => (
              <EachSpecialization key={Math.random()}>
                <AntDesign
                  name="arrowright"
                  size={20}
                  color="white"
                  style={{
                    paddingRight: Dimensions.get('window').width * 0.02,
                  }}
                />
                <SpecializationText>{el}</SpecializationText>
              </EachSpecialization>
            ))}
          </HospitalDetailInfo>
        </HospitalDetail>
        <HospitalDetail>
          <HospitalDetailLabel>
            <LabelText>Location</LabelText>
          </HospitalDetailLabel>
          <HospitalDetailInfo>
            <InfoText>{docData?.hospital?.location}</InfoText>
          </HospitalDetailInfo>
        </HospitalDetail>
        <HospitalDetail>
          <HospitalDetailLabel>
            <LabelText>About Hosiptal/Clinic</LabelText>
          </HospitalDetailLabel>
          <HospitalDetailInfo>
            <InfoText>{docData?.hospital?.about}</InfoText>
          </HospitalDetailInfo>
        </HospitalDetail>
        <HospitalDetail>
          <HospitalDetailLabel>
            <LabelText>Direction to Hospital/Clinic</LabelText>
          </HospitalDetailLabel>
          <HospitalDetailInfo
            style={{
              borderColor: 'orange',
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: Dimensions.get('window').height * 0.005,
              paddingBottom: Dimensions.get('window').height * 0.005,
            }}>
            <TouchableWithoutFeedback onPress={openMapHandler}>
              <BtnText>Click here to get full detail on GMap</BtnText>
            </TouchableWithoutFeedback>
          </HospitalDetailInfo>
        </HospitalDetail>
      </HospitalDetails>
    );
  };

  const doctorArticles = () => {
    return (
      <ArticlesCont
        style={{
          paddingTop: Dimensions.get('window').height * 0.01,
          paddingBottom: Dimensions.get('window').height * 0.01,
          paddingLeft: Dimensions.get('window').width * 0.02,
          paddingRight: Dimensions.get('window').width * 0.02,
          marginTop: Dimensions.get('window').height * 0.01,
          marginBottom: Dimensions.get('window').height * 0.01,
        }}>
        <EachArticle>
          <TouchableWithoutFeedback>
            <ArticleTouchableCont>
              <ArticleHeading>
                <ArticleHeadingText>snglfnsdvh</ArticleHeadingText>
              </ArticleHeading>
              <ArticleSubHeading>
                <ArticleSubHeadingText>2/2/21</ArticleSubHeadingText>
              </ArticleSubHeading>
            </ArticleTouchableCont>
          </TouchableWithoutFeedback>
        </EachArticle>
        <EachArticle>
          <TouchableWithoutFeedback>
            <ArticleTouchableCont>
              <ArticleHeading>
                <ArticleHeadingText>snglfnsdvh</ArticleHeadingText>
              </ArticleHeading>
              <ArticleSubHeading>
                <ArticleSubHeadingText>2/2/21</ArticleSubHeadingText>
              </ArticleSubHeading>
            </ArticleTouchableCont>
          </TouchableWithoutFeedback>
        </EachArticle>
      </ArticlesCont>
    );
  };

  const doctorGallery = () => {
    return (
      <AllPicsCont>
        {docData.hospital.imgs.map(el => ( 
          <EachPic key={Math.random()}>
            <ImageStyled
              onError={error => {
                // console.log('error img', error);
              }}
              testID={el.name}
              resizeMethod="resize"
              resizeMode="contain"
              source={{uri: el.url}}
            />
          </EachPic>
        ))}
      </AllPicsCont>
    );
  };

  const notAvaliable = () => {
    return (
      <NotAvaliableCont>
        <NotAvaliableContText>
          Doctor still need to upadate. Try another time
        </NotAvaliableContText>
      </NotAvaliableCont>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <MainContainer>
          <ImgContainer
            style={{
              height: Dimensions.get('window').height * 0.4,
              marginTop: Dimensions.get('window').height * 0.01,
              marginBottom: Dimensions.get('window').height * 0.01,
              width: '100%',
            }}>
            <ImageStyled
              onError={error => {
                // console.log('error img', error);
              }}
              testID="mainIMG"
              resizeMethod="resize"
              resizeMode="contain"
              source={require('./../../assets/images/stethoscope.png')}
            />
          </ImgContainer>
          <MainHeadingCont
            style={{
              paddingTop: Dimensions.get('window').height * 0.01,
              paddingBottom: Dimensions.get('window').height * 0.01,
              paddingLeft: Dimensions.get('window').width * 0.02,
              paddingRight: Dimensions.get('window').width * 0.02,
            }}>
            <SubHeadingCont>
              <SubHeadingContText>Doc Name</SubHeadingContText>
            </SubHeadingCont>
            <HeadingCont>
              <HeadingContText>DR. ABCD</HeadingContText>
            </HeadingCont>
          </MainHeadingCont>
          {doctorDetails()}
          <HospitalDetails>
            <MainHeadingCont>
              <SubHeadingCont>
                <SubHeadingContText>Work At</SubHeadingContText>
              </SubHeadingCont>
              <HeadingCont>
                <HeadingContText>ABCD hospital</HeadingContText>
              </HeadingCont>
            </MainHeadingCont>
            {hospitalDetails()}
          </HospitalDetails>
          <DoctorArticlesCont>
            <MainHeadingCont>
              <SubHeadingCont>
                <SubHeadingContText>Work done by him</SubHeadingContText>
              </SubHeadingCont>
              <HeadingCont>
                <HeadingContText>Articles</HeadingContText>
              </HeadingCont>
            </MainHeadingCont>
            {docData?.articles?.length > 0 ? doctorArticles() : notAvaliable()}
          </DoctorArticlesCont>

          <MainHeadingCont>
            <SubHeadingCont>
              <SubHeadingContText>Have a Look</SubHeadingContText>
            </SubHeadingCont>
            <HeadingCont>
              <HeadingContText>Gallery</HeadingContText>
            </HeadingCont>
          </MainHeadingCont>
          {docData?.hospital?.imgs?.length > 0
            ? doctorGallery()
            : notAvaliable()}
        </MainContainer>
      </ScrollView>
    </ThemeProvider>
  );
}

const NotAvaliableContText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-size: 20px;
  padding-bottom: ${props => Dimensions.get('window').height * 0.02}px;
  padding-top: ${props => Dimensions.get('window').height * 0.02}px;
`;

const NotAvaliableCont = styled.View`
  padding-bottom: ${props => Dimensions.get('window').height * 0.02}px;
  padding-top: ${props => Dimensions.get('window').height * 0.02}px;
  justify-content: center;
  align-items: center;
`;

const EachPic = styled.View`
  width: 100%;
  height: 300px;
  padding-bottom: ${props => Dimensions.get('window').height * 0.02}px;
  padding-top: ${props => Dimensions.get('window').height * 0.02}px;
`;
const AllPicsCont = styled.View``;
const GalleryCont = styled.View``;

const ArticleSubHeadingText = styled.Text`
  font-size: 18px;
  color: ${props => props.theme.text_secondary};
  font-style: italic;
`;
const ArticleHeadingText = styled.Text`
  font-size: 23px;
  color: orange;
  font-weight: bold;
`;
const ArticleSubHeading = styled.View`
  align-items: flex-end;
`;
const ArticleHeading = styled.View`
  padding-bottom: ${props => Dimensions.get('window').height * 0.02}px;
`;
const ArticleTouchableCont = styled.View`
  justify-content: space-between;
`;
const EachArticle = styled.View`
  padding-bottom: ${props => Dimensions.get('window').height * 0.01}px;
  padding-left: ${props => Dimensions.get('window').height * 0.02}px;
  padding-right: ${props => Dimensions.get('window').height * 0.02}px;
  margin-bottom: ${props => Dimensions.get('window').height * 0.01}px;
  border-color: ${props => props.theme.text_primary};
  border-width: 1px;
  border-radius: 10px;
`;
const ArticlesCont = styled.View``;
const DoctorArticlesCont = styled.View``;

const BtnText = styled.Text`
  font-size: 21px;
  color: orange;
`;
const SpecializationText = styled.Text`
  font-size: 21px;
  color: orange;
`;
const EachSpecialization = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${() => Dimensions.get('window').width * 0.05}px;
`;
const HospitalDetails = styled.View``;
const HospitalDetailLabel = styled.View`
  padding-bottom: ${props => Dimensions.get('window').height * 0.005}px;
  font-size: 18px;
  color: ${props => props.theme.text_secondary};
`;
const HospitalDetailInfo = styled.View`
  font-size: 21px;
  color: orange;
`;
const HospitalDetail = styled.View`
  padding-bottom: ${props => Dimensions.get('window').height * 0.01}px;
`;

const InfoText = styled.Text`
  font-size: 21px;
  color: orange;
`;
const LabelText = styled.Text`
  font-size: 18px;
  color: ${props => props.theme.text_secondary};
`;
const DetailInfo = styled.View``;
const DetailLabel = styled.View``;
const DoctorDetail = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const DoctorDetails = styled.View``;
const HeadingCont = styled.View`
  align-items: center;
`;
const HeadingContText = styled.Text`
  /* color: ${props => props.theme.text_primary}; */
  color: yellow;
  font-size: 22px;
  font-weight: bold;
`;
const SubHeadingContText = styled.Text`
  color: ${props => props.theme.text_secondary};
  font-size: 18px;
  font-style: italic;
`;
const SubHeadingCont = styled.View``;
const MainHeadingCont = styled.View`
  background-color: ${props => props.theme.secondary};
`;

const ImageStyled = styled.Image`
  width: 100%;
  height: 100%;
`;

const ImgContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
  padding-bottom: 50px;
`;
