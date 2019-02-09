module.exports = {
  siteMetadata: {
    title: `Writing Idiomatic Python`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '÷',
            },
          },
          {
            resolve: `gatsby-remark-highlights`,
            options: {
                // Additional languages, no need to add it 
                // if you don't wish to use additional languages
                additionalLangs: [`language-rust`],
                // scope prefix to use, defaults to ''
                scopePrefix: 'syntax--',
                codeWrap: {
                  className: 'midnight'
                }
              }
          },
        ],
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
