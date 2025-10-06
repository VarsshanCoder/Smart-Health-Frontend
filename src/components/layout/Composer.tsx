import React, { useState, useRef, KeyboardEvent } from 'react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { 
  Send, 
  Paperclip, 
  Mic, 
  Code, 
  Smile,
  Plus,
  X
} from 'lucide-react'
import { useChat } from '../../contexts/ChatContext'
import { Message } from '../../types'

interface ComposerProps {
  className?: string
}

export function Composer({ className }: ComposerProps) {
  const { currentChat, addMessage, mode } = useChat()
  const [input, setInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [attachments, setAttachments] = useState<File[]>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = async () => {
    if (!input.trim() || !currentChat) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    addMessage(currentChat.id, userMessage)
    setInput('')

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're asking about: "${input.trim()}". This is a simulated response. In a real implementation, this would connect to your AI service.`,
        timestamp: new Date(),
        isStreaming: true
      }
      
      addMessage(currentChat.id, aiMessage)
      
      // Stop streaming after 2 seconds
      setTimeout(() => {
        // Update message to remove streaming state
        // This would be handled by the chat context
      }, 2000)
    }, 1000)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAttachments(prev => [...prev, ...files])
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const getPlaceholder = () => {
    switch (mode) {
      case 'aptitude':
        return 'Ask about aptitude questions, logical reasoning, or quantitative problems...'
      case 'coding':
        return 'Ask about algorithms, data structures, or coding problems...'
      case 'document':
        return 'Ask questions about your uploaded documents...'
      case 'quiz':
        return 'Create or take a quiz, ask for practice questions...'
      default:
        return 'Type your message here...'
    }
  }

  return (
    <div className={cn("border-t varsh-divider bg-varsh-surface p-4", className)}>
      {/* Attachments */}
      {attachments.length > 0 && (
        <div className="mb-3 space-y-2">
          {attachments.map((file, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-varsh-background rounded-lg">
              <Paperclip className="h-4 w-4 text-varsh-muted" />
              <span className="text-sm text-white flex-1 truncate">{file.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeAttachment(index)}
                className="h-6 w-6 p-0 text-varsh-muted hover:text-white"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-end gap-3">
        {/* Quick Actions */}
        <div className="flex flex-col gap-2">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            multiple
            onChange={handleFileUpload}
            accept=".pdf,.docx,.txt,.zip,.js,.py,.java,.cpp,.c"
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-varsh-muted hover:text-white"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8",
              isRecording 
                ? "text-red-400 hover:text-red-300" 
                : "text-varsh-muted hover:text-white"
            )}
            onClick={() => setIsRecording(!isRecording)}
          >
            <Mic className="h-4 w-4" />
          </Button>
        </div>

        {/* Text Input */}
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={getPlaceholder()}
            className="min-h-[44px] max-h-32 resize-none pr-12 bg-varsh-background border-varsh-divider text-white placeholder:text-varsh-muted focus:border-varsh-primary"
            rows={1}
          />
          
          {/* Mode-specific quick actions */}
          {mode === 'coding' && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 h-6 w-6 p-0 text-varsh-muted hover:text-white"
            >
              <Code className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={!input.trim()}
          className="bg-varsh-cta hover:bg-varsh-cta/90 text-white h-11 w-11 p-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      {/* Quick Prompts */}
      <div className="mt-3 flex flex-wrap gap-2">
        {getQuickPrompts(mode).map((prompt, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs border-varsh-divider text-varsh-muted hover:text-white hover:border-varsh-primary"
            onClick={() => setInput(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  )
}

function getQuickPrompts(mode: string): string[] {
  switch (mode) {
    case 'aptitude':
      return [
        'Explain this math problem',
        'Help with logical reasoning',
        'Practice quantitative questions'
      ]
    case 'coding':
      return [
        'Explain this algorithm',
        'Optimize this code',
        'Debug this error'
      ]
    case 'document':
      return [
        'Summarize this document',
        'Extract key points',
        'Create quiz questions'
      ]
    case 'quiz':
      return [
        'Create a practice quiz',
        'Test my knowledge',
        'Review my answers'
      ]
    default:
      return [
        'Help me understand',
        'Explain in detail',
        'Give me examples'
      ]
  }
}
