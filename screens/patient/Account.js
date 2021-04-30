/* eslint-disable */

import React, {useState} from 'react';
import {
  Dimensions,
} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';

export default function Account(props) {
  const theme = useSelector(state => state.appReducer.colors);
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleThemeHandler = () => {
    setDarkTheme(prevTheme => {
      return !prevTheme;
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <SettingCont>
          <SettingHeading
            style={{
              paddingLeft: Dimensions.get('window').width * 0.02,
              paddingTop: Dimensions.get('window').height * 0.01,
              paddingBottom: Dimensions.get('window').height * 0.01,
            }}>
            <HeadingText>SETTINGS</HeadingText>
          </SettingHeading>
          <AllSettings>
            <EachSetting
              style={{
                paddingBottom: Dimensions.get('window').height * 0.02,
                paddingTop: Dimensions.get('window').height * 0.02,
                paddingLeft: Dimensions.get('window').width * 0.02,
                paddingRight: Dimensions.get('window').width * 0.02,
              }}>
              <SettingLabel>
                <SettingLabelText>Dark Theme</SettingLabelText>
              </SettingLabel>
              <SettingLabel>
                <SwitchStyled
                  trackColor={{false: '#767577', true: 'green'}}
                  thumbColor={darkTheme ? "green" : "#f4f3f4"}
                  onValueChange={toggleThemeHandler}
                  value={darkTheme}
                />
              </SettingLabel>
            </EachSetting>
          </AllSettings>
        </SettingCont>
      </MainContainer>
    </ThemeProvider>
  );
}
const SwitchStyled = styled.Switch``;
const SettingLabelText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-size: 20px;
`;
const SettingLabel = styled.View``;

const EachSetting = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.text_primary};
  justify-content: space-between;
`;
const AllSettings = styled.View``;

const HeadingText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-size: 20px;
  font-weight: bold;
`;
const SettingHeading = styled.View`
  background-color: ${props => props.theme.secondary};
`;
const SettingCont = styled.View``;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
`;
