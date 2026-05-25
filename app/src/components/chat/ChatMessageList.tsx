import { useEffect, useRef } from 'react'
import type { DisplayMessage } from '../../features/assistant/interfaces/chat.interface'
import { ChatMessageBubble } from './ChatMessageBubble'

interface ChatMessageListProps {
    messages: DisplayMessage[]
    isLoading: boolean
    /** Optional empty-state subtitle text */
    emptySubtitle?: string
}

export function ChatMessageList({ messages, isLoading, emptySubtitle }: ChatMessageListProps) {
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isLoading])

    return (
        <div className="overflow-y-auto flex-1">
            <style>{`
                .prose-notes h1,.prose-notes h2,.prose-notes h3{color:#f1f5f9;font-weight:600;margin-top:1.2em;margin-bottom:.5em}
                .prose-notes h1{font-size:1.1rem}
                .prose-notes h2{font-size:1rem}
                .prose-notes h3{font-size:.9rem}
                .prose-notes p{color:#94a3b8;font-size:.875rem;line-height:1.7;margin-bottom:.75em}
                .prose-notes ul,.prose-notes ol{color:#94a3b8;font-size:.875rem;line-height:1.7;padding-left:1.4em;margin-bottom:.75em}
                .prose-notes li{margin-bottom:.3em}
                .prose-notes strong{color:#e2e8f0;font-weight:600}
                .prose-notes em{color:#cbd5e1}
                .prose-notes code{background:rgba(139,92,246,.15);color:#a78bfa;padding:.1em .4em;border-radius:4px;font-size:.8em}
                .prose-notes blockquote{border-left:2px solid rgba(139,92,246,.4);padding-left:1em;color:#94a3b8;font-style:italic}
                .prose-notes hr{border-color:rgba(71,85,105,.4);margin:1em 0}
            `}</style>
            {isLoading ? (
                <div className="flex flex-col gap-4 p-4">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`h-16 rounded-2xl bg-slate-800/50 animate-pulse ${i % 2 === 0 ? 'ml-auto w-2/3' : 'mr-auto w-3/4'}`}
                        />
                    ))}
                </div>
            ) : messages.length === 0 ? (
                <div className="flex items-center justify-center p-8 py-16">
                    <div className="text-center max-w-sm">
                        <p className="text-slate-300 font-medium">Ask about your notes</p>
                        <p className="text-slate-500 text-sm mt-2">
                            {emptySubtitle ?? 'I search your saved notes and answer based on what you have written.'}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="p-4 space-y-4">
                    {messages.map((message) => (
                        <ChatMessageBubble key={message.uuid} message={message} />
                    ))}
                    <div ref={bottomRef} />
                </div>
            )}
        </div>
    )
}
