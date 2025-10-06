import React, { useState, useEffect } from 'react'
import { Button } from './button'
import { X, Keyboard } from 'lucide-react'
import { cn } from '../../lib/utils'

interface KeyboardShortcutsProps {
  isOpen: boolean
  onClose: () => void
}

const shortcuts = [
  {
    category: 'Navigation',
    items: [
      { key: 'Ctrl/Cmd + K', description: 'Quick search' },
      { key: 'Ctrl/Cmd + N', description: 'New chat' },
      { key: 'Ctrl/Cmd + /', description: 'Toggle shortcuts' },
    ]
  },
  {
    category: 'Chat',
    items: [
      { key: 'Enter', description: 'Send message' },
      { key: 'Shift + Enter', description: 'New line' },
      { key: 'Ctrl/Cmd + Enter', description: 'Send message' },
    ]
  },
  {
    category: 'Interface',
    items: [
      { key: 'Ctrl/Cmd + B', description: 'Toggle sidebar' },
      { key: 'Ctrl/Cmd + J', description: 'Toggle context panel' },
      { key: 'Esc', description: 'Close modals' },
    ]
  }
]

export function KeyboardShortcuts({ isOpen, onClose }: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-varsh-surface border border-varsh-divider rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-varsh-divider">
          <div className="flex items-center gap-3">
            <Keyboard className="h-5 w-5 text-varsh-primary" />
            <h2 className="text-lg font-semibold text-white">Keyboard Shortcuts</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-varsh-muted hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-6">
            {shortcuts.map((category, index) => (
              <div key={index}>
                <h3 className="text-sm font-medium text-white mb-3">
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.items.map((shortcut, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-varsh-background"
                    >
                      <span className="text-sm text-varsh-muted">
                        {shortcut.description}
                      </span>
                      <kbd className="px-2 py-1 text-xs font-mono bg-varsh-surface border border-varsh-divider rounded text-varsh-primary">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-varsh-divider">
          <p className="text-xs text-varsh-muted text-center">
            Press <kbd className="px-1 py-0.5 text-xs font-mono bg-varsh-surface border border-varsh-divider rounded">?</kbd> anytime to open this menu
          </p>
        </div>
      </div>
    </div>
  )
}
