# Strapi Multilingual Articles

## Setup

### 1. Install Strapi Locally

Ensure you have **Node.js (v18+)** 


### 2. Configure Strapi for Localization

Navigate to **Settings → Internationalization** in Strapi admin and add the following locales:
- Chinese (`zh`)
- French (`fr`)
- Spanish (`es`)
- German (`de`)
- Japanese (`ja`)

### 3. Add the Articles Collection

1. Go to **Content-Type Builder** → **Create new collection type** → Name it `Articles`.
2. Add the following fields:
   - `title` (Text) → **Enable localization**
   - `description` (Rich Text) → **Enable localization**
   - `thumbnail` (Media) → **Shared across locales**
   - `is_highlighted` (Boolean) → **Shared across locales**

### 4. Add Lifecycle Hook for Automatic Localization

Create a new file:  
`src/api/articles/content-types/articles/lifecycles.js`  

```javascript
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
```

### 5. Run the Project


