/* eslint-disable */

import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {
  Button,
  Dimensions,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';

import {StackDoctor} from './../../constants/Navigation';

export default MyArticles = props => {
  const theme = useSelector(state => state.appReducer.colors);

  const eachArticleUI = () => {
    return (
      <EachArticleCont
        style={{
          width: Dimensions.get('window').width * 0.45,
          height: Dimensions.get('window').height * 0.35,
          margin: Dimensions.get('window').width * 0.025,
        }}>
        <TouchableNativeFeedback
          onPress={() =>
            props.navigation.navigate(StackDoctor.article, {data: 'lol'})
          }>
          <EachArticle>
            <ArticleContent
              style={{
                padding: Dimensions.get('window').width * 0.05,
              }}>
                <HeadingCont>
                <HeadingText>Article Heading Article Heading Article Heading Article HeadingArticle Heading</HeadingText>
                </HeadingCont>
                <DateText>22ndOct21</DateText>

            </ArticleContent>
            <ArticleAction>
              <EachBtn>
                <Button title="Delete" color="red" />
              </EachBtn>
              <EachBtn>
                <Button title="Edit" color="green" />
              </EachBtn>
            </ArticleAction>
          </EachArticle>
        </TouchableNativeFeedback>
      </EachArticleCont>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {eachArticleUI()}
          {eachArticleUI()}
          {eachArticleUI()}
        </ScrollView>
      </MainContainer>
    </ThemeProvider>
  );
};

const HeadingCont = styled.View`
padding-bottom: 10px;
`;

const EachBtn = styled.View`
  width: 50%;
`;
const ArticleAction = styled.View`
  flex-direction: row;
`;
const ArticleContent = styled.View`
  flex: 1;
  justify-content: center;
`;

const DateText = styled.Text`
  font-size: 15px;
  color: ${props => props.theme.text_secondary};
`;

const HeadingText = styled.Text`
  font-size: 20px;

  color: ${props => props.theme.text_primary};
`;

const EachArticle = styled.View`
  flex: 1;
  color: ${props => props.theme.text_primary};
  background-color: ${props => props => props.theme.secondary};
`;

const EachArticleCont = styled.View``;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
`;
