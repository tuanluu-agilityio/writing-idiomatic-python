import React, { Component } from 'react';
import { graphql } from 'gatsby'

import Layout from '../components/layout';


export default ({ data }) => (
  <Layout>
    <h1>About {data.site.siteMetadata.title}</h1>
    <blockquote>
      Always code as if the guy who ends up maintaining your code
      will be a violent psychopath who knows where you live.
      --John Woods comp.lang.c++
    </blockquote>

    <hr />
    <div style={{
      textAlign: "center"
    }}>
      <img src="https://images-na.ssl-images-amazon.com/images/I/41yDBro6d9L._SX384_BO1,204,203,200_.jpg" alt="Writing Idiomatic Python books" />
    </div>
  </Layout>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
