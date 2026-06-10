import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WVM7DW52');`,
          }}
        />
        {/* End Google Tag Manager */}

        <meta charSet="utf-8" />
        <meta name="description" content="Quiz de qualificação - IA Sem Mistério para Toda Idade. Descubra qual é seu nível e entre na comunidade certa!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#001a33" />
        <meta name="og:title" content="IA Sem Mistério - Quiz de Qualificação" />
        <meta name="og:description" content="Descubra seu nível de conhecimento sobre IA e entre na comunidade certa para você!" />
        <meta name="og:type" content="website" />
        <title>IA Sem Mistério - Quiz</title>
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WVM7DW52"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
