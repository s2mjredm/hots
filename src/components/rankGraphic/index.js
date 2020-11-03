import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { Box, Heading, Text } from '@chakra-ui/core';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import format from '../../utils/numberFormat';

import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import '../../css/rank-graphic.css';

const RankGraphic = ({ rankings }) => {
  const images = useStaticQuery(graphql`
    {
      education: file(relativePath: { eq: "cards/education.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      healthcare: file(relativePath: { eq: "cards/healthcare.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      housing: file(relativePath: { eq: "cards/housing.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      income: file(relativePath: { eq: "cards/income.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      policy: file(relativePath: { eq: "cards/policy.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const [numSlides, setNumSlides] = useState(5);
  const resize = e => {
    const { innerWidth } = e.target;
    setNumSlides(Math.min(Math.floor((innerWidth - 80) / 220), 5));
  };
  window.addEventListener('resize', resize);

  const order = [3, 2, 4, 1, 5];

  SwiperCore.use([Pagination]);

  return (
    <Box w={1100} maxW="calc(100vw - 80px)">
      <Swiper
        loop
        pagination={{ clickable: true }}
        centeredSlides
        slidesPerView={numSlides}
        style={{ alignItems: 'center' }}
      >
        {rankings.map((r, i) => (
          <SwiperSlide key={r.variable}>
            {({ isActive, isPrev, isNext }) => (
              <Box
                bg="white"
                shadow="lg"
                order={order[i]}
                minW={220}
                py={5}
                mt={30}
                color="#184595"
              >
                <Box
                  w={60}
                  h={60}
                  borderRadius={30}
                  bg="#184595"
                  position="relative"
                  bottom={50}
                  left={80}
                  mb={-50}
                  lineHeight="60px"
                  textAlign="center"
                  color="white"
                  fontFamily="Jubilat"
                  fontSize={24}
                >
                  {r.ranking}
                </Box>
                <Heading as="h2" fontFamily="Jubilat" fontSize={24} mx={5}>
                  {r.condition}
                </Heading>
                {isActive && (
                  <>
                    <Img
                      style={{ margin: '10px 0' }}
                      fluid={
                        images[r.condition.replace(/\W/, '').toLowerCase()].childImageSharp.fluid
                      }
                    />
                    <Text
                      fontFamily="Jubilat"
                      fontSize={48}
                      color="white"
                      lineHeight="50px"
                      position="relative"
                      bottom={60}
                      left="5px"
                      mb="-50px"
                    >
                      {format(r.value, r.unit, r.rounding, r.decimals, r.factor)}
                    </Text>
                  </>
                )}
                {(isActive || isPrev || isNext) && (
                  <Text mx={5} minH={72}>
                    {r.conditionDefinition}
                  </Text>
                )}
              </Box>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

RankGraphic.propTypes = {
  rankings: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default RankGraphic;
