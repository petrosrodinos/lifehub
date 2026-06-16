import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import type { DisplayMessage } from '../../features/assistant/interfaces/chat.interface'
import { stripMarkdownImages } from '../../features/assistant/utils/strip-markdown-images.utils'
import { ChatMessageImage } from './ChatMessageImage'

const assistantMarkdownComponents: Components = {
    img: () => null,
}

interface ChatMessageBubbleProps {
    message: DisplayMessage
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
    const isUser = message.role === 'USER'
    const isPending = message.status === 'pending'
    const toolTrace = message.metadata?.toolTrace ?? []
    const images = message.metadata?.images ?? []
    const searchedNotes = toolTrace.some((entry) => entry.name === 'search_notes')
    const generatedImage = toolTrace.some((entry) => entry.name === 'create_image')
    const displayContent = isUser
        ? message.content
        : stripMarkdownImages(
              message.content,
              images.map((image) => image.url),
          )

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 ${
                    isUser
                        ? 'bg-violet-600 text-white rounded-br-md'
                        : 'bg-slate-800/80 border border-slate-700/50 text-slate-100 rounded-bl-md'
                }`}
            >
                {isPending && !message.content ? (
                    <div className="flex gap-1.5 py-1">
                        <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
                        <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
                        <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
                    </div>
                ) : isUser ? (
                    <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{displayContent}</p>
                ) : (
                    <div className="prose-notes">
                        <ReactMarkdown components={assistantMarkdownComponents}>
                            {displayContent}
                        </ReactMarkdown>
                    </div>
                )}
                {!isUser && images.length > 0 && !isPending && (
                    <div className="mt-3 space-y-3">
                        {images.map((image) => (
                            <ChatMessageImage key={image.url} url={image.url} alt={image.prompt} />
                        ))}
                    </div>
                )}
                {!isUser && searchedNotes && !isPending && (
                    <p className="mt-2 text-xs text-violet-300/80">Searched your notes</p>
                )}
                {!isUser && generatedImage && images.length === 0 && !isPending && (
                    <p className="mt-2 text-xs text-violet-300/80">Generated an image</p>
                )}
            </div>
        </div>
    )
}
