/* eslint-disable */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import styled, {ThemeProvider} from 'styled-components/native';
import {useSelector} from 'react-redux';

export default function MyDoctors(props) {
  const theme = useSelector(state => state.appReducer.colors);

  const regex = /\@[-?\d\.]*\,([-?\d\.]*)/gm;
  const str = `https://www.google.com/maps/place/Nagappa+Hadli+Hospital/@13.0830973,77.5467358,17z/data=!3m1!4b1!4m5!3m4!1s0x3bae2297a826c479:0x2459f8c0a7fa5742!8m2!3d13.0830973!4d77.5489245`;
  let m;

  while ((m = regex.exec(str)) !== null) {
    console.log(m, 'jijiji');
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      console.log(`Found match, group ${groupIndex}: ${match}`);
    });
  }

  // const regex1 = /ll=[-?\d\.]*\,([-?\d\.]*)/gm;
  // const str1 = ` https://maps.google.com/maps?ll=43.6474528,-79.3799409,&amp;z=16&amp;t=m&amp;hl=en-US&amp;gl=US&amp;mapclient=apiv3`;
  // let m1;
  // console.log(regex1.exec(str1), 'koko');
  // while ((m1 = regex1.exec(str1)) !== null) {
  //   console.log(m1, 'hahah');
  //   // This is necessary to avoid infinite loops with zero-width matches
  //   if (m1.index === regex1.lastIndex) {
  //     regex1.lastIndex++;
  //   }

  //   // The result can be accessed through the `m`-variable.
  //   m1.forEach((match, groupIndex) => {
  //     console.log(`Found match, group ${groupIndex}: ${match}`);
  //   });
  // }

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <Text>My Doctors</Text>
      </MainContainer>
    </ThemeProvider>
  );
}
const MainContainer = styled.View`
  background-color: ${props => props.theme.primary};
  flex: 1;
`;

const Text = styled.Text`
  color: white;
`;

const styles = StyleSheet.create({});
