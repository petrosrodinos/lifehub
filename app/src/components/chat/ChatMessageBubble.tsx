import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import { Volume2, Square } from 'lucide-react'
import type { DisplayMessage } from '../../features/assistant/interfaces/chat.interface'
import { stripMarkdownImages } from '../../features/assistant/utils/strip-markdown-images.utils'
import { stripMarkdownForSpeech } from '../../features/assistant/utils/strip-markdown-for-speech.utils'
import { useVoiceOutput } from '../../hooks/use-voice-output'
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

    const { speakingId, isSupported: isTtsSupported, speak, stop } = useVoiceOutput()
    const isThisSpeaking = speakingId === message.uuid

    const handleToggleSpeak = () => {
        if (isThisSpeaking) {
            void stop()
        } else {
            void speak(stripMarkdownForSpeech(displayContent), message.uuid)
        }
    }

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
                {!isUser && !isPending && (isTtsSupported || searchedNotes || (generatedImage && images.length === 0)) && (
                    <div className="mt-2 flex items-center gap-2">
                        {isTtsSupported && (
                            <button
                                type="button"
                                onClick={handleToggleSpeak}
                                aria-label={isThisSpeaking ? 'Stop reading aloud' : 'Read aloud'}
                                className="flex-shrink-0 p-1.5 bg-violet-500/10 rounded-lg text-violet-400 hover:text-violet-300 transition-colors"
                            >
                                {isThisSpeaking ? <Square className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                            </button>
                        )}
                        {searchedNotes && <p className="text-xs text-violet-300/80">Searched your notes</p>}
                        {generatedImage && images.length === 0 && <p className="text-xs text-violet-300/80">Generated an image</p>}
                    </div>
                )}
            </div>
        </div>
    )
}
