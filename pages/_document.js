import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta title='Creative 文具 | Find the best drink deals and happy hours in your area.' />
          {/* <link rel='icon' sizes='96x96' href='/favicons/favicon.ico' />
          <meta name='theme-color' content='#fff'></meta> */}
          <link
            rel='apple-touch-icon'
            sizes='76x76'
            href='/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link rel='manifest' href='/site.webmanifest' />
          <meta name='msapplication-TileColor' content='#da532c' />
          <meta name='theme-color' content='#ffffff' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
