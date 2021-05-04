/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  Platform,
  StyleSheet,
  Dimensions,
  Button,
} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';

import {StackPatient} from './.././../constants/Navigation';
import {extractDataset, addDisease} from './../../store/actions/patient';

export default function DiseaseAnalysis(props) {
  const theme = useSelector(state => state.appReducer.colors);
  const [symptom1, setSymtom1] = useState(null);
  const [symptom2, setSymtom2] = useState(null);
  const [symptom3, setSymtom3] = useState(null);
  const [symptom4, setSymtom4] = useState(null);
  const [symptom5, setSymtom5] = useState(null);
  const [analysisReport, setAnalysisReport] = useState(false);

  const diseasesDatasetStore = useSelector(
    state => state.diseasesDatasetReducer,
  );

  

  const allSymtomsArr = [
    'Select your symtom',
    ...diseasesDatasetStore.allSymtoms,
  ];
  const dispatch = useDispatch();

  useEffect(async () => {
    let res = await dispatch(extractDataset());
    if (res.status) {
    } else {
      return Alert.alert(res.title, res.message);
    }
  }, []);

  const analyseDiseaseHandler = async () => {
    if (!symptom1 || symptom1 === 'Select your symtom') {
      return Alert.alert(
        'Empty Field',
        'Pleas select atleast first symptom to proceed',
      );
    }

    let symtomsFound = [];
    if (symptom1 && symptom1 !== 'Select your symtom') {
      symtomsFound.push(symptom1);
    }
    if (symptom2 && symptom2 !== 'Select your symtom') {
      symtomsFound.push(symptom2);
    }
    if (symptom3 && symptom3 !== 'Select your symtom') {
      symtomsFound.push(symptom3);
    }
    if (symptom4 && symptom4 !== 'Select your symtom') {
      symtomsFound.push(symptom4);
    }
    if (symptom5 && symptom5 !== 'Select your symtom') {
      symtomsFound.push(symptom5);
    }

    // console.log(symtomsFound);

    let allDiseasesFound = [];
    await diseasesDatasetStore.allDiseases.map((dis, index) => {
      for (let i = 0; i < symtomsFound.length; i++) {
        let sym = symtomsFound[i];
        if (
          sym == dis.Symptom_1 ||
          sym == dis.Symptom_2 ||
          sym == dis.Symptom_3 ||
          sym == dis.Symptom_4 ||
          sym == dis.Symptom_5
        ) {
        } else {
          break;
        }
        let matchedDis = dis.Disease;

        let filterMatchedDis = allDiseasesFound.filter(
          dis => dis.Disease === matchedDis,
        );
        if (filterMatchedDis.length === 0) {
          allDiseasesFound.push({...dis, index: index});
        }
      }
    });

    let wholeData = {
      diseases: allDiseasesFound,
      yourSymptoms: symtomsFound
    }
  

    let res = await dispatch(addDisease(wholeData));
    if (res.status) {
      setSymtom1(null);
      setSymtom2(null);
      setSymtom3(null);
      setSymtom4(null);
      setSymtom5(null);
      return props.navigation.navigate(StackPatient.diseases);
    } else {
      return Alert.alert(res.title, res.message);
    }
  };

  const eachPickerItemUI = data => {
    return allSymtomsArr.map(el => {
      return (
        <Picker.Item
          key={`${el}_${data}`}
          label={el}
          value={el}
          enabled={true}
          style={{
            borderBottomColor: theme.text_secondary,
          }}
        />
      );
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <MainContainer>
          <SymtomFormHeading>
            <SymtomFormHeadingText>
              Choose atlest one or atmost 5 symtom you are having. This will
              help us to analyze your disease.
            </SymtomFormHeadingText>
          </SymtomFormHeading>
          <SymptomsForm>
            <EachSymptom>
              <Picker
                style={styles.picker}
                selectedValue={symptom1}
                onValueChange={val => setSymtom1(val)}
                mode={Platform.OS === 'android' ? 'dropdown' : 'dialog'}
                dropdownIconColor="gray">
                {eachPickerItemUI(1)}
              </Picker>
            </EachSymptom>
            <EachSymptom>
              <Picker
                style={styles.picker}
                selectedValue={symptom2}
                onValueChange={val => setSymtom2(val)}
                mode={Platform.OS === 'android' ? 'dropdown' : 'dialog'}
                dropdownIconColor="gray">
                {eachPickerItemUI(2)}
              </Picker>
            </EachSymptom>
            <EachSymptom>
              <Picker
                style={styles.picker}
                selectedValue={symptom3}
                onValueChange={val => setSymtom3(val)}
                mode={Platform.OS === 'android' ? 'dropdown' : 'dialog'}
                dropdownIconColor="gray">
                {eachPickerItemUI(3)}
              </Picker>
            </EachSymptom>
            <EachSymptom>
              <Picker
                style={styles.picker}
                selectedValue={symptom4}
                onValueChange={val => setSymtom4(val)}
                mode={Platform.OS === 'android' ? 'dropdown' : 'dialog'}
                dropdownIconColor="gray">
                {eachPickerItemUI(4)}
              </Picker>
            </EachSymptom>
            <EachSymptom>
              <Picker
                style={styles.picker}
                selectedValue={symptom5}
                onValueChange={val => setSymtom5(val)}
                mode={Platform.OS === 'android' ? 'dropdown' : 'dialog'}
                dropdownIconColor="gray">
                {eachPickerItemUI(5)}
              </Picker>
            </EachSymptom>
          </SymptomsForm>
          <BtnCont>
            <Button title="ANALYZE" onPress={analyseDiseaseHandler} />
          </BtnCont>
        </MainContainer>
      </ScrollView>
    </ThemeProvider>
  );
}

const BtnCont = styled.View``;
const SymtomFormHeadingText = styled.Text`
  color: orange;
  font-size: 20px;
`;
const SymtomFormHeading = styled.View`
  justify-content: center;
  align-items: center;
`;
const EachSymptom = styled.View``;
const SymptomsForm = styled.View`
  padding-top: ${props => Dimensions.get('window').height * 0.02}px;
  padding-left: ${props => Dimensions.get('window').width * 0.02}px;
  padding-right: ${props => Dimensions.get('window').width * 0.02}px;
`;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
  padding-left: ${props => Dimensions.get('window').width * 0.02}px;
  padding-right: ${props => Dimensions.get('window').width * 0.02}px;
  padding-top: ${props => Dimensions.get('window').height * 0.02}px;
  padding-bottom: ${props => Dimensions.get('window').height * 0.1}px;
`;

const styles = StyleSheet.create({
  picker: {
    color: 'gray',
    marginBottom: 10,
    borderBottomWidth: 1,
  },
});
