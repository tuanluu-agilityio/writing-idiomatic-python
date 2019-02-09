import React, { Component } from 'react';

import { css } from '@emotion/core'
import { StaticQuery, graphql, Link } from 'gatsby';

import { rhythm } from '../utils/typography'

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render= { data => (
      <div
        css={css`
          margin: 0 auto;
          max-width: 1240px;
          padding: ${rhythm(2)};
          padding-top: ${rhythm(1.5)};
        `}
      >
        <Link to={`/`}>
          <h3
            css={css`
              margin-bottom: ${rhythm(2)};
              display: inline-block;
              font-style: normal;
            `}
          >
            {data.site.siteMetadata.title}
          </h3>
        </Link>
        <Link
          to={`/about/`}
          css={css`
            float: right;
          `}
        >
          About
        </Link>
        {children}
      </div>
    )
    }
  />
)
