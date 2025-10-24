import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Dgraph Documentation',
  tagline: 'Get started with Dgraph - The native GraphQL database with a graph backend',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://dgraph.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dgraph-io', // Usually your GitHub org/user name.
  projectName: 'dgraph-docs', // Usually your repo name.

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/dgraph-io/dgraph-docs/tree/main/',
        },
        blog: false, // Disable blog for documentation site
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Dgraph',
      logo: {
        alt: 'Dgraph Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/dgraph-io/dgraph',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://discuss.dgraph.io/',
          label: 'Community',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Overview',
              to: '/docs/dgraph-overview',
            },
            {
              label: 'GraphQL API',
              to: '/docs/graphql/_index',
            },
            {
              label: 'DQL',
              to: '/docs/dql/_index',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/dgraph-io/dgraph',
            },
            {
              label: 'Discord',
              href: 'https://discuss.dgraph.io/',
            },
            {
              label: 'Cloud',
              href: 'https://cloud.dgraph.io',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Dgraph.io',
              href: 'https://dgraph.io',
            },
            {
              label: 'Tour',
              href: 'https://dgraph.io/tour',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Dgraph Labs, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
