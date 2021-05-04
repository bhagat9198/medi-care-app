/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  Alert,
} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';

import {appColor} from '../../constants/App';
import {extractAllArticles} from './../../store/actions/doctor';
import {StackDoctor} from './../../constants/Navigation';
import {useFocusEffect} from '@react-navigation/native';

export default function Articles(props) {
  const theme = useSelector(state => state.appReducer.colors);
  const [allArticles, setAllArticles] = useState([]);
  const dispatch = useDispatch();

  // useEffect(async () => {
  //   let res = await dispatch(extractAllArticles());
  //   console.log('res', res);
  //   if (res.status) {
  //     setAllArticles(res.data);
  //   } else {
  //     Alert.alert(res.title, res.message);
  //   }
  // }, []);

  async function fetchData() {
    let res = await dispatch(extractAllArticles());
    // console.log('res', res);
    if (res.status) {
      setAllArticles(res.data);
    } else {
      Alert.alert(res.title, res.message);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <ScrollView>
          <View style={styles.allArticles}>
            {allArticles.map((art, index) => {
              return (
                <View style={styles.eachArticle} key={index}>
                  <TouchableHighlight
                    style={{flex: 1}}
                    onPress={() => {
                      // console.log(props.navigation);
                      return props.navigation.navigate(StackDoctor.article, {
                        articleId: art.articleId,
                        docId: art.docId,
                        userType: art.userType,
                      });
                    }}>
                    <View>
                      <Text style={[styles.txt]}>{art.title}</Text>
                      <Text
                        style={[
                          styles.txt,
                        ]}>{`${art.initailName} ${art.fName} ${art.lName}`}</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </MainContainer>
    </ThemeProvider>
  );
}

const MainContainer = styled.View`
  background-color: ${props => props.theme.primary};
  flex: 1;
  padding-top: ${() => Dimensions.get('window').height * 0.02}px;
`;

const styles = StyleSheet.create({
  allArticles: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  eachArticle: {
    borderColor: appColor.dark.secondary,
    borderWidth: 1,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.2,
    marginBottom: Dimensions.get('window').height * 0.03,
    padding: Dimensions.get('window').height * 0.02,
  },
  txt: {
    color: appColor.dark.text_primary,
  },
});
