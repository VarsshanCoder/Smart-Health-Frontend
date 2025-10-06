import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { 
  FileText, 
  Code, 
  Calculator, 
  Database, 
  Play, 
  Download,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Lightbulb
} from 'lucide-react'
import { useChat } from '../../contexts/ChatContext'
import { cn } from '../../lib/utils'

interface ContextPanelProps {
  isOpen?: boolean
  onClose?: () => void
}

export function ContextPanel({ isOpen = true, onClose }: ContextPanelProps) {
  const { currentChat, mode } = useChat()
  const [activeTab, setActiveTab] = useState('sources')
  const [showSources, setShowSources] = useState(true)

  if (!isOpen) return null

  return (
    <div className="w-80 border-l varsh-divider bg-varsh-surface flex flex-col h-full">
      {/* Panel Header */}
      <div className="p-4 border-b varsh-divider">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-white">Context</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0 text-varsh-muted hover:text-white"
          >
            <EyeOff className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b varsh-divider">
        {[
          { id: 'sources', label: 'Sources', icon: FileText },
          { id: 'tools', label: 'Tools', icon: Code },
          { id: 'suggestions', label: 'Suggestions', icon: Lightbulb }
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium transition-colors",
                activeTab === tab.id
                  ? "text-varsh-primary border-b-2 border-varsh-primary"
                  : "text-varsh-muted hover:text-white"
              )}
            >
              <Icon className="h-3 w-3" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'sources' && <SourcesTab />}
        {activeTab === 'tools' && <ToolsTab mode={mode} />}
        {activeTab === 'suggestions' && <SuggestionsTab mode={mode} />}
      </div>
    </div>
  )
}

function SourcesTab() {
  const [expandedSource, setExpandedSource] = useState<string | null>(null)

  const sources = [
    {
      id: '1',
      title: 'Binary Search Algorithm',
      type: 'document',
      snippet: 'Binary search is a search algorithm that finds the position of a target value within a sorted array...',
      url: '#'
    },
    {
      id: '2',
      title: 'LeetCode Problem 704',
      type: 'web',
      snippet: 'Given an array of integers nums which is sorted in ascending order...',
      url: '#'
    }
  ]

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-white">Sources</h4>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-varsh-muted hover:text-white"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          View All
        </Button>
      </div>

      {sources.map((source) => (
        <div key={source.id} className="border border-varsh-divider rounded-lg p-3">
          <div className="flex items-start justify-between mb-2">
            <h5 className="text-sm font-medium text-white line-clamp-2">
              {source.title}
            </h5>
            <Badge variant="outline" className="text-xs">
              {source.type}
            </Badge>
          </div>
          
          <p className="text-xs text-varsh-muted mb-3 line-clamp-3">
            {source.snippet}
          </p>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-varsh-primary hover:text-varsh-primary/80"
            >
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-varsh-muted hover:text-white"
            >
              <Download className="h-3 w-3 mr-1" />
              Save
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

function ToolsTab({ mode }: { mode: string }) {
  const tools = {
    coding: [
      { id: 'runner', name: 'Code Runner', icon: Play, description: 'Execute code snippets' },
      { id: 'debugger', name: 'Debugger', icon: Code, description: 'Debug your code' },
      { id: 'formatter', name: 'Formatter', icon: FileText, description: 'Format code' }
    ],
    aptitude: [
      { id: 'calculator', name: 'Calculator', icon: Calculator, description: 'Quick calculations' },
      { id: 'timer', name: 'Timer', icon: Play, description: 'Practice timing' }
    ],
    document: [
      { id: 'summarizer', name: 'Summarizer', icon: FileText, description: 'Summarize documents' },
      { id: 'extractor', name: 'Q&A Extractor', icon: BookOpen, description: 'Extract questions' }
    ],
    quiz: [
      { id: 'generator', name: 'Quiz Generator', icon: BookOpen, description: 'Generate quizzes' },
      { id: 'timer', name: 'Timer', icon: Play, description: 'Quiz timing' }
    ]
  }

  const modeTools = tools[mode as keyof typeof tools] || tools.coding

  return (
    <div className="p-4 space-y-3">
      <h4 className="text-sm font-medium text-white">Available Tools</h4>
      
      {modeTools.map((tool) => {
        const Icon = tool.icon
        return (
          <div key={tool.id} className="border border-varsh-divider rounded-lg p-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-varsh-background flex items-center justify-center">
                <Icon className="h-4 w-4 text-varsh-primary" />
              </div>
              <div className="flex-1">
                <h5 className="text-sm font-medium text-white">{tool.name}</h5>
                <p className="text-xs text-varsh-muted">{tool.description}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs border-varsh-divider text-varsh-muted hover:text-white"
            >
              Use Tool
            </Button>
          </div>
        )
      })}
    </div>
  )
}

function SuggestionsTab({ mode }: { mode: string }) {
  const suggestions = {
    coding: [
      'Explain time complexity',
      'Show me examples',
      'Help me optimize this',
      'What are edge cases?'
    ],
    aptitude: [
      'Solve step by step',
      'Give me similar problems',
      'Explain the concept',
      'Show me shortcuts'
    ],
    document: [
      'Summarize key points',
      'Create flashcards',
      'Generate quiz questions',
      'Find related topics'
    ],
    quiz: [
      'Create practice test',
      'Review my answers',
      'Explain mistakes',
      'Give me more questions'
    ]
  }

  const modeSuggestions = suggestions[mode as keyof typeof suggestions] || suggestions.coding

  return (
    <div className="p-4 space-y-3">
      <h4 className="text-sm font-medium text-white">Suggested Prompts</h4>
      
      <div className="space-y-2">
        {modeSuggestions.map((suggestion, index) => (
          <button
            key={index}
            className="w-full text-left p-3 rounded-lg border border-varsh-divider hover:bg-varsh-background/50 transition-colors group"
          >
            <p className="text-sm text-white group-hover:text-varsh-primary transition-colors">
              {suggestion}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
