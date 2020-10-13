import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import { find, groupBy } from 'lodash';
import parse from 'html-react-parser';
import { Box, Grid, useDisclosure, Heading, Flex } from '@chakra-ui/core';

import Layout from '../components/layout';
import IndicatorDropdown from '../components/indicatorDropdown';
import IndicatorModal from '../components/indicatorModal';
import RankGraphic from '../components/rankGraphic';
import RankResult from '../components/rankResult';
import StageMap from '../components/stageMap';

import Arrow from '../svg/arrow.svg';

const State = ({
  data: {
    metadata,
    indicator,
    allIndicators,
    stateName,
    state,
    ranking,
    pentagon,
    topPerforming,
    bottomPerforming,
  },
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let ranks = Object.keys(ranking).map(variable => ({
    variable,
    ranking: ranking[variable],
  }));
  ranks = ranks.sort((a, b) => a.ranking - b.ranking);
  const bottom3 = ranks.slice(0, 3);
  const top3 = ranks.slice(-3);

  const indicatorValues = Object.values(indicator)
    .map(a => parseFloat(a))
    .filter(a => a && !Number.isNaN(a))
    .sort((a, b) => b - a);
  const indicatorRank = indicatorValues.indexOf(parseFloat(indicator[stateName.state])) + 1;

  const categoryRankings = ranks
    .filter(r =>
      allIndicators.nodes
        .filter(i => i.condition)
        .map(v => v.variable.toLowerCase())
        .includes(r.variable.toLowerCase())
    )
    .map(r => ({
      ...groupBy(allIndicators.nodes, n => n.variable.toLowerCase())[r.variable.toLowerCase()][0],
      ...r,
      value: state[r.variable],
    }));

  return (
    <Layout>
      <Grid w="100%" templateColumns="35% 1fr" px={100} pb={100}>
        <Box py={[10, 20]} pr={200}>
          <Flex direction="column" h="100%" justify="space-between" pb={100}>
            <Link to="/" style={{ fontSize: 12, fontWeight: 900 }}>
              <Arrow
                style={{
                  display: 'inline',
                  transform: 'rotate(180deg)',
                  width: 16,
                  marginRight: 5,
                }}
              />
              BACK TO NATIONAL MAP AND RESULTS
            </Link>
            <Box>
              <Heading as="h1" fontFamily="Jubilat">
                {stateName.name}
              </Heading>
              <Heading as="h2">{metadata.title}</Heading>
            </Box>
            <p>{`Out of 50 states, ${stateName.name} ranks ${indicatorRank} for ${metadata.title}`}</p>
            <p>{parse(metadata.definition)}</p>
            <Link to="/learn-more" style={{ fontSize: 16, fontWeight: 700 }}>
              Learn more about what shapes health
              <Arrow
                style={{
                  display: 'inline',
                  width: 16,
                  marginLeft: 5,
                }}
              />
            </Link>
          </Flex>
        </Box>
        <Box>
          <IndicatorDropdown onShowAll={() => onOpen()} buttonText="GO" />
          <IndicatorModal isOpen={isOpen} onClose={() => onClose()} />
          <StageMap indicator={indicator} selectedState={stateName.state} />
        </Box>
      </Grid>
      <Grid w="100%" templateColumns="50% 50%" bg="#FFD285" p={100}>
        <Flex direction="column" justify="space-around">
          <Heading as="h3">{`How ${stateName.name} ranks on some of the most important conditions for health`}</Heading>
          <Link to="/learn-more" style={{ fontSize: 16, fontWeight: 700 }}>
            Learn more about why these matter so much for health
            <Arrow
              style={{
                display: 'inline',
                width: 18,
                marginLeft: 5,
              }}
            />
          </Link>
        </Flex>
        <Img fluid={pentagon.childImageSharp.fluid} />
        <RankGraphic rankings={categoryRankings} />
      </Grid>
      <Grid w="100%" templateColumns="1fr 1fr" px={100} py={200} columnGap={10}>
        <Box
          p={100}
          background="transparent linear-gradient(322deg, #009FFA 0%, #A0DDF9 80%, #A0DDF9 100%) 0% 0% no-repeat padding-box"
        >
          <Img
            fixed={topPerforming.childImageSharp.fixed}
            style={{
              position: 'absolute',
              marginTop: -250,
              right: '50%',
            }}
          />
          <Box h={100} mb={1}>
            Of the health statistics & outcomes on this site
            <br />
            <b>{`${stateName.name} ranks best in these areas`}</b>
          </Box>
          {top3.map(ind => {
            const result = find(
              allIndicators.nodes,
              i => i.variable.toLowerCase() === ind.variable.toLowerCase()
            );
            return (
              <RankResult
                key={result.title}
                indicator={result.title}
                state={stateName.name}
                rank={ind.ranking}
                value={parseFloat(state[ind.variable])}
                best
              />
            );
          })}
        </Box>
        <Box
          p={100}
          background="transparent linear-gradient(322deg, #1E306E 0%, #009FFA 100%) 0% 0% no-repeat padding-box"
          color="white"
        >
          <Box h={100} mb={1}>
            Of the health statistics & outcomes on this site
            <br />
            <b>{`${stateName.name} ranks poorest in these areas`}</b>
          </Box>
          {bottom3.map(ind => {
            const result = find(
              allIndicators.nodes,
              i => i.variable.toLowerCase() === ind.variable.toLowerCase()
            );
            return (
              <RankResult
                key={result.title}
                indicator={result.title}
                state={stateName.name}
                rank={ind.ranking}
                value={parseFloat(state[ind.variable])}
              />
            );
          })}
          <Img
            fixed={bottomPerforming.childImageSharp.fixed}
            style={{
              position: 'absolute',
              marginTop: 150,
              right: 100,
            }}
          />
        </Box>
      </Grid>
    </Layout>
  );
};

State.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default State;

export const query = graphql`
  query statePage($id: String, $state: String) {
    metadata: indicatorsCsv(id: { eq: $id }) {
      title
      definition
      high
      low
    }
    indicator: indicatorsCsv(id: { eq: $id }) {
      ...States
    }
    allIndicators: allIndicatorsCsv {
      nodes {
        title
        variable
        condition
        conditionDefinition
      }
    }
    stateName: statesCsv(state: { eq: $state }) {
      name
      state
    }
    state: statesCsv(state: { eq: $state }) {
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
    ranking: rankingCsv(state: { eq: $state }) {
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
    pentagon: file(relativePath: { eq: "social-determinants-pentagon.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    bottomPerforming: file(relativePath: { eq: "bottom-performing.png" }) {
      childImageSharp {
        fixed(height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    topPerforming: file(relativePath: { eq: "top-performing.png" }) {
      childImageSharp {
        fixed(height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
