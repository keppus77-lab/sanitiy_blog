import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'settings',
    title: 'Einstellungen',
    type: 'document',

    groups: [
        {
        name: 'navigation',
        title: 'Navigation',
        default: true,
        },
        {
        name: 'content',
        title: 'Inhalt',
        },
        {
        name: 'footer',
        title: 'Footer',
        },
    ],

    fields: [
        // ============================
        // Navigation
        // ============================
        defineField({
        name: 'headerLinks',
        title: 'Header Navigation',
        type: 'array',
        group: 'navigation',
        of: [{ type: 'reference', to: [{ type: 'navigationLink' }] }],
        }),

        defineField({
        name: 'showSearch',
        title: 'Suche anzeigen',
        type: 'boolean',
        group: 'navigation',
        initialValue: true,
        }),

      

        // ============================
        // Inhalt
        // ============================
        defineField({
        name: 'siteTitle',
        title: 'Seitentitel',
        type: 'string',
        group: 'content',
        }),
          defineField({
        name: 'logo',
        title: 'Logo',
        type: 'image',
        group: 'content',
        }),

        defineField({
        name: 'siteDescription',
        title: 'Beschreibung',
        type: 'text',
        rows: 3,
        group: 'content',
        }),

        defineField({
        name: 'homepageHeadline',
        title: 'Homepage Überschrift',
        type: 'string',
        group: 'content',
        }),

        defineField({
        name: 'homepageText',
        title: 'Homepage Text',
        type: 'text',
        rows: 5,
        group: 'content',
        }),

        // ============================
        // Footer
        // ============================
        defineField({
        name: 'footerHeadline',
        title: 'Footer Überschrift',
        type: 'string',
        group: 'footer',
        }),

        defineField({
        name: 'footerText',
        title: 'Footer Text',
        type: 'text',
        rows: 4,
        group: 'footer',
        }),

        defineField({
        name: 'footerLinks',
        title: 'Footer Links',
        type: 'array',
        group: 'footer',
        of: [{ type: 'reference', to: [{ type: 'navigationLink' }] }],
        }),

        defineField({
        name: 'copyright',
        title: 'Copyright',
        type: 'string',
        group: 'footer',
        }),
    ],

    preview: {
        prepare() {
        return {
            title: 'Website Einstellungen',
        }
        },
    },
})