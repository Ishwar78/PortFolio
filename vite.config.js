import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'dynamic-seo-meta-injector',
      transformIndexHtml(html, ctx) {
        const url = ctx.originalUrl || ctx.path || '';
        if (url.startsWith('/blog/')) {
          const slug = url.replace('/blog/', '').split('?')[0].split('#')[0];
          const cleanSlug = decodeURIComponent(slug).replace(/-/g, ' ');
          const formattedTitle = cleanSlug
            ? cleanSlug.charAt(0).toUpperCase() + cleanSlug.slice(1)
            : 'Tech Article';

          const metaTags = `
    <!-- Dynamic Dev Blog SEO Meta Tags (Visible in Ctrl+U Source Code) -->
    <title>${formattedTitle} | Ishwar Sharma</title>
    <meta name="title" content="${formattedTitle} | Ishwar Sharma" />
    <meta name="description" content="Technical article on ${formattedTitle} by Ishwar Sharma, Full Stack Developer." />
    <meta name="keywords" content="${cleanSlug}, Full Stack Development, React, Node.js, Spring Boot" />
    <meta property="og:title" content="${formattedTitle} | Ishwar Sharma" />
    <meta property="og:description" content="Technical article on ${formattedTitle} by Ishwar Sharma." />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${formattedTitle} | Ishwar Sharma" />
          `;
          return html
            .replace(/<title>.*?<\/title>/i, '')
            .replace('</head>', `${metaTags}\n  </head>`);
        }
        return html;
      },
    },
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:6095',
        changeOrigin: true,
      },
    },
  },
});
