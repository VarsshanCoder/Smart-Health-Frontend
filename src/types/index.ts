export interface User {
  id: string
  name: string
  avatar?: string
  email?: string
}

export interface Chat {
  id: string
  title: string
  mode: ChatMode
  createdAt: Date
  updatedAt: Date
  messages: Message[]
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  sources?: Source[]
  codeBlocks?: CodeBlock[]
  isStreaming?: boolean
}

export interface Source {
  id: string
  title: string
  url?: string
  type: 'document' | 'web' | 'code'
  snippet?: string
}

export interface CodeBlock {
  id: string
  language: string
  code: string
  isRunnable?: boolean
  output?: string
  error?: string
}

export type ChatMode = 'aptitude' | 'coding' | 'document' | 'quiz' | 'custom'

export interface ModeConfig {
  id: ChatMode
  name: string
  description: string
  icon: string
  systemPrompt: string
  features: string[]
}

export interface FileUpload {
  id: string
  name: string
  size: number
  type: string
  status: 'uploading' | 'processing' | 'ready' | 'error'
  progress: number
  error?: string
}

export interface Workspace {
  id: string
  name: string
  description?: string
  chats: Chat[]
  files: FileUpload[]
  createdAt: Date
}
