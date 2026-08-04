import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'footerSettings',
    title: 'Footer',
    type: 'document',
    fields: [
        defineField({
        name: 'siteTitle',
        title: 'Seitentitel',
        type: 'string',
        validation: Rule => Rule.required(),
        }),

        defineField({
        name: 'logo',
        title: 'Logo',
        type: 'image',
        options: {
            hotspot: true,
        },
        }),

        defineField({
        name: 'description',
        title: 'Beschreibung',
        type: 'text',
        rows: 3,
        }),

        defineField({
        name: 'copyright',
        title: 'Copyright',
        type: 'string',
        }),

        defineField({
        name: 'quickLinks',
        title: 'Schnellzugriff',
        type: 'array',
        of: [
            {
            type: 'object',
            fields: [
                {
                name: 'label',
                title: 'Text',
                type: 'string',
                validation: Rule => Rule.required(),
                },
                {
                name: 'href',
                title: 'Link',
                type: 'string',
                validation: Rule => Rule.required(),
                },
            ],
            },
        ],
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
        }),

        defineField({
        name: 'bottomText',
        title: 'Footer Bottom Text',
        type: 'string',
        description: 'z.B. Made with 🌲 in Franken',
        }),
    ],
})