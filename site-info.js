const url = 'https://cdn.jsdelivr.net/gh/moonspam/webpack-base-template@1.0/public/dist/';

module.exports = {
  author: 'moonspam',
  title: 'Webpack Base Template',
  description: 'This is Webpack Base Template',
  keywords: 'Webpack,Template,HTML,Sass',
  og: {
    locale: 'ko_KR',
    url: 'https://github.com/moonspam/webpack-base-template',
    type: 'website',
    img: {
      url: `${url}`,
      type: 'image/jpeg',
      width: '1280',
      height: '720',
      alt: 'alternate text',
    },
  },
};
