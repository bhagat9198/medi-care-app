/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';

import {appColor} from '../../constants/App';
import {extractEachArticle} from './../../store/actions/doctor';

export default function Article(props) {
  const [article, setArticle] = useState({});
  const [date, setDate] = useState('');

  const dispatch = useDispatch();

  useEffect(async () => {
    let res = await dispatch(
      extractEachArticle(
        props.route.params.userType,
        props.route.params.docId,
        props.route.params.articleId,
      ),
    );
    // console.log('res', res);
    if (res.status) {
      setArticle(res.data);
      setDate(new Date(res.data.created).toISOString());
    } else {
      return Alert.alert(res.title, res.message);
    }
  }, []);

  const imgDisplay = imgOrder => {
    let path;
    if (imgOrder === 'top') {
      path = article?.topImg?.url;
    } else if (imgOrder === 'middle') {
      path = article?.middleImg?.url;
    } else if (imgOrder === 'last') {
      path = article?.lastImg?.url;
    }

    return (
      <ImgCont>
        <ImageStyled
          onError={error => {
            // console.log('error img', error);
          }}
          testID={'topImg'}
          resizeMethod="resize"
          resizeMode="contain"
          source={{uri: path}}
        />
      </ImgCont>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: appColor.dark.primary}}>
      <ScrollView style={{padding: Dimensions.get('window').width * 0.03}}>
        <View style={{paddingBottom: 50}}>
          <View style={styles.mainHeadingCont}>
            <Text style={[styles.txt, styles.mainHeading]}>
              {article?.title}
            </Text>
          </View>
          <View style={styles.secondHeadingCont}>
            <View style={styles.secondHeadingView}></View>
            <Text style={[styles.txt, styles.subHeaing]}>
              {`${article?.initialName} ${article?.fName} ${article?.lName}`}
            </Text>
            <View>
              <Text style={[styles.txt, styles.subHeaing]}>{date}</Text>
            </View>
          </View>
          {article?.topImg?.status ? imgDisplay('top') : null}
          <View style={styles.articleBodyCont}>
            <Text style={[styles.txt, styles.articleBody]}>
              {article?.firstPara}
            </Text>
          </View>
          {article?.topImg?.status ? imgDisplay('middle') : null}
          <View style={styles.articleBodyCont}>
            <Text style={[styles.txt, styles.articleBody]}>
              {article?.lastPara}
            </Text>
          </View>
          {article?.topImg?.status ? imgDisplay('last') : null}
        </View>
      </ScrollView>
    </View>
  );
}

const ImageStyled = styled.Image`
  width: 100%;
  height: 100%;
`;

const ImgCont = styled.View`
  width: 100%;
  height: 300px;
  margin-top: ${props => Dimensions.get('window').height * 0.02}px;
  margin-bottom: ${props => Dimensions.get('window').height * 0.02}px;
`;

const styles = StyleSheet.create({
  txt: {
    // color: appColor.dark.text_primary,
  },
  mainHeading: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'yellow',
  },
  subHeaing: {
    fontStyle: 'italic',
    fontSize: 15,
    color: 'yellow',
  },
  articleBody: {
    fontSize: 20,
    color: appColor.dark.text_secondary,
  },
  secondHeading: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'yellow',
  },
  mainHeadingCont: {
    marginBottom: 10,
  },
  secondHeadingCont: {
    marginBottom: 20,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  secondHeadingView: {
    flex: 1,
    borderBottomColor: 'red',
    borderWidth: 1,
    paddingRight: 10,
    justifyContent: 'center',
  },
  articleBodyCont: {
    marginBottom: 30,
  },
  secondHeadingCont: {
    marginBottom: 20,
  },
  aboutDocCont: {
    paddingBottom: 50,
  },
});
