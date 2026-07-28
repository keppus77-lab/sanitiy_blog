import {defineField, defineType} from 'sanity'
import { MdDescription } from 'react-icons/md'

export default defineType({
    name: 'page',
    title: 'Seite',
    type: 'document',
    icon: MdDescription,
    fields: [
        defineField({
        name: 'title',
        title: 'Titel',
        type: 'string',
        validation: (Rule) => Rule.required(),
        }),
        defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
            source: 'title',
            maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
        description: 'URL-Pfad der Seite (z.B. impressum, datenschutz)',
        }),
        defineField({
        name: 'seo',
        title: 'SEO',
        type: 'object',
        fields: [
            {
            name: 'metaTitle',
            title: 'Meta Title',
            type: 'string',
            },
            {
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            rows: 3,
            },
        ],
        options: {
            collapsible: true,
            collapsed: true,
        },
        }),
        defineField({
        name: 'content',
        title: 'Inhalt',
        type: 'array',
        of: [
            {
            type: 'block',
            styles: [
                {title: 'Normal', value: 'normal'},
                {title: 'H1', value: 'h1'},
                {title: 'H2', value: 'h2'},
                {title: 'H3', value: 'h3'},
                {title: 'H4', value: 'h4'},
                {title: 'Zitat', value: 'blockquote'},
            ],
            marks: {
                decorators: [
                {title: 'Fett', value: 'strong'},
                {title: 'Kursiv', value: 'em'},
                {title: 'Unterstrichen', value: 'underline'},
                ],
                annotations: [
                {
                    name: 'link',
                    type: 'object',
                    title: 'Link',
                    fields: [
                    {
                        name: 'href',
                        type: 'url',
                        title: 'URL',
                    },
                    ],
                },
                ],
            },
            },
            {
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                name: 'alt',
                type: 'string',
                title: 'Alt-Text',
                },
                {
                name: 'caption',
                type: 'string',
                title: 'Bildunterschrift',
                },
            ],
            },
        ],
        validation: (Rule) => Rule.required(),
        }),
        defineField({
        name: 'publishedAt',
        title: 'Veröffentlicht am',
        type: 'datetime',
        initialValue: () => new Date().toISOString(),
        }),
        defineField({
        name: 'showInSitemap',
        title: 'In Sitemap anzeigen',
        type: 'boolean',
        initialValue: true,
        }),
    ],
    preview: {
        select: {
        title: 'title',
        slug: 'slug.current',
        },
        prepare({title, slug}) {
        return {
            title: title,
            subtitle: `/${slug}`,
        }
        },
    },
})