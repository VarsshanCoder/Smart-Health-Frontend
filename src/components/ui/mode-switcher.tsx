import React from 'react'
import { Button } from './button'
import { Badge } from './badge'
import { Brain, Code, FileText, BookOpen, MessageSquare } from 'lucide-react'
import { ChatMode } from '../../types'
import { cn } from '../../lib/utils'

interface ModeSwitcherProps {
  currentMode: ChatMode
  onModeChange: (mode: ChatMode) => void
  className?: string
}

const modeConfigs = {
  aptitude: {
    icon: Brain,
    label: 'Aptitude',
    description: 'Logical reasoning & quantitative problems',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20'
  },
  coding: {
    icon: Code,
    label: 'Coding',
    description: 'Algorithms & programming help',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    borderColor: 'border-green-400/20'
  },
  document: {
    icon: FileText,
    label: 'Document',
    description: 'Analyze & summarize documents',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/20'
  },
  quiz: {
    icon: BookOpen,
    label: 'Quiz',
    description: 'Practice tests & assessments',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/20'
  },
  custom: {
    icon: MessageSquare,
    label: 'Custom',
    description: 'General conversation',
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
    borderColor: 'border-gray-400/20'
  }
}

export function ModeSwitcher({ currentMode, onModeChange, className }: ModeSwitcherProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h3 className="text-sm font-medium text-white mb-3">Chat Mode</h3>
      <div className="grid grid-cols-1 gap-2">
        {Object.entries(modeConfigs).map(([modeKey, config]) => {
          const Icon = config.icon
          const isActive = currentMode === modeKey
          
          return (
            <button
              key={modeKey}
              onClick={() => onModeChange(modeKey as ChatMode)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border transition-all text-left",
                isActive
                  ? `${config.bgColor} ${config.borderColor} border-2`
                  : "border-varsh-divider hover:bg-varsh-background/50"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                isActive ? config.bgColor : "bg-varsh-background"
              )}>
                <Icon className={cn("h-4 w-4", isActive ? config.color : "text-varsh-muted")} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={cn(
                    "text-sm font-medium",
                    isActive ? "text-white" : "text-varsh-muted"
                  )}>
                    {config.label}
                  </p>
                  {isActive && (
                    <Badge variant="varsh" className="text-xs">
                      Active
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-varsh-muted mt-1">
                  {config.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
