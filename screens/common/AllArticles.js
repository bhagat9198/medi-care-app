/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';

import {appColor} from '../../constants/App';

export default function Articles(props) {
  const theme = useSelector(state => state.appReducer.colors);
  const [allArticles, setAllArticles] = useState(null);

  useEffect(() => {

  }, []);

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <ScrollView>
          <View style={styles.allArticles}>
            <View style={styles.eachArticle}>
              <TouchableHighlight
                style={{flex: 1}}
                onPress={() => {
                  // console.log(props.navigation);
                  return props.navigation.navigate('article', {data: 'lol'});
                }}>
                <View>
                  <Text style={[styles.txt]}>i am a heading</Text>
                  <Text style={[styles.txt]}>Doctor Name</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.eachArticle}>
              <TouchableHighlight>
                <View>
                  <Text style={[styles.txt]}>i am a heading</Text>
                  <Text style={[styles.txt]}>Doctor Name</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.eachArticle}>
              <TouchableHighlight>
                <View>
                  <Text style={[styles.txt]}>i am a heading</Text>
                  <Text style={[styles.txt]}>Doctor Name</Text>
                </View>
              </TouchableHighlight>
            </View>
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
