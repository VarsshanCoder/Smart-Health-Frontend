import React, { useRef, useEffect } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { 
  Copy, 
  Play, 
  Download, 
  Share2, 
  ThumbsUp, 
  ThumbsDown,
  ExternalLink,
  FileText
} from 'lucide-react'
import { useChat } from '../../contexts/ChatContext'
import { Message } from '../../types'
import { cn, formatTime } from '../../lib/utils'

interface ChatAreaProps {
  className?: string
}

export function ChatArea({ className }: ChatAreaProps) {
  const { currentChat } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentChat?.messages])

  if (!currentChat) {
    return (
      <div className={cn("flex-1 flex items-center justify-center", className)}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-varsh-surface flex items-center justify-center">
            <FileText className="h-8 w-8 text-varsh-muted" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Welcome to VarshGpt</h3>
          <p className="text-varsh-muted mb-6 max-w-md">
            Your AI coding & exam prep partner. Start a new chat to begin your learning journey.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-varsh-muted">Try asking:</p>
            <div className="space-y-1">
              <p className="text-sm text-varsh-primary">• "Explain binary search algorithm"</p>
              <p className="text-sm text-varsh-primary">• "Help me solve this aptitude question"</p>
              <p className="text-sm text-varsh-primary">• "Create a quiz from this document"</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b varsh-divider bg-varsh-surface">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-white">{currentChat.title}</h2>
          <Badge variant="varsh" className="text-xs">
            {currentChat.mode}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-varsh-muted hover:text-white">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-varsh-muted hover:text-white">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentChat.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

interface MessageBubbleProps {
  message: Message
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const isStreaming = message.isStreaming

  return (
    <div className={cn(
      "flex gap-3 max-w-4xl",
      isUser ? "ml-auto flex-row-reverse" : "mr-auto"
    )}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-varsh-primary flex items-center justify-center">
            <span className="text-xs font-medium text-white">U</span>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-varsh-secondary flex items-center justify-center">
            <span className="text-xs font-medium text-white">V</span>
          </div>
        )}
      </div>

      {/* Message Content */}
      <div className={cn(
        "flex-1 space-y-2",
        isUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "rounded-2xl px-4 py-3 max-w-2xl",
          isUser 
            ? "bg-varsh-primary text-white" 
            : "bg-varsh-surface text-white border border-varsh-divider"
        )}>
          {isStreaming && !isUser ? (
            <div className="flex items-center gap-2">
              <span>Thinking</span>
              <div className="thinking-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <MessageContent content={message.content} />
            </div>
          )}
        </div>

        {/* Message Actions */}
        {!isUser && !isStreaming && (
          <div className="flex items-center gap-2 text-xs text-varsh-muted">
            <span>{formatTime(message.timestamp)}</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <ThumbsDown className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        {/* Sources */}
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 space-y-1">
            <p className="text-xs text-varsh-muted">Sources:</p>
            {message.sources.map((source) => (
              <div key={source.id} className="flex items-center gap-2 text-xs">
                <ExternalLink className="h-3 w-3 text-varsh-muted" />
                <span className="text-varsh-primary hover:underline cursor-pointer">
                  {source.title}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Code Blocks */}
        {message.codeBlocks && message.codeBlocks.map((block) => (
          <CodeBlock key={block.id} block={block} />
        ))}
      </div>
    </div>
  )
}

interface MessageContentProps {
  content: string
}

function MessageContent({ content }: MessageContentProps) {
  // Simple markdown-like rendering for now
  const lines = content.split('\n')
  
  return (
    <div className="space-y-2">
      {lines.map((line, index) => {
        if (line.startsWith('```')) {
          return <div key={index} className="text-varsh-muted text-xs">Code block</div>
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return <strong key={index} className="font-semibold">{line.slice(2, -2)}</strong>
        }
        if (line.startsWith('*') && line.endsWith('*')) {
          return <em key={index} className="italic">{line.slice(1, -1)}</em>
        }
        return <p key={index}>{line}</p>
      })}
    </div>
  )
}

interface CodeBlockProps {
  block: any
}

function CodeBlock({ block }: CodeBlockProps) {
  return (
    <div className="mt-2 rounded-lg bg-gray-900 border border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-xs text-gray-300 font-mono">{block.language}</span>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-300">
            <Copy className="h-3 w-3" />
          </Button>
          {block.isRunnable && (
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-300">
              <Play className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
      <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
        <code>{block.code}</code>
      </pre>
      {block.output && (
        <div className="px-4 py-2 bg-gray-800 border-t border-gray-700">
          <div className="text-xs text-gray-400 mb-1">Output:</div>
          <pre className="text-sm text-gray-200">{block.output}</pre>
        </div>
      )}
    </div>
  )
}
