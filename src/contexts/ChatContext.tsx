import React, { createContext, useContext, useState, useCallback } from 'react'
import { Chat, Message, ChatMode, Workspace } from '../types'

interface ChatContextType {
  currentChat: Chat | null
  setCurrentChat: (chat: Chat | null) => void
  chats: Chat[]
  addChat: (chat: Chat) => void
  updateChat: (chatId: string, updates: Partial<Chat>) => void
  deleteChat: (chatId: string) => void
  addMessage: (chatId: string, message: Message) => void
  updateMessage: (chatId: string, messageId: string, updates: Partial<Message>) => void
  workspaces: Workspace[]
  currentWorkspace: Workspace | null
  setCurrentWorkspace: (workspace: Workspace | null) => void
  mode: ChatMode
  setMode: (mode: ChatMode) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    {
      id: 'default',
      name: 'Default Workspace',
      description: 'Your main workspace',
      chats: [],
      files: [],
      createdAt: new Date(),
    }
  ])
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(workspaces[0])
  const [mode, setMode] = useState<ChatMode>('aptitude')

  const addChat = useCallback((chat: Chat) => {
    setChats(prev => [chat, ...prev])
    if (currentWorkspace) {
      setCurrentWorkspace(prev => prev ? {
        ...prev,
        chats: [chat, ...prev.chats]
      } : null)
    }
  }, [currentWorkspace])

  const updateChat = useCallback((chatId: string, updates: Partial<Chat>) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, ...updates } : chat
    ))
    
    if (currentChat?.id === chatId) {
      setCurrentChat(prev => prev ? { ...prev, ...updates } : null)
    }
  }, [currentChat])

  const deleteChat = useCallback((chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId))
    if (currentChat?.id === chatId) {
      setCurrentChat(null)
    }
  }, [currentChat])

  const addMessage = useCallback((chatId: string, message: Message) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, messages: [...chat.messages, message], updatedAt: new Date() }
        : chat
    ))
    
    if (currentChat?.id === chatId) {
      setCurrentChat(prev => prev ? {
        ...prev,
        messages: [...prev.messages, message],
        updatedAt: new Date()
      } : null)
    }
  }, [currentChat])

  const updateMessage = useCallback((chatId: string, messageId: string, updates: Partial<Message>) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? {
            ...chat,
            messages: chat.messages.map(msg => 
              msg.id === messageId ? { ...msg, ...updates } : msg
            )
          }
        : chat
    ))
    
    if (currentChat?.id === chatId) {
      setCurrentChat(prev => prev ? {
        ...prev,
        messages: prev.messages.map(msg => 
          msg.id === messageId ? { ...msg, ...updates } : msg
        )
      } : null)
    }
  }, [currentChat])

  return (
    <ChatContext.Provider value={{
      currentChat,
      setCurrentChat,
      chats,
      addChat,
      updateChat,
      deleteChat,
      addMessage,
      updateMessage,
      workspaces,
      currentWorkspace,
      setCurrentWorkspace,
      mode,
      setMode,
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
