/*eslint-disable*/

import React, {useEffect} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {Dimensions, ScrollView, TouchableNativeFeedback} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default Diseases = props => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.appReducer.colors);

  const eachDiseaseUI = () => {
    return (
      <EachDiseases
        style={{
          marginTop: Dimensions.get('window').height * 0.01,
          marginBottom: Dimensions.get('window').height * 0.01,
        }}>
        <EachDiseasesMainCont style={{
          marginTop: Dimensions.get('window').height * 0.01,
          marginBottom: Dimensions.get('window').height * 0.01,
        }}>
          <LeftCont
            style={{
              paddingLeft: Dimensions.get('window').width * 0.02,
              paddingRight: Dimensions.get('window').width * 0.02,
            }}>
            <DateCont>
              <DateText>01</DateText>
            </DateCont>
            <MonthCont>
              <MonthText>MAY</MonthText>
            </MonthCont>
          </LeftCont>
          <MiddleCont
            style={{
              paddingLeft: Dimensions.get('window').width * 0.05,
              paddingRight: Dimensions.get('window').width * 0.02,
            }}>
            <EachDiseasesHeadingSub>
              <EachDiseasesHeadingSubText>
                Disease analyed
              </EachDiseasesHeadingSubText>
            </EachDiseasesHeadingSub>
            <EachDiseasesHeadingMain>
              <EachDiseasesHeadingMainText>
                Common Cold
              </EachDiseasesHeadingMainText>
            </EachDiseasesHeadingMain>
          </MiddleCont>
          <RightCont
            style={{
              paddingLeft: Dimensions.get('window').width * 0.02,
              paddingRight: Dimensions.get('window').width * 0.02,
            }}>
            <AntDesign name="delete" size={35} color="red" />
          </RightCont>
        </EachDiseasesMainCont>
        <EachDiseasesSubCont style={{
          marginTop: Dimensions.get('window').height * 0.005,
          marginBottom: Dimensions.get('window').height * 0.02,
          paddingLeft: Dimensions.get('window').width * 0.02,
          paddingRight: Dimensions.get('window').width * 0.02,
        }}>
          <EachDiseaseDetail style={{
            marginBottom: Dimensions.get('window').height * 0.01,
          }}>
            <EachDiseaseLabel style={{
              paddingRight: Dimensions.get('window').width * 0.03,
            }}>
              <EachDiseaseLabelText>Symptom 1</EachDiseaseLabelText>
            </EachDiseaseLabel>
            <EachDiseaseInfo>
              <EachDiseaseInfoText>Body Pain</EachDiseaseInfoText>
            </EachDiseaseInfo>
          </EachDiseaseDetail>
        </EachDiseasesSubCont>
      </EachDiseases>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <MainContainer>
          <AddDiseasesCont
            style={{
              paddingTop: Dimensions.get('window').height * 0.02,
              paddingBottom: Dimensions.get('window').height * 0.03,
            }}>
            <SubText>Not Well? Checkout your disease</SubText>
            <TouchableNativeFeedback>
              <HeadingTextCont
                style={{
                  marginTop: Dimensions.get('window').height * 0.02,
                  paddingTop: Dimensions.get('window').height * 0.01,
                  paddingBottom: Dimensions.get('window').height * 0.01,
                  paddingLeft: Dimensions.get('window').width * 0.05,
                  paddingRight: Dimensions.get('window').width * 0.05,
                }}>
                <HeadingText>ANALYZE</HeadingText>
              </HeadingTextCont>
            </TouchableNativeFeedback>
          </AddDiseasesCont>
          <AllDiseasesCont>
            <AllDiseasesHeading style={{
              paddingTop: Dimensions.get('window').height * 0.01,
              paddingBottom: Dimensions.get('window').height * 0.01,
              paddingLeft: Dimensions.get('window').width * 0.05,
            }}>
              <AllDiseasesHeadingText>YOUR DISEASES</AllDiseasesHeadingText>
            </AllDiseasesHeading>
            {eachDiseaseUI()}
            {eachDiseaseUI()}
          </AllDiseasesCont>
        </MainContainer>
      </ScrollView>
    </ThemeProvider>
  );
};

const HeadingTextCont = styled.View`
  background-color: red;
  border-radius: 5px;
`;

const SubText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-size: 18px;
`;

const HeadingText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-size: 24px;
  font-weight: bold;
`;

const AddDiseasesCont = styled.View`
  justify-content: center;
  align-items: center;
`;
const AllDiseasesHeadingText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-size: 18px;
  font-weight: bold;
`;

const AllDiseasesHeading = styled.View`
  background-color: ${props => props.theme.secondary};
`;
const DateText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-size: 24px;
`;

const MonthText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-size: 20px;
`;

const MonthCont = styled.View``;
const DateCont = styled.View``;
const EachDiseasesHeadingSub = styled.View``;
const EachDiseasesHeadingSubText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-size: 18px;
`;

const EachDiseasesHeadingMainText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-size: 21px;
`;

const EachDiseasesHeadingMain = styled.View``;
const LeftCont = styled.View`
  align-items: center;
  justify-content: center;
`;
const MiddleCont = styled.View`
  flex: 1;
`;

const RightCont = styled.View`
  align-items: center;
  justify-content: center;
`;
const EachDiseasesMainCont = styled.View`
  flex-direction: row;
`;
const EachDiseaseInfoText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-size: 17px;
  font-weight: bold;
`;

const EachDiseaseLabelText = styled.Text`
  color: ${props => props.theme.text_secondary};
  font-size: 17px;
`;

const EachDiseaseLabel = styled.View``;
const EachDiseaseInfo = styled.View``;
const EachDiseaseDetail = styled.View`
flex-direction: row;
`;
const EachDiseasesSubCont = styled.View``;
const EachDiseases = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: green;
`;

const AllDiseasesCont = styled.View``;
const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
`;
