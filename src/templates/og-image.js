import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Box, Grid, Flex, Text } from '@chakra-ui/core';

import TheMap from '../components/theMap';

import './state.css';
import Logo from '../svg/logo.svg';

const State = ({ data: { metadata, indicator, state, ranking, logo } }) => {
  return (
    <Grid
      w="1200px"
      h="630px"
      templateColumns="35% 1fr"
      gridColumnGap="29px"
      pl={50}
      fontSize="24px"
    >
      <Box gridArea="1 / 1 / 2 / 2" mt={80} p={['80px', 0]}>
        <Text>stateofhealth.org</Text>
      </Box>
      <Flex
        gridArea="2 / 1 / 4 / 2"
        bg="white"
        direction="column"
        h="100%"
        justify="space-between"
        pb={100}
        p={['40px', 0]}
      >
        <Box>
          <Text fontFamily="Jubilat" pb="20px" fontSize="40px">
            <span>How </span>
            <span style={{ color: '#F06060' }}>{state.name}</span>
            <span> ranks for </span>
            <span style={{ color: '#009FFA' }}>{metadata.title}</span>
          </Text>
          <Text fontFamily="Proxima Nova">
            {`Out of 50 states, ${state.name} ranks ${ranking[metadata.variable]} for ${
              metadata.title
            }`}
          </Text>
        </Box>
        <Box>
          <Flex>
            <Img fixed={logo.childImageSharp.fixed} />
            <Box h="40px" w="80px" px="10px" ml="10px" borderLeft="2px solid black">
              <Logo />
            </Box>
            <Text fontFamily="Proxima Nova" lineHeight="40px" fontSize="30px">
              State of Health
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Box gridArea="1 / 2 / 4 / 3">
        <TheMap
          indicator={indicator}
          selectedState={state}
          metadata={metadata}
          highRes
          hideButtons
        />
      </Box>
    </Grid>
  );
};

State.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default State;

export const query = graphql`
  query statePageOG($id: String, $state: String) {
    metadata: indicatorsJson(id: { eq: $id }) {
      title
      variable
    }
    indicator: indicatorsJson(id: { eq: $id }) {
      ...States
    }
    state: statesJson(state: { eq: $state }) {
      name
      state
    }
    ranking: rankingJson(state: { eq: $state }) {
      D_H
      D_w
      D_b
      D_aian
      D_a
      D_limitedeng
      HS13a_uninsured
      HS13b_PrivateIns
      SEF05_married
      SEF14b_CollageBAPlus
      SEF19_employed
      SEF25_severehouse
      sef26_occupantsrm
      SEF27_housingburden30
      SEF28_medHHInc
      SEF31_SingleParent
      SEF36_ChildPoverty
      SEF37_GiniInd
      SEF38_poverty
      HO49_Diabetes
      HO53_ActivityLimit
      HB50_Fruit
      HB38_inactivity
      HB41_currentsmoker
      HO22_ExVgGoodHealthStatAdult
      HO24_PhysUnhealthyDays
      HO25_MentUnhealthyDays
      HO33_OverwtAdult
      HO47_CVD
      HO48_Stroke
      HS11_NotAffordDoc
      HS19_DentalVisit
      HS21_Mammogram
      HB06_AnyBreastfeed
      HO30_Chlamydia
      HO32_HIV
      PS03_TobaccoTax
      hs23_crcscreen
      HO01_AllMort
      HO02_CVDMort
      HO03_CancerMort
      HO04_LowerRespMort
      HO05_CerebroMort
      HO06_AlzheimersMort
      HO07_DiabetesMort
      HO08_KidneyMort
      HO15_SuicideMort
      HO16_HomicideMort
      HO17_InfantMort
      HO18_LifeExpect
      HO20_YLL75
      HS02_ACSdischarge
      PSE44_violentcrimerate
      PS78b_Income_FPL1
      PS76a_Education_All
      HS07b_PCPratio2000
      HS08_MentCarShort
      HS25_AcuteReAdm
      PSE05b_WalkabilityPop
      PSE45_SocialCapital
      PSE60_FineParticulateMatter
      SEF40a_ConPov20
      SEF42a_HighMinority
      SEF42b_PoorHighMinority
      Ho27_LBW
      Ho28a_TeenBirth15to19
      SEF07_ECEnoHS
      SEF12_ReadProf8
      pse06_parks
      SEF45_adultjail
      PSE35b_ACES2
      PSE36_VIOLCRIME
      PSE25_SafeSchool
      PSE01_NHamenities
      HB03_Binge
      HO35_OverwtChild
      HO39_OralProbs
      HO40_adolasthma
      HB10_RxAbuse
      HB09_IllicitDrug
      PSE41_TeenMentor
      SEF48_foodinsecure
      HO11_MotorVehMort
      PS_PolicyRankings
    }
    logo: file(relativePath: { eq: "logos/center-logo-small.png" }) {
      childImageSharp {
        fixed(width: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
