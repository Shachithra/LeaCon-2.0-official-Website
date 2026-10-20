import { useEffect } from 'react'

/** Sets the document title and meta description for the current route. */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    const tag = document.querySelector('meta[name="description"]')
    if (tag) tag.setAttribute('content', description)
  }, [title, description])
}
