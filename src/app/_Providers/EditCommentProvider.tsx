'use client'

import { ReactNode } from 'react'
import EditCommentDialogContextProvider from '../(Modules)/_Comments/Context/EditCommentDialogContext'

export function EditCommentProviders({ children }: { children: ReactNode }) {
  return (
    <EditCommentDialogContextProvider>
      {children}
    </EditCommentDialogContextProvider>
  )
}