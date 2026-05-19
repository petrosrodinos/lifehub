import { useEffect, useRef } from 'react'
import type { DisplayMessage } from '../../../features/assistant/interfaces/chat.interface'
import { ChatMessageBubble } from './ChatMessageBubble'

interface ChatMessageListProps {
    messages: DisplayMessage[]
    isLoading: boolean
}

export function ChatMessageList({ messages, isLoading }: ChatMessageListProps) {
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isLoading])

    return (
        <div className="absolute inset-x-0 top-16 bottom-36 overflow-y-auto">
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
                            I search your saved notes and answer based on what you have written.
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
