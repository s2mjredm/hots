import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import parse from 'html-react-parser';

import Layout from '../components/layout';

const State = ({ data: { metadata, indicator, allIndicators, stateName, state, ranking } }) => {
  let ranks = Object.keys(ranking).map(variable => ({ variable, ranking: ranking[variable]}));
  ranks = ranks.sort((a, b) => a.ranking - b.ranking);
  const bottom5 = ranks.slice(0, 3);
  const top5 = ranks.slice(-3);

  return (
    <Layout>
      <h1>{metadata.title}</h1>
      {parse(metadata.definition)}
      <ul>
        {Object.keys(indicator).map(state => (
          <li>
            <b>{`${state}: `}</b>
            {indicator[state]}
          </li>
        ))}
      </ul>
      <h2>Bottom 5</h2>
      <ul>
        {bottom5.map(ind => {
          const indicatorTitle = allIndicators.nodes.find(i => i.variable === ind.variable);
          return (
            <li>
              {indicatorTitle && <b>{`${indicatorTitle.title}: `}</b>}
              {ind.ranking}
            </li>
          )
        })}
      </ul>
      <h2>Top 5</h2>
      <ul>
        {top5.map(ind => {
          const indicatorTitle = allIndicators.nodes.find(i => i.variable === ind.variable);
          return (
            <li>
              {indicatorTitle && <b>{`${indicatorTitle.title}: `}</b>}
              {ind.ranking}
            </li>
          )
        })}
      </ul>
      <h2>{stateName.name}</h2>
      <ul>
        {allIndicators.nodes.filter(ind => state[ind.variable]).map(ind => (
          <li>
            <b>{`${ind.title}: `}</b>
            {`${state[ind.variable]} (rank ${ranking[ind.variable]})`}
          </li>
        ))}
      </ul>
    </Layout>
  );
}

State.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default State;

export const query = graphql`
  query statePage($id: String, $state: String) {
    metadata: indicatorsCsv(id: {eq: $id}) {
      title
      definition
      high
      low
    }
    indicator: indicatorsCsv(id: {eq: $id}) {
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
    stateName: statesCsv(state: {eq: $state}) {
      name
    }
    state: statesCsv(state: {eq: $state}) {
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
    ranking: rankingCsv(state: {eq: $state}) {
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
  }
`;
