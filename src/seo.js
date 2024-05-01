const infos = {
    title: process.env.VUE_APP_SEO_TITLE,
    description: process.env.VUE_APP_SEO_DESCRIPTION,
    image: process.env.VUE_APP_SEO_IMAGE,
    url: process.env.VUE_APP_SEO_URL,
    keywords: process.env.VUE_APP_SEO_KEYWORDS
}

const metaInfo = {
    title: infos.title,
    meta: [
      { name: 'description', content: infos.description },
      { property: 'og:title', content: infos.title },
      { property: 'og:description', content: infos.description },
      { property: 'og:image', content: infos.image },
      { property: 'og:url', content: infos.url },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: infos.title },
      { name: 'twitter:description', content: infos.description },
      { name: 'twitter:image', content: infos.image },
    ],
    link: [
        { rel: 'canonical', href: infos.url },
        { rel: 'robots', href: 'index, follow' }
    ]
};

export default metaInfo;