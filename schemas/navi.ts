import {defineField, defineType} from 'sanity'
import {MdLink} from 'react-icons/md'

export default defineType({
    name: 'navigationLink',
    title: 'Navigation Link',
    type: 'document',
    icon: MdLink,

    fields: [
        defineField( {
        name: 'orderRank',
        type: 'string',
        hidden: true,
        }),
        defineField({
            name: 'title',
            title: 'Bezeichnung',
            type: 'string',
            validation: (Rule) => Rule.required(),
            description: 'Angezeigter Text des Links',
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
        }),
        defineField({
            name: 'linkType',
            title: 'Link-Typ',
            type: 'string',
            options: {
                list: [
                {title: 'Kategorie-Übersicht', value: 'category'},
                {title: 'Tags-Übersicht', value: 'tags'},
                {title: 'Einzelner Post', value: 'post'},
                {title: 'Seite', value: 'page'},
                {title: 'Externe URL', value: 'external'},
                {title: 'Nur Text (kein Link)', value: 'text'},
                {title: 'Link aud die Home', value: 'home'},            
            ],
                layout: 'radio',
            },
            initialValue: 'page',
            validation: (Rule) => Rule.required(),
        }),

        // Separates Feld für Kategorie
        defineField({
            name: 'categoryLink',
            title: 'Kategorie',
            type: 'reference',
            to: [{type: 'category'}],
            hidden: ({parent}) => parent?.linkType !== 'category',
            validation: (Rule) =>
                Rule.custom((value, context) => {
                const linkType = (context.parent as any)?.linkType
                if (linkType === 'category' && !value) {
                    return 'Bitte wähle eine Kategorie aus'
                }
                return true
                }),
        }),
        defineField({
            name: 'tagLink',
            title: 'Tags',
            type: 'reference',
            to: [{type: 'tags'}],
            hidden: ({parent}) => parent?.linkType !== 'tags',
            validation: (Rule) =>
                Rule.custom((value, context) => {
                const linkType = (context.parent as any)?.linkType
                if (linkType === 'tags' && !value) {
                    return 'Bitte wähle eine Kategorie aus'
                }
                return true
                }),
        }),
        // Separates Feld für Post
        defineField({
            name: 'postLink',
            title: 'Post',
            type: 'reference',
            to: [{type: 'post'}],
            hidden: ({parent}) => parent?.linkType !== 'post',
            validation: (Rule) =>
                Rule.custom((value, context) => {
                const linkType = (context.parent as any)?.linkType
                if (linkType === 'post' && !value) {
                    return 'Bitte wähle einen Post aus'
                }
                return true
                }),
        }),

        // Separates Feld für Page
        defineField({
            name: 'pageLink',
            title: 'Seite',
            type: 'reference',
            to: [{type: 'page'}],
            hidden: ({parent}) => parent?.linkType !== 'page',
            validation: (Rule) =>
                Rule.custom((value, context) => {
                const linkType = (context.parent as any)?.linkType
                if (linkType === 'page' && !value) {
                    return 'Bitte wähle eine Seite aus'
                }
                return true
                }),                 
        }),

        defineField({
            name: 'externalUrl',
            title: 'Externe URL',
            type: 'url',
            hidden: ({parent}) => parent?.linkType !== 'external',
            validation: (Rule) =>
                Rule.custom((value, context) => {
                const linkType = (context.parent as any)?.linkType
                if (linkType === 'external' && !value) {
                    return 'Bitte gib eine externe URL ein'
                }
                return true
                }),
        }),
        // OPTION 2 CODE ENDET HIER
        
       
        defineField({
        name: 'openInNewTab',
        title: 'In neuem Tab öffnen',
        type: 'boolean',
        initialValue: false,
        hidden: ({parent}) => parent?.linkType === 'text',
        }),
    ],
    preview: {
        select: {
        title: 'title',
        linkType: 'linkType',
        showInHeader: 'showInHeader',
        showInFooter: 'showInFooter',
        },
        prepare({title, linkType, showInHeader, showInFooter}) {
        const locations = []
        if (showInHeader) locations.push('Header')
        if (showInFooter) locations.push('Footer')
        
        return {
            title: title,
            subtitle: `${linkType} • ${locations.length > 0 ? locations.join(', ') : 'Nicht angezeigt'}`,
        }
        },
    },
})