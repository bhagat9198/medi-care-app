/*eslint-disable*/

import React, {useEffect} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {
  Alert,
  Dimensions,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StackPatient} from './../../constants/Navigation';
import {extractPrecationAndDescription} from '../../store/actions/patient';
import UserSnapshot from './../../components/helpers/UserSnapshot';

export default Diseases = props => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.appReducer.colors);
  const diseasesDatasetStore = useSelector(
    state => state.diseasesDatasetReducer,
  );
  const authStore = useSelector(state => state.authReducer);

  useEffect(async () => {
    let res1 = await dispatch(extractPrecationAndDescription());
    if (res1.status) {
    } else {
      return Alert.alert(res1.title, res1.message);
    }
  }, []);

  let months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  const descriptionUI = diseasesListArr => {
    return diseasesListArr.map(d => {
      let filteredDescption = diseasesDatasetStore.diseasesDescription.filter(
        dp => dp.Disease === d,
      );
      if (filteredDescption.length > 0) {
        return (
          <EachDiseaseDetail key={Math.random()}
            style={{
              marginBottom: Dimensions.get('window').height * 0.01,
            }}>
            <EachDiseaseLabel
              style={{
                paddingRight: Dimensions.get('window').width * 0.03,
              }}>
              <EachDiseaseLabelText>
                About the disease : {filteredDescption[0].Disease}
              </EachDiseaseLabelText>
            </EachDiseaseLabel>
            <EachDiseaseInfo>
              <EachDiseaseInfoText>
                {filteredDescption[0].Description}
              </EachDiseaseInfoText>
            </EachDiseaseInfo>
          </EachDiseaseDetail>
        );
      }
    });
  };

  const precautionsUI = diseasesListArr => {
    return diseasesListArr.map(d => {
      let filteredPrecaution = diseasesDatasetStore.diseasesPrecaution.filter(
        dp => dp.Disease === d,
      );
      if (filteredPrecaution.length > 0) {
        return (
          <EachDiseaseDetail key={Math.random()}
            style={{
              marginBottom: Dimensions.get('window').height * 0.01,
            }}>
            <EachDiseaseLabel
              style={{
                paddingRight: Dimensions.get('window').width * 0.03,
              }}>
              <EachDiseaseLabelText>
                Precautions : {filteredPrecaution[0].Disease}
              </EachDiseaseLabelText>
            </EachDiseaseLabel>
            <EachDiseaseInfo>
              <EachDiseaseInfoText>
                {filteredPrecaution[0].Precaution_1}
              </EachDiseaseInfoText>
              <EachDiseaseInfoText>
                {filteredPrecaution[0].Precaution_2}
              </EachDiseaseInfoText>
              <EachDiseaseInfoText>
                {filteredPrecaution[0].Precaution_3}
              </EachDiseaseInfoText>
              <EachDiseaseInfoText>
                {filteredPrecaution[0].Precaution_4}
              </EachDiseaseInfoText>
            </EachDiseaseInfo>
          </EachDiseaseDetail>
        );
      }
    });
  };

  const eachDiseaseUI = () => {
    return authStore.diseases.map(dis => {
      let fullDate = new Date(dis.created)
        .toISOString()
        .split('T')[0]
        .split('-');
      let day = fullDate[fullDate.length - 1];
      let month = months[new Date(dis.created).getMonth()];
      let diseasesListArr = dis.diseases.map(d => d.Disease);
      let diseasesList = diseasesListArr.toString();
      let yourSymptoms = dis.yourSymptoms.toString();
      let otherSymptoms = new Set();
      dis.diseases.map(d => {
        otherSymptoms.add(d.Symptom_1);
        otherSymptoms.add(d.Symptom_2);
        otherSymptoms.add(d.Symptom_3);
        otherSymptoms.add(d.Symptom_4);
        otherSymptoms.add(d.Symptom_5);
      });
      let otherSymptomsArr = Array.from(otherSymptoms).toString();

      return (
        <EachDiseases
          key={dis.id}
          style={{
            marginTop: Dimensions.get('window').height * 0.01,
            marginBottom: Dimensions.get('window').height * 0.01,
          }}>
          <EachDiseasesMainCont
            style={{
              marginTop: Dimensions.get('window').height * 0.01,
              marginBottom: Dimensions.get('window').height * 0.01,
            }}>
            <LeftCont
              style={{
                paddingLeft: Dimensions.get('window').width * 0.02,
                paddingRight: Dimensions.get('window').width * 0.02,
              }}>
              <DateCont>
                <DateText>{day}</DateText>
              </DateCont>
              <MonthCont>
                <MonthText>{month}</MonthText>
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
                  {diseasesList}
                </EachDiseasesHeadingMainText>
              </EachDiseasesHeadingMain>
            </MiddleCont>
            <RightCont
              style={{
                paddingLeft: Dimensions.get('window').width * 0.02,
                paddingRight: Dimensions.get('window').width * 0.02,
              }}>

              {/* <AntDesign name="delete" size={35} color="red" /> */}
            </RightCont>
          </EachDiseasesMainCont>
          <EachDiseasesSubCont
            style={{
              marginTop: Dimensions.get('window').height * 0.005,
              marginBottom: Dimensions.get('window').height * 0.02,
              paddingLeft: Dimensions.get('window').width * 0.02,
              paddingRight: Dimensions.get('window').width * 0.02,
            }}>
            <EachDiseaseDetail
              style={{
                marginBottom: Dimensions.get('window').height * 0.01,
              }}>
              <EachDiseaseLabel
                style={{
                  paddingRight: Dimensions.get('window').width * 0.03,
                }}>
                <EachDiseaseLabelText>
                  Symptoms you mentioned
                </EachDiseaseLabelText>
              </EachDiseaseLabel>
              <EachDiseaseInfo>
                <EachDiseaseInfoText>{yourSymptoms}</EachDiseaseInfoText>
              </EachDiseaseInfo>
            </EachDiseaseDetail>
            <EachDiseaseDetail
              style={{
                marginBottom: Dimensions.get('window').height * 0.01,
              }}>
              <EachDiseaseLabel
                style={{
                  paddingRight: Dimensions.get('window').width * 0.03,
                }}>
                <EachDiseaseLabelText>
                  Other Symptoms related to these diseases
                </EachDiseaseLabelText>
              </EachDiseaseLabel>
              <EachDiseaseInfo>
                <EachDiseaseInfoText>{otherSymptomsArr}</EachDiseaseInfoText>
              </EachDiseaseInfo>
            </EachDiseaseDetail>
            {precautionsUI(diseasesListArr)}
            {descriptionUI(diseasesListArr)}
          </EachDiseasesSubCont>
        </EachDiseases>
      );
    });
  };

  const notAvalibaleUI = () => {
    return (
      <NotAvalibaleCont>
        <NotAvalibaleText>
          You havent made any consult with any doctor yet.
        </NotAvalibaleText>
      </NotAvalibaleCont>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}>
        <MainContainer>
          <AddDiseasesCont
            style={{
              paddingTop: Dimensions.get('window').height * 0.02,
              paddingBottom: Dimensions.get('window').height * 0.03,
            }}>
            <SubText>Not Well? Checkout your disease</SubText>
            <TouchableNativeFeedback
              onPress={() =>
                props.navigation.navigate(StackPatient.diseaseAnalysis)
              }>
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
            <AllDiseasesHeading
              style={{
                paddingTop: Dimensions.get('window').height * 0.01,
                paddingBottom: Dimensions.get('window').height * 0.01,
                paddingLeft: Dimensions.get('window').width * 0.05,
              }}>
              <AllDiseasesHeadingText>YOUR DISEASES</AllDiseasesHeadingText>
            </AllDiseasesHeading>
            {authStore?.diseases?.length > 0 ? eachDiseaseUI() : notAvalibaleUI()}
          </AllDiseasesCont>
          <UserSnapshot />
        </MainContainer>
      </ScrollView>
    </ThemeProvider>
  );
};

const NotAvalibaleText = styled.Text`
  color: orange;
  font-size: 20px;
`;
const NotAvalibaleCont = styled.View`
  flex: 1;
  height: 100px;
  justify-content: center;
  align-items: center;
`;

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
  font-size: 19px;
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
const EachDiseaseDetail = styled.View``;
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
