'use client'

import { ReactNode } from 'react'
import EditArticleDialogContextProvider from '../(Modules)/article/Context/EditArticleDialogContext'

export function EditArticleProviders({ children }: { children: ReactNode }) {
  return (
    <EditArticleDialogContextProvider>
      {children}
    </EditArticleDialogContextProvider>
  )
}