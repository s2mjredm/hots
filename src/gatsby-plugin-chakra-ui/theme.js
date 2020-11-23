import React from 'react';
import { theme } from '@chakra-ui/core';

const customIcons = {
  share: {
    path: (
      <g>
        <circle fill="currentColor" cx="7" cy="7" r="7" />
        <circle fill="currentColor" cx="35" cy="22" r="7" />
        <circle fill="currentColor" cx="7" cy="38" r="7" />
        <line fill="none" stroke="currentColor" strokeWidth="3" x1="10" y1="8" x2="30" y2="20" />
        <line fill="none" stroke="currentColor" strokeWidth="3" x1="10" y1="36" x2="30" y2="24" />
      </g>
    ),
    viewBox: '0 0 42 45',
  },
  twitter: {
    path: (
      <path
        d="M26.237 5.918c.019.26.019.52.019.779 0 7.923-6.03 17.052-17.052 17.052A16.937 16.937 0 0 1 0 21.06a12.4 12.4 0 0 0 1.447.074 12 12 0 0 0 7.441-2.561 6 6 0 0 1-5.6-4.156 7.558 7.558 0 0 0 1.132.093 6.339 6.339 0 0 0 1.577-.2 5.994 5.994 0 0 1-4.806-5.882v-.074a6.036 6.036 0 0 0 2.709.761 6 6 0 0 1-1.855-8.016A17.036 17.036 0 0 0 14.4 7.366a6.766 6.766 0 0 1-.148-1.373 6 6 0 0 1 10.372-4.1 11.8 11.8 0 0 0 3.8-1.447 5.977 5.977 0 0 1-2.635 3.3 12.015 12.015 0 0 0 3.451-.928 12.883 12.883 0 0 1-3.003 3.1z"
        fill="currentColor"
      />
    ),
    viewBox: '0 0 29 23',
  },
  facebook: {
    path: (
      <path
        d="M16.9 18.994l.938-6.111h-5.864V8.917c0-1.672.819-3.3 3.445-3.3h2.666V.413A32.509 32.509 0 0 0 13.353 0C8.524 0 5.367 2.927 5.367 8.226v4.658H0v6.111h5.368v14.773h6.606V18.994z"
        fill="currentColor"
      />
    ),
    viewBox: '0 0 18 33',
  },
  pinterest: {
    path: (
      <path
        d="M33.705 16.853a16.855 16.855 0 0 1-21.84 16.1 18.944 18.944 0 0 0 2.093-4.417c.2-.788 1.046-4.009 1.046-4.009a4.513 4.513 0 0 0 3.86 1.937c5.083 0 8.746-4.675 8.746-10.485 0-5.565-4.546-9.731-10.39-9.731-7.271 0-11.138 4.879-11.138 10.2 0 2.47 1.318 5.552 3.418 6.527.319.149.489.082.564-.224.054-.231.34-1.379.469-1.91a.5.5 0 0 0-.116-.482 6.637 6.637 0 0 1-1.244-3.846A7.293 7.293 0 0 1 16.785 9.2a6.653 6.653 0 0 1 7.04 6.857c0 4.56-2.3 7.72-5.3 7.72a2.444 2.444 0 0 1-2.494-3.044c.476-2 1.393-4.166 1.393-5.613a2.116 2.116 0 0 0-2.134-2.372c-1.692 0-3.051 1.746-3.051 4.091a6.072 6.072 0 0 0 .5 2.5s-1.665 7.054-1.971 8.372a16.313 16.313 0 0 0-.061 4.838 16.854 16.854 0 1 1 23-15.7z"
        fill="currentColor"
      />
    ),
    viewBox: '0 0 34 34',
  },
  bars: {
    path: (
      <path
        fill="currentColor"
        d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
      />
    ),
    viewBox: '0 0 448 512',
  },
  bigArrow: {
    path: (
      <path
        fill="currentColor"
        d="M15.525,0,12.7,2.823,23.388,13.509H0v4.032H23.388L12.7,28.227l2.823,2.823L31.05,15.525Z"
      />
    ),
    viewBox: '0 0 31.05 31.05',
  },
  plus: {
    path: (
      <path
        d="M7.778,9.192,1.414,15.557,0,14.142,6.364,7.778,0,1.414,1.414,0,7.778,6.364,14.142,0l1.415,1.414L9.192,7.778l6.364,6.364-1.415,1.415Z"
        transform="translate(11.314) rotate(45)"
        fill="currentColor"
      />
    ),
    viewBox: '0 0 30 30',
  },
  attention: {
    path: (
      <path
        d="M9.643,0a9.643,9.643,0,1,0,9.643,9.643A9.671,9.671,0,0,0,9.643,0Zm1.326,14.7H8.317v-2.29h2.772V14.7Zm.121-8.919-.723,5.3H8.919L8.2,5.786V4.58h3.013V5.786Z"
        fill="currentColor"
      />
    ),
  },
  arrow: {
    path: (
      <path
        d="M15.525,0,12.7,2.823,23.388,13.509H0v4.032H23.388L12.7,28.227l2.823,2.823L31.05,15.525Z"
        fill="currentColor"
      />
    ),
    viewBox: '0 0 31.05 31.05',
  },
  globe: {
    path: (
      <path
        d="M2.4,2.4A7.263,7.263,0,0,1,8,0a7.263,7.263,0,0,1,5.6,2.4A7.263,7.263,0,0,1,16,8a7.263,7.263,0,0,1-2.4,5.6A7.263,7.263,0,0,1,8,16a7.263,7.263,0,0,1-5.6-2.4A7.984,7.984,0,0,1,0,8,7.263,7.263,0,0,1,2.4,2.4Zm6.667,12a3.276,3.276,0,0,0,2-1.2A5.824,5.824,0,0,0,12,10.4a2.208,2.208,0,0,0-.667-1.6A2.347,2.347,0,0,0,9.6,8H8.267a3.893,3.893,0,0,1-1.2-.267,1.21,1.21,0,0,1-.4-.933.693.693,0,0,1,.267-.533A1.011,1.011,0,0,1,7.467,6a.91.91,0,0,1,.667.4c.267.133.4.267.533.267A.8.8,0,0,0,9.2,6.533.8.8,0,0,0,9.333,6a2.122,2.122,0,0,0-.667-1.333,5.515,5.515,0,0,0,.667-2.533.287.287,0,0,0-.267-.267A4.122,4.122,0,0,0,8,1.6,6.67,6.67,0,0,0,4.533,2.667a3.357,3.357,0,0,0-1.2,2.667A3.414,3.414,0,0,0,4.4,7.867,3.643,3.643,0,0,0,6.933,8.933h0v.533A1.712,1.712,0,0,0,7.467,10.8a1.942,1.942,0,0,0,1.2.8V14c0,.133,0,.133.133.267S8.933,14.4,9.067,14.4Z"
        fill="currentColor"
      />
    ),
    viewBox: '0 0 16 16',
  },
  cursorArrow: {
    path: (
      <g>
        <g transform="translate(1334.07 407.737)">
          <g transform="translate(-1312.07 -407.737)">
            <path
              d="M-1304.932-403.482v-.164c0-.791.011-1.583-.006-2.374a1.632,1.632,0,0,0-.927-1.5,1.738,1.738,0,0,0-1.814.081,1.708,1.708,0,0,0-.8,1.545q0,2.921,0,5.843v.172l-.113-.123a5.056,5.056,0,0,0-1.011-.911,1.785,1.785,0,0,0-1.274-.293,1.316,1.316,0,0,0-1.161,1.075,2.239,2.239,0,0,0,.166,1.285,22.692,22.692,0,0,0,1.207,2.566,18.979,18.979,0,0,0,2.253,3.451,9.575,9.575,0,0,1,.6.808,2.436,2.436,0,0,1,.455,1.367.572.572,0,0,0,.655.645h6.962a.572.572,0,0,0,.651-.648,9.3,9.3,0,0,1,.192-1.9c.174-.808.37-1.612.559-2.417a13.379,13.379,0,0,0,.408-2.68c.023-.8.022-1.6.02-2.4a1.735,1.735,0,0,0-2.019-1.74c-.133.019-.263.055-.4.085a1.776,1.776,0,0,0-1.019-1.148,1.634,1.634,0,0,0-1.516.082A1.736,1.736,0,0,0-1304.932-403.482Z"
              transform="translate(1312.07 407.737)"
              fill="#fff"
            />
            <path
              d="M-1304.932-403.482a1.736,1.736,0,0,1,2.071.7,1.634,1.634,0,0,1,1.516-.082,1.776,1.776,0,0,1,1.019,1.148c.139-.03.269-.066.4-.085a1.735,1.735,0,0,1,2.019,1.74c0,.8,0,1.6-.02,2.4a13.379,13.379,0,0,1-.408,2.68c-.189.8-.385,1.608-.559,2.417a9.3,9.3,0,0,0-.192,1.9.572.572,0,0,1-.651.648h-6.962a.572.572,0,0,1-.655-.645,2.436,2.436,0,0,0-.455-1.367,9.575,9.575,0,0,0-.6-.808,18.979,18.979,0,0,1-2.253-3.451,22.692,22.692,0,0,1-1.207-2.566,2.239,2.239,0,0,1-.166-1.285,1.316,1.316,0,0,1,1.161-1.075,1.785,1.785,0,0,1,1.274.293,5.056,5.056,0,0,1,1.011.911l.113.123v-.172q0-2.921,0-5.843a1.708,1.708,0,0,1,.8-1.545,1.738,1.738,0,0,1,1.814-.081,1.632,1.632,0,0,1,.927,1.5c.017.791.005,1.583.006,2.374Zm4.656,12.286c.032-.32.041-.634.1-.938.177-.912.361-1.823.567-2.729a14.856,14.856,0,0,0,.465-2.422c.053-.932.044-1.868.057-2.8a.506.506,0,0,0-.236-.45.625.625,0,0,0-.644-.034.535.535,0,0,0-.3.514c0,.209,0,.418,0,.627a.541.541,0,0,1-.418.54.576.576,0,0,1-.761-.587c0-.582,0-1.165,0-1.747a.549.549,0,0,0-.409-.572.578.578,0,0,0-.771.588c0,.39,0,.779,0,1.169a.545.545,0,0,1-.411.558.578.578,0,0,1-.768-.591c0-.582,0-1.165,0-1.747a.546.546,0,0,0-.414-.569.578.578,0,0,0-.766.593c0,.39,0,.779,0,1.169a.543.543,0,0,1-.416.554.577.577,0,0,1-.764-.6q0-2.577,0-5.154c0-.057,0-.115,0-.172a.553.553,0,0,0-.538-.549.56.56,0,0,0-.633.485,1.315,1.315,0,0,0-.007.2q0,4.33,0,8.66c0,.049,0,.1,0,.148a.557.557,0,0,1-.59.548.555.555,0,0,1-.588-.549c-.006-.143,0-.287,0-.43a.371.371,0,0,0-.021-.131,5.637,5.637,0,0,0-1.471-2.109,1.606,1.606,0,0,0-.474-.3c-.322-.123-.485.017-.425.35a3.161,3.161,0,0,0,.165.6,25.77,25.77,0,0,0,1.715,3.4,15.2,15.2,0,0,0,1.893,2.614,3.554,3.554,0,0,1,.737,1.154c.084.229.138.469.208.712Z"
              transform="translate(1312.07 407.737)"
              fill="#184595"
              fillRule="evenodd"
            />
            <path
              d="M-1255.339-343.891h-5.93c-.07-.243-.124-.483-.208-.712a3.552,3.552,0,0,0-.737-1.154,15.21,15.21,0,0,1-1.893-2.614,25.769,25.769,0,0,1-1.715-3.4,3.16,3.16,0,0,1-.165-.6c-.06-.333.1-.473.425-.35a1.607,1.607,0,0,1,.474.3,5.636,5.636,0,0,1,1.471,2.109.366.366,0,0,1,.021.131c0,.143,0,.287,0,.43a.555.555,0,0,0,.588.549.557.557,0,0,0,.59-.548c0-.049,0-.1,0-.148q0-4.33,0-8.66a1.315,1.315,0,0,1,.007-.2.56.56,0,0,1,.633-.485.553.553,0,0,1,.538.549c0,.057,0,.115,0,.172q0,2.577,0,5.154a.577.577,0,0,0,.764.6.543.543,0,0,0,.416-.554c0-.39,0-.779,0-1.169a.578.578,0,0,1,.766-.593.546.546,0,0,1,.414.569c0,.582,0,1.165,0,1.747a.578.578,0,0,0,.768.591.545.545,0,0,0,.411-.558c0-.39,0-.779,0-1.169a.578.578,0,0,1,.771-.588.548.548,0,0,1,.409.572c0,.582,0,1.165,0,1.747a.576.576,0,0,0,.761.587.541.541,0,0,0,.418-.54c.005-.209,0-.418,0-.627a.535.535,0,0,1,.3-.514.625.625,0,0,1,.644.034.506.506,0,0,1,.236.45c-.012.934,0,1.87-.057,2.8a14.856,14.856,0,0,1-.465,2.422c-.206.906-.39,1.817-.567,2.729C-1255.3-344.525-1255.307-344.211-1255.339-343.891Z"
              transform="translate(1267.134 360.432)"
              fill="#fff"
              fillRule="evenodd"
            />
          </g>
        </g>
        <g transform="translate(-50 -121)">
          <line
            x2="13"
            transform="translate(56.5 130.5)"
            fill="none"
            stroke="#fff"
            strokeWidth="1"
          />
          <path d="M0,0V9L7,4.5Z" transform="translate(57 135) rotate(180)" fill="#fff" />
          <g>
            <path
              d="M31.817,0H45.679"
              transform="translate(56.5 130.5)"
              fill="none"
              stroke="#fff"
              strokeWidth="1"
            />
            <path d="M0,0V9L7,4.5Z" transform="translate(101.679 126)" fill="#fff" />
          </g>
        </g>
      </g>
    ),
    viewBox: '0 0 58.679 17.728',
  },
};

const ctheme = {
  ...theme,
  breakpoints: ['52em', '62em', '80em'],
  icons: {
    ...theme.icons,
    ...customIcons,
  },
};

export default ctheme;
