import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { Box, Grid, Heading, Text } from '@chakra-ui/core';

const RankGraphic = ({ rankings }) => {
  const images = useStaticQuery(graphql`
    {
      education: file(relativePath: { eq: "cards/education.png" }) {
        childImageSharp {
          fixed(width: 220) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      healthcare: file(relativePath: { eq: "cards/healthcare.png" }) {
        childImageSharp {
          fixed(width: 220) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      housing: file(relativePath: { eq: "cards/housing.png" }) {
        childImageSharp {
          fixed(width: 220) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      income: file(relativePath: { eq: "cards/income.png" }) {
        childImageSharp {
          fixed(width: 220) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      policy: file(relativePath: { eq: "cards/policy.png" }) {
        childImageSharp {
          fixed(width: 220) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const order = [3, 2, 4, 1, 5];

  return (
    <Grid templateColumns="repeat(5, 1fr)" alignItems="center">
      {rankings.map((r, i) => (
        <Box
          key={r.variable}
          bg="white"
          shadow="lg"
          order={order[i]}
          w={220}
          py={5}
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
          {i === 0 && (
            <>
              <Img
                style={{ margin: '10px 0' }}
                fixed={images[r.condition.replace(/\W/, '').toLowerCase()].childImageSharp.fixed}
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
                {r.value}
              </Text>
            </>
          )}
          {i <= 2 && <Text mx={5}>{r.conditionDefinition}</Text>}
        </Box>
      ))}
    </Grid>
  );
};

RankGraphic.propTypes = {
  rankings: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default RankGraphic;
