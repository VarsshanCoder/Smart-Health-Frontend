import React, { useState } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { ChatProvider } from './contexts/ChatContext'
import { Header } from './components/layout/Header'
import { Sidebar } from './components/layout/Sidebar'
import { ChatArea } from './components/layout/ChatArea'
import { Composer } from './components/layout/Composer'
import { ContextPanel } from './components/layout/ContextPanel'
import { cn } from './lib/utils'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [contextPanelOpen, setContextPanelOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setSidebarOpen(false)
        setContextPanelOpen(false)
      } else {
        setSidebarOpen(true)
        setContextPanelOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="h-screen varsh-bg text-white overflow-hidden">
          {/* Header */}
          <Header 
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            isMobile={isMobile}
          />

          {/* Main Layout */}
          <div className="flex h-[calc(100vh-4rem)]">
            {/* Sidebar */}
            <div className={cn(
              "transition-transform duration-300",
              isMobile ? "fixed inset-y-0 left-0 z-50" : "relative"
            )}>
              <Sidebar 
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />
            </div>

            {/* Mobile Overlay */}
            {isMobile && sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Chat Area */}
              <ChatArea className="flex-1" />

              {/* Composer */}
              <Composer />
            </div>

            {/* Context Panel */}
            <div className={cn(
              "transition-transform duration-300",
              isMobile ? "fixed inset-y-0 right-0 z-50" : "relative"
            )}>
              <ContextPanel 
                isOpen={contextPanelOpen}
                onClose={() => setContextPanelOpen(false)}
              />
            </div>

            {/* Mobile Context Overlay */}
            {isMobile && contextPanelOpen && (
              <div 
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setContextPanelOpen(false)}
              />
            )}
          </div>
        </div>
      </ChatProvider>
    </ThemeProvider>
  )
}

export default App
