import { useEffect, useCallback } from 'react'
import { useChat } from '../contexts/ChatContext'

export function useKeyboardShortcuts() {
  const { addChat, setCurrentChat, mode } = useChat()

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't trigger shortcuts when typing in input fields
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      (e.target as HTMLElement)?.contentEditable === 'true'
    ) {
      return
    }

    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
    const ctrlKey = isMac ? e.metaKey : e.ctrlKey

    // Quick search (Ctrl/Cmd + K)
    if (ctrlKey && e.key === 'k') {
      e.preventDefault()
      // TODO: Open search modal
      console.log('Quick search triggered')
    }

    // New chat (Ctrl/Cmd + N)
    if (ctrlKey && e.key === 'n') {
      e.preventDefault()
      const newChat = {
        id: Date.now().toString(),
        title: `New ${mode} Chat`,
        mode,
        createdAt: new Date(),
        updatedAt: new Date(),
        messages: []
      }
      addChat(newChat)
      setCurrentChat(newChat)
    }

    // Toggle shortcuts (Ctrl/Cmd + /)
    if (ctrlKey && e.key === '/') {
      e.preventDefault()
      // TODO: Toggle shortcuts modal
      console.log('Toggle shortcuts triggered')
    }

    // Toggle sidebar (Ctrl/Cmd + B)
    if (ctrlKey && e.key === 'b') {
      e.preventDefault()
      // TODO: Toggle sidebar
      console.log('Toggle sidebar triggered')
    }

    // Toggle context panel (Ctrl/Cmd + J)
    if (ctrlKey && e.key === 'j') {
      e.preventDefault()
      // TODO: Toggle context panel
      console.log('Toggle context panel triggered')
    }
  }, [addChat, setCurrentChat, mode])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
