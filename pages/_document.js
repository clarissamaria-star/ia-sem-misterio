import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
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
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
