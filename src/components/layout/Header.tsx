import React from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Search, Bell, Settings, Menu } from 'lucide-react'
import { useChat } from '../../contexts/ChatContext'
import { useTheme } from '../../contexts/ThemeContext'
import { cn } from '../../lib/utils'

interface HeaderProps {
  onMenuClick?: () => void
  isMobile?: boolean
}

export function Header({ onMenuClick, isMobile = false }: HeaderProps) {
  const { currentChat, mode } = useChat()
  const { theme, setTheme } = useTheme()

  const modeLabels = {
    aptitude: 'Aptitude',
    coding: 'Coding',
    document: 'Document',
    quiz: 'Quiz',
    custom: 'Custom'
  }

  return (
    <header className="flex items-center justify-between h-16 px-4 border-b varsh-divider bg-varsh-surface">
      <div className="flex items-center gap-4">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="text-varsh-muted hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-white">VarshGpt</h1>
          {currentChat && (
            <Badge variant="varsh" className="text-xs">
              {modeLabels[mode]}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {currentChat && (
          <div className="hidden md:block text-sm text-varsh-muted">
            {currentChat.title}
          </div>
        )}
        
        <Button variant="ghost" size="icon" className="text-varsh-muted hover:text-white">
          <Search className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-varsh-muted hover:text-white">
          <Bell className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-varsh-muted hover:text-white">
          <Settings className="h-4 w-4" />
        </Button>
        
        <Avatar className="h-8 w-8">
          <AvatarImage src="/avatar.jpg" alt="User" />
          <AvatarFallback className="bg-varsh-primary text-white text-xs">
            U
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
