/* eslint-disable */

import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {appColor} from '../../constants/App';

export default function Article(props) {
  return (
    <View style={{flex: 1, backgroundColor: appColor.dark.primary}}>
      <ScrollView style={{padding: Dimensions.get('window').width * 0.03}}>
        <View style={styles.mainHeadingCont}>
          <Text style={[styles.txt, styles.mainHeading]}>
            Big Long Heading Big Long Heading
          </Text>
        </View>
        <View style={styles.secondHeadingCont}>
          <View style={styles.secondHeadingView}></View>
          <Text style={[styles.txt, styles.subHeaing]}>Doctor Name</Text>
        </View>
        <View style={styles.articleBodyCont}>
          <Text style={[styles.txt, styles.articleBody]}>
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs. The passage is
            attributed to an unknown typesetter in the 15th century who is
            thought to have scrambled parts of Cicero's De Finibus Bonorum et
            Malorum for use in a type specimen book.Lorem ipsum, or lipsum as it
            is sometimes known, is dummy text used in laying out print, graphic
            or web designs. The passage is attributed to an unknown typesetter
            in the 15th century who is thought to have scrambled parts of
            Cicero's De Finibus Bonorum et Malorum for use in a type specimen
            book.Lorem ipsum, or lipsum as it is sometimes known, is dummy text
            used in laying out print, graphic or web designs. The passage is
            attributed to an unknown typesetter in the 15th century who is
            thought to have scrambled parts of Cicero's De Finibus Bonorum et
            Malorum for use in a type specimen book.
          </Text>
        </View>
        <View style={styles.secondHeadingCont}>
          <Text style={[styles.txt, styles.secondHeading]}>
            About the Doctor
          </Text>
        </View>
        <View style={styles.aboutDocCont}>
          <Text style={[styles.txt, styles.articleBody]}>
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs. The passage is
            attributed to an unknown typesetter in the 15th century who is
            thought to have scrambled parts of Cicero's De Finibus Bonorum et
            Malorum for use in a type specimen book.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

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
    paddingBottom: 30,
    borderBottomColor: 'red',
    borderBottomWidth: 2,
    borderRadius: 50,
  },
  secondHeadingCont: {
    marginBottom: 20,
  },
  aboutDocCont: {
    paddingBottom: 50
  }
});
