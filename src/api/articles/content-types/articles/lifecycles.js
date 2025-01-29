module.exports = {
  async afterCreate(event) {
    const { result } = event;
    const locales = ["zh", "fr", "es", "de", "ja"];

    for (const locale of locales) {
      await strapi.entityService.create("api::articles.articles", {
        data: {
          title: result.title,
          description: result.description,
          thumbnail: result.thumbnail,
          is_highlighted: result.is_highlighted,
          locale: locale,
          localizations: [result.id],
        },
      });
    }
  },
};
