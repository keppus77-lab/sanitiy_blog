    import { defineType, defineField } from 'sanity'

    export default defineType({
    name: 'user',
    title: 'Benutzer',
    type: 'document',
    fields: [
        defineField({
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule) => Rule.required()
        }),
        defineField({
        name: 'email',
        title: 'E-Mail',
        type: 'string',
        validation: (Rule) => Rule.required().email()
        }),
        defineField({
        name: 'image',
        title: 'Profilbild',
        type: 'url'
        }),
        defineField({
        name: 'emailVerified',
        title: 'E-Mail verifiziert',
        type: 'datetime'
        }),
        defineField({
        name: 'role',
        title: 'Rolle',
        type: 'string',
        options: {
            list: [
            { title: 'Leser', value: 'reader' },
            { title: 'Kommentator', value: 'commenter' },
            { title: 'Moderator', value: 'moderator' },
            { title: 'Admin', value: 'admin' }
            ]
        },
        initialValue: 'reader'
        }),
        defineField({
        name: 'blocked',
        title: 'Gesperrt',
        type: 'boolean',
        initialValue: false
        })
    ]
    })