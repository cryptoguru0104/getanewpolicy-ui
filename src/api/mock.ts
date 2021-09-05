export function mockGeolocation(): Promise<any> {
  return Promise.resolve({
    data: {
      city: {
        geoname_id: 3451328,
        names: {
          es: 'Ribeirão Preto',
          fr: 'Ribeirão Preto',
          ja: 'リベイラン・プレト',
          'pt-BR': 'Ribeirão Preto',
          ru: 'Рибейран-Прету',
          de: 'Ribeirão Preto',
          en: 'Ribeirão Preto',
        },
      },
      continent: {
        code: 'SA',
        geoname_id: 6255150,
        names: {
          ja: '南アメリカ',
          'pt-BR': 'América do Sul',
          ru: 'Южная Америка',
          'zh-CN': '南美洲',
          de: 'Südamerika',
          en: 'South America',
          es: 'Sudamérica',
          fr: 'Amérique du Sud',
        },
      },
      country: {
        iso_code: 'BR',
        geoname_id: 3469034,
        names: {
          'zh-CN': '巴西',
          de: 'Brasilien',
          en: 'Brazil',
          es: 'Brasil',
          fr: 'Brésil',
          ja: 'ブラジル連邦共和国',
          'pt-BR': 'Brasil',
          ru: 'Бразилия',
        },
      },
      location: {
        accuracy_radius: 100,
        latitude: -21.2244,
        longitude: -47.8239,
        time_zone: 'America/Sao_Paulo',
      },
      postal: { code: '14000' },
      registered_country: {
        iso_code: 'BR',
        geoname_id: 3469034,
        names: {
          es: 'Brasil',
          fr: 'Brésil',
          ja: 'ブラジル連邦共和国',
          'pt-BR': 'Brasil',
          ru: 'Бразилия',
          'zh-CN': '巴西',
          de: 'Brasilien',
          en: 'Brazil',
        },
      },
      subdivisions: [
        {
          iso_code: 'SP',
          geoname_id: 3448433,
          names: { en: 'Sao Paulo', es: 'São Paulo', 'pt-BR': 'São Paulo' },
        },
      ],
      traits: {
        autonomous_system_number: 27699,
        autonomous_system_organization: 'TELEFONICA BRASIL S.A',
        isp: 'Vivo',
        organization: 'Vivo',
        ip_address: '2804:431:c7c3:505d:f4a6:92e6:9d67:56a1',
        network: '2804:431:c7c3::/49',
      },
    },
  })
}
