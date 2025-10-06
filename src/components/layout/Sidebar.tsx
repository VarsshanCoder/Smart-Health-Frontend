import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { 
  Plus, 
  MessageSquare, 
  FileText, 
  Code, 
  Brain, 
  BookOpen,
  Upload,
  Clock,
  MoreHorizontal,
  ChevronDown
} from 'lucide-react'
import { useChat } from '../../contexts/ChatContext'
import { ChatMode } from '../../types'
import { cn, formatTime, formatDate, truncateText } from '../../lib/utils'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const modeConfigs = {
  aptitude: { icon: Brain, label: 'Aptitude', color: 'text-blue-400' },
  coding: { icon: Code, label: 'Coding', color: 'text-green-400' },
  document: { icon: FileText, label: 'Document', color: 'text-purple-400' },
  quiz: { icon: BookOpen, label: 'Quiz', color: 'text-orange-400' },
  custom: { icon: MessageSquare, label: 'Custom', color: 'text-gray-400' },
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const { 
    chats, 
    currentChat, 
    setCurrentChat, 
    addChat, 
    mode, 
    setMode,
    currentWorkspace 
  } = useChat()
  
  const [showModeDropdown, setShowModeDropdown] = useState(false)

  const handleNewChat = (selectedMode: ChatMode) => {
    const newChat = {
      id: Date.now().toString(),
      title: `New ${modeConfigs[selectedMode].label} Chat`,
      mode: selectedMode,
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: []
    }
    addChat(newChat)
    setCurrentChat(newChat)
    setMode(selectedMode)
    setShowModeDropdown(false)
  }

  const recentChats = chats.slice(0, 10)

  return (
    <div className={cn(
      "flex flex-col h-full w-80 bg-varsh-surface border-r varsh-divider transition-transform duration-300",
      isOpen ? "translate-x-0" : "-translate-x-full",
      "md:translate-x-0"
    )}>
      {/* Profile Section */}
      <div className="p-4 border-b varsh-divider">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatar.jpg" alt="User" />
            <AvatarFallback className="bg-varsh-primary text-white">
              U
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-varsh-muted">Student</p>
          </div>
        </div>
      </div>

      {/* New Chat Section */}
      <div className="p-4">
        <div className="relative">
          <Button
            onClick={() => setShowModeDropdown(!showModeDropdown)}
            className="w-full justify-between bg-varsh-cta hover:bg-varsh-cta/90 text-white"
          >
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Chat
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
          
          {showModeDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-varsh-background border varsh-divider rounded-md shadow-lg z-10">
              {Object.entries(modeConfigs).map(([modeKey, config]) => {
                const Icon = config.icon
                return (
                  <button
                    key={modeKey}
                    onClick={() => handleNewChat(modeKey as ChatMode)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-varsh-surface transition-colors"
                  >
                    <Icon className={cn("h-4 w-4", config.color)} />
                    <span className="text-sm text-white">{config.label}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="text-xs border-varsh-divider text-varsh-muted hover:text-white">
            <Upload className="h-3 w-3 mr-1" />
            Upload
          </Button>
          <Button variant="outline" size="sm" className="text-xs border-varsh-divider text-varsh-muted hover:text-white">
            <BookOpen className="h-3 w-3 mr-1" />
            Quiz
          </Button>
        </div>
      </div>

      {/* Workspace Info */}
      {currentWorkspace && (
        <div className="px-4 pb-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">{currentWorkspace.name}</h3>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-varsh-muted">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-xs text-varsh-muted">{currentWorkspace.chats.length} chats</p>
        </div>
      )}

      {/* Recent Chats */}
      <div className="flex-1 overflow-y-auto px-4">
        <h3 className="text-sm font-medium text-white mb-3">Recent Chats</h3>
        <div className="space-y-1">
          {recentChats.length === 0 ? (
            <p className="text-xs text-varsh-muted text-center py-8">
              No recent chats. Start a new conversation!
            </p>
          ) : (
            recentChats.map((chat) => {
              const modeConfig = modeConfigs[chat.mode]
              const Icon = modeConfig.icon
              const isActive = currentChat?.id === chat.id
              
              return (
                <button
                  key={chat.id}
                  onClick={() => setCurrentChat(chat)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors group",
                    isActive 
                      ? "bg-varsh-primary/20 border border-varsh-primary/30" 
                      : "hover:bg-varsh-background/50"
                  )}
                >
                  <Icon className={cn("h-4 w-4 flex-shrink-0", modeConfig.color)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{chat.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                        {modeConfig.label}
                      </Badge>
                      <span className="text-xs text-varsh-muted">
                        {formatDate(chat.updatedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Clock className="h-3 w-3 text-varsh-muted" />
                  </div>
                </button>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
