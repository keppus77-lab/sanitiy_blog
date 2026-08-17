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
        name: 'siteSubtitle',
        title: 'Subtitle',
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
        name: 'HeroHeadline',
        title: 'Hero Überschrift',
        type: 'string',
        group: 'content',
        }),

        defineField({
        name: 'HeroSubtitle',
        title: 'Hero Unterüberschrift',
        type: 'string',
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
        name: 'copyright',
        title: 'Copyright',
        type: 'string',
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
        name: 'socialLinks',
        title: 'Social Media',
        type: 'array',
        of: [
            {
            type: 'object',
            preview: {
                select: {
                title: 'platform',
                },
            },
            fields: [
                {
                name: 'platform',
                title: 'Plattform',
                type: 'string',
                options: {
                    list: [
                    { title: 'Instagram', value: 'instagram' },
                    { title: 'LinkedIn', value: 'linkedin' },
                    { title: 'Facebook', value: 'facebook' },
                    { title: 'YouTube', value: 'youtube' },
                    { title: 'TikTok', value: 'tiktok' },
                    { title: 'X', value: 'x' },
                    ],
                },
                },
                {
                name: 'url',
                title: 'URL',
                type: 'url',
                },
            ],
            },
        ],
        group: 'footer',
        }),

        defineField({
        name: 'bottomText',
        title: 'Footer Bottom Text',
        type: 'string',
        description: 'z.B. Made with 🌲 in Franken',
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