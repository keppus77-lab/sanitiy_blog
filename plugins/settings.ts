/**
 * This plugin contains all the logic for setting up the `Settings` singleton
 */

import { definePlugin, type DocumentDefinition } from 'sanity'
import type { StructureResolver } from 'sanity/structure'

export const settingsPlugin = definePlugin<{ type: string }>(
  ({ type }) => {
    return {
      name: 'settings',
      document: {
        newDocumentOptions: (prev, { creationContext }) => {
          if (creationContext.type === 'global') {
            return prev.filter(
              (templateItem) => templateItem.templateId !== type,
            )
          }

          return prev
        },

        actions: (prev, { schemaType }) => {
          if (schemaType === type) {
            return prev.filter(
              ({ action }) => action !== 'duplicate',
            )
          }

          return prev
        },
      },
    }
  },
)

export const settingsStructure = (
  typeDef: DocumentDefinition,
): StructureResolver => {
  return (S) => {
    const settingsListItem = S.listItem()
      .title(typeDef.title)
      .icon(typeDef.icon)
      .child(
        S.editor()
          .id(typeDef.name)
          .schemaType(typeDef.name)
          .documentId(typeDef.name),
      )

    return S.list()
      .title('Inhalt')
      .items([
        // Settings Singleton
        settingsListItem,

        S.divider(),

        // Posts
        S.listItem()
          .title('Posts')
          .child(
            S.list()
              .title('Posts')
              .items([
                S.listItem()
                  .title('Nach Kategorie')
                  .child(
                    S.documentTypeList('category').child(
                      (categoryId) =>
                        S.documentList()
                          .title('Posts in dieser Kategorie')
                          .filter(
                            '_type == "post" && category._ref == $categoryId',
                          )
                          .params({ categoryId }),
                    ),
                  ),

                S.listItem()
                  .title('Alle Posts')
                  .child(S.documentTypeList('post')),
              ]),
          ),

        S.divider(),

        // Alle übrigen Typen außer diesen
        ...S.documentTypeListItems().filter((listItem) => {
          const id = listItem.getId()

          return ![
            'post',
            'settings',
            'navigationLink',
          ].includes(id || '')
        }),
      ])
  }
}