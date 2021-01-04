import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, useDisclosure, Heading, Flex, Icon, Text } from '@chakra-ui/core';
import { find, groupBy } from 'lodash';
import { graphql, Link } from 'gatsby';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import Img from 'gatsby-image';
import parse from 'html-react-parser';

import useIsMobile from '../utils/useIsMobile';

import format from '../utils/numberFormat';
import IndicatorDropdown from '../components/indicatorDropdown';
import IndicatorModal from '../components/indicatorModal';
import Layout from '../components/layout';
import RankGraphic from '../components/rankGraphic';
import RankResult from '../components/rankResult';
import Social from '../components/social';
import TheMap from '../components/theMap';

import './state.css';

const State = ({
  location,
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
  const { isOpen: socialIsOpen, onOpen: socialOnOpen, onClose: socialOnClose } = useDisclosure();

  const {
    isOpen: isIndicatorOpen,
    onOpen: onIndicatorOpen,
    onClose: onIndicatorClose,
  } = useDisclosure();

  const isMobile = useIsMobile();

  const [displayOnScroll, setDisplayOnScroll] = useState(false);

  useScrollPosition(
    ({ currPos }) => {
      const isShow = currPos.y < -216;
      if (isShow !== displayOnScroll) setDisplayOnScroll(isShow);
    },
    [displayOnScroll]
  );

  const handleMobileIndicatorToggle = () => {
    if (isIndicatorOpen) {
      onIndicatorClose();
    } else {
      onIndicatorOpen();
    }
  };

  const variables = groupBy(allIndicators.nodes, v => v.variable.toLowerCase());
  let ranks = Object.keys(ranking)
    .map(variable => ({
      variable,
      ranking: ranking[variable],
    }))
    .filter(
      r => variables[r.variable.toLowerCase()][0].category !== 'Race, ethnicity, and immigration'
    );
  ranks = ranks.sort((a, b) => a.ranking - b.ranking);
  const top3 = ranks.slice(0, 3);
  const bottom3 = ranks.slice(-3).reverse();

  const indicatorValues = Object.values(indicator)
    .map(a => parseFloat(a))
    .filter(a => a && !Number.isNaN(a))
    .sort((a, b) => b - a);
  if (metadata.positive === 'FALSE') indicatorValues.reverse();
  const indicatorRank = indicatorValues.indexOf(parseFloat(indicator[stateName.state])) + 1;

  const categoryRankings = ranks
    .filter(r =>
      allIndicators.nodes
        .filter(i => i.condition)
        .map(v => v.variable.toLowerCase())
        .includes(r.variable.toLowerCase())
    )
    .map(r => ({
      ...variables[r.variable.toLowerCase()][0],
      ...r,
      value: state[r.variable],
    }));

  return (
    <Layout
      location={location}
      description={`Out of 50 states, ${stateName.name} ranks ${indicatorRank} for ${metadata.title}`}
      ogImage
    >
      {/* header */}
      <IndicatorModal isOpen={isOpen} onClose={() => onClose()} />
      {displayOnScroll && !isMobile && (
        <Flex
          justify="space-between"
          align="center"
          w="100%"
          px={100}
          py={3}
          bg="#F06060"
          position="fixed"
          top="0"
          zIndex="30"
          shadow="lg"
          className="header-no-print"
        >
          <Link to="/" style={{ fontSize: 12, fontWeight: 900 }}>
            <Flex>
              <Icon name="arrow-back" size="16px" />
              <Text fontSize="12px" fontWeight="900" fontFamily="proxima-nova" color="#403F3F">
                BACK TO NATIONAL MAP AND RESULTS
              </Text>
            </Flex>
          </Link>
          <IndicatorDropdown
            onShowAll={() => onOpen()}
            buttonText="GO"
            buttonColor="#184595"
            showAllColor="#403F3F"
            initialIndicator={metadata.title}
            initialState={stateName.name}
          />
        </Flex>
      )}
      {!isMobile && (
        <Grid
          gridTemplateColumns="35% 1fr"
          gridColumnGap="29px"
          alignItems="baseline"
          px={100}
          py={18}
          className="header-no-print"
        >
          <Link to="/" style={{ fontSize: 12, fontWeight: 900 }}>
            <Flex>
              <Icon name="arrow-back" size="16px" />
              <Text fontSize="12px" fontWeight="900" fontFamily="proxima-nova" color="#403F3F">
                BACK TO NATIONAL MAP AND RESULTS
              </Text>
            </Flex>
          </Link>
          <IndicatorDropdown
            onShowAll={() => onOpen()}
            buttonText="GO"
            initialIndicator={metadata.title}
            initialState={stateName.name}
          />
        </Grid>
      )}
      {/* mobile header  */}
      {isMobile && (
        <Box>
          <Flex h="60px" justify="space-between" align="center" px={2} bg="#F06060">
            <Link
              to="/"
              style={{
                justifyContent: 'space-between',
                borderRight: '1.5px solid #8a2525',
                height: '100%',
                width: '50%',
                fontSize: '15px',
                fontWeight: '900',
                color: 'white',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Icon name="arrow-back" fontSize="27px" />
              <Text>BACK</Text>
              <span />
            </Link>
            <Flex
              h="100%"
              w="50%"
              color="white"
              fontSize="13px"
              lineHeight="15px"
              fontWeight="900"
              justify="space-between"
              align="center"
              onClick={() => handleMobileIndicatorToggle()}
              cursor="pointer"
            >
              <span />
              <Text paddingLeft={2}>Life Expectancy, Virginia </Text>
              {!isIndicatorOpen && <Icon name="edit" fontSize="27px" />}
              {isIndicatorOpen && <Icon name="small-close" fontSize="27px" />}
            </Flex>
          </Flex>
          {isIndicatorOpen && (
            <Box
              position="absolute"
              right="0"
              w="100%"
              h="100vh"
              zIndex="20"
              display="flex"
              justifyContent="flex-end"
              bg="#024475bd"
              className="blur"
            >
              <Box bg="white" p={6} w="400px" height="400px">
                <IndicatorDropdown onShowAll={() => onOpen()} buttonText="GO" />
              </Box>
            </Box>
          )}
        </Box>
      )}
      <Social
        isOpen={socialIsOpen}
        url={location.href}
        pathname={location.pathname}
        onOpen={() => socialOnOpen()}
        onClose={() => socialOnClose()}
      />

      <Grid
        w="100%"
        templateColumns={['1fr', '35% 1fr']}
        gridTemplateRows={['0.3fr 1fr 1fr', '1fr 1fr 1fr']}
        gridColumnGap={[0, '29px']}
        px={[0, 100]}
        pb={[0, 100]}
        className="to-print-s1"
      >
        <Box
          className="to-print-s1-title"
          gridArea={['1 / 1 / 2 / 3', '1 / 1 / 2 / 2']}
          p={['40px', 0]}
        >
          <Heading as="h1" fontFamily="Jubilat" fontSize="38px" fontWeight="normal" color="#403F3F">
            {stateName.name}
          </Heading>
          <Heading
            as="h2"
            fontFamily="proxima-nova"
            fontWeight="normal"
            fontSize="24px"
            color="#403F3F"
          >
            {metadata.title}
          </Heading>
        </Box>
        <Flex
          gridArea={['3 / 1 / 4 / 3', '2 / 1 / 4 / 2']}
          bg={['#F0F0F0', 'white']}
          direction="column"
          h="100%"
          justify="flex-end"
          pb={100}
          p={['40px', 0]}
          className="to-print-s1-description"
        >
          <Box marginBottom={[0, '50px']} marginRight={[0, '80px']}>
            <Text fontFamily="proxima-nova" fontSize="18px" fontWeight="500" pb={['20px', '40px']}>
              {`Out of 51, ${stateName.name} ranks ${indicatorRank} for ${metadata.title}.`}
            </Text>
            <Text color="#403F3F" fontFamily="proxima-nova">
              {parse(metadata.definition)}
            </Text>
          </Box>
          <a
            href="/learn-more"
            className="arrow"
            style={{
              fontSize: 16,
              fontWeight: 700,
              textDecoration: 'underline',
              color: '#403F3F',
            }}
          >
            <Text color="#403F3F" fontFamily="proxima-nova">
              Learn more about what shapes health
              <Icon name="arrow" />
            </Text>
          </a>
        </Flex>
        <Box className="to-print-s1-map" gridArea={['2 / 1 / 3 / 3', '1 / 2 / 4 / 3']}>
          <TheMap
            indicator={indicator}
            selectedState={stateName}
            metadata={metadata}
            onShare={() => socialOnOpen()}
            highRes
            zoomOut={false}
          />
        </Box>
      </Grid>
      <Grid
        className="to-print-s2"
        w="100%"
        templateColumns={['1fr', '50% 50%']}
        bg="#FFD285"
        p={['40px', '100px']}
      >
        <Flex direction="column" justify="space-around">
          <Heading
            className="to-print-s2-heading"
            display={['none', 'block']}
            fontSize="30px"
            fontFamily="proxima-nova"
            fontWeight="800"
            color="#403F3F"
          >
            {`How ${stateName.name} ranks on some of the most important conditions for health`}
          </Heading>
          <a
            href="/learn-more"
            className="arrow"
            style={{
              fontSize: 18,
              fontWeight: 700,
              paddingBottom: '24px',
              textDecoration: 'underline',
              fontFamily: 'proxima-nova',
            }}
          >
            Learn more about why these matter so much for health
            <Icon name="arrow" />
          </a>
        </Flex>
        <Img fluid={pentagon.childImageSharp.fluid} />
        <Box>
          <RankGraphic rankings={categoryRankings} />
        </Box>
      </Grid>
      <Grid
        w="100%"
        templateColumns="1fr 1fr"
        px={100}
        py={200}
        columnGap={10}
        display={['none', 'grid']}
      >
        <Box
          p={100}
          background="transparent linear-gradient(322deg, #009FFA 0%, #A0DDF9 80%, #A0DDF9 100%) 0% 0% no-repeat padding-box"
        >
          <Img
            fixed={topPerforming.childImageSharp.fixed}
            style={{
              position: 'absolute',
              marginTop: -249,
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
                rank={parseFloat(ind.ranking)}
                value={format(
                  state[ind.variable],
                  variables[ind.variable.toLowerCase()][0].unit,
                  variables[ind.variable.toLowerCase()][0].rounding,
                  variables[ind.variable.toLowerCase()][0].decimals,
                  variables[ind.variable.toLowerCase()][0].factor
                )}
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
                rank={parseFloat(ind.ranking)}
                value={format(
                  state[ind.variable],
                  variables[ind.variable.toLowerCase()][0].unit,
                  variables[ind.variable.toLowerCase()][0].rounding,
                  variables[ind.variable.toLowerCase()][0].decimals,
                  variables[ind.variable.toLowerCase()][0].factor
                )}
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
  location: PropTypes.shape().isRequired,
};

export default State;

export const query = graphql`
  query statePage($id: String, $state: String) {
    metadata: indicatorsJson(id: { eq: $id }) {
      title
      definition
      unit
      rounding
      decimals
      positive
      factor
      high
      low
    }
    indicator: indicatorsJson(id: { eq: $id }) {
      ...States
    }
    allIndicators: allIndicatorsJson {
      nodes {
        title
        variable
        unit
        rounding
        decimals
        factor
        category
        condition
        conditionDefinition
      }
    }
    stateName: statesJson(state: { eq: $state }) {
      name
      state
    }
    state: statesJson(state: { eq: $state }) {
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
