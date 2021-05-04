/* eslint-disable */

import React, {useEffect, useState} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {
  Alert,
  Button,
  Dimensions,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {StackDoctor} from './../../constants/Navigation';
import {
  extractUserAllArticle,
  deleteArticle,
} from './../../store/actions/doctor';

export default MyArticles = props => {
  const theme = useSelector(state => state.appReducer.colors);
  const [articles, setArticles] = useState([]);
  const dispatch = useDispatch();

  // useEffect(async() => {
  //   console.log('useEffect');
  //   let res = await dispatch(extractUserAllArticle());
  //   console.log('res', res);
  //   if (res.status) {
  //     setArticles(res.data);
  //   } else {
  //     Alert.alert(res.title, res.message);
  //   }

  // }, []);

  async function fectData() {
    let res = await dispatch(extractUserAllArticle());
    // console.log('res', res);
    if (res.status) {
      setArticles(res.data);
    } else {
      Alert.alert(res.title, res.message);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fectData();
    }, []),
  );

  const eachArticleUI = () => {
    return articles.map(article => {
      let datetime = new Date(article.created).toISOString();
      let date = datetime.split('T')[0];
      let time = datetime.split('T')[1].split('.')[0];
      return (
        <EachArticleCont
          key={Math.random()}
          style={{
            width: Dimensions.get('window').width * 0.45,
            height: Dimensions.get('window').height * 0.35,
            margin: Dimensions.get('window').width * 0.025,
          }}>
          <TouchableNativeFeedback
            onPress={() =>
              props.navigation.navigate(StackDoctor.article, {
                articleId: article.articleId,
                docId: article.docId,
                userType: article.userType,
              })
            }>
            <EachArticle>
              <ArticleContent
                style={{
                  padding: Dimensions.get('window').width * 0.05,
                }}>
                <HeadingCont>
                  <HeadingText>{article.title}</HeadingText>
                </HeadingCont>
                <DateText>
                  {date} {time}
                </DateText>
              </ArticleContent>
              <ArticleAction>
                <EachBtn>
                  <Button
                    title="Delete"
                    color="red"
                    onPress={async () => {
                      await dispatch(
                        deleteArticle(
                          article.userType,
                          article.docId,
                          article.articleId,
                        ),
                      );
                      fectData();
                    }}
                  />
                </EachBtn>
                {/* <EachBtn>
                <Button title="Edit" color="green" />
              </EachBtn> */}
              </ArticleAction>
            </EachArticle>
          </TouchableNativeFeedback>
        </EachArticleCont>
      );
    });
  };

  const notAvaliable = () => {
    return (
      <NotAvaliableCont>
        <NotAvaliableText>
          You have not posted any article yet. Post your article now to become
          more popular doctor.
        </NotAvaliableText>
      </NotAvaliableCont>
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
          {articles.length > 0 ? eachArticleUI() : notAvaliable()}
        </ScrollView>
      </MainContainer>
    </ThemeProvider>
  );
};

const NotAvaliableText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-size: 20px;
`;
const NotAvaliableCont = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const HeadingCont = styled.View`
  padding-bottom: 10px;
`;

const EachBtn = styled.View`
  width: 100%;
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
