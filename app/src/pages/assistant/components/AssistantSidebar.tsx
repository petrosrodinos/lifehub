import { Plus, X } from 'lucide-react'
import type { ChatConversation } from '../../../features/assistant/interfaces/chat.interface'
import { SidebarConversationItem } from './SidebarConversationItem'

interface AssistantSidebarProps {
    conversations: ChatConversation[]
    selectedUuid: string | null
    isLoading: boolean
    isOpen: boolean
    onClose: () => void
    onSelect: (uuid: string) => void
    onNewChat: () => void
    onDelete: (uuid: string) => void
    onRename: (uuid: string, title: string) => void
    isRenaming: boolean
    isCreating: boolean
}

export function AssistantSidebar({
    conversations,
    selectedUuid,
    isLoading,
    isOpen,
    onClose,
    onSelect,
    onNewChat,
    onDelete,
    onRename,
    isRenaming,
    isCreating,
}: AssistantSidebarProps) {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={onClose}
                    aria-hidden
                />
            )}
            <aside
                className={`fixed top-[4.5rem] bottom-16 left-0 z-40 w-[280px] h-[calc(100vh-4.5rem-4rem)] flex flex-col bg-slate-900/95 border-r border-slate-700/50 transform transition-transform duration-200 lg:translate-x-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
                    <h2 className="text-sm font-semibold text-white">Chats</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="lg:hidden p-1 text-slate-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-3">
                    <button
                        type="button"
                        onClick={onNewChat}
                        disabled={isCreating}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        New chat
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-2 pb-4">
                    {isLoading ? (
                        <div className="space-y-2 p-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-12 rounded-xl bg-slate-800/50 animate-pulse" />
                            ))}
                        </div>
                    ) : conversations.length === 0 ? (
                        <p className="text-slate-500 text-sm text-center p-4">No chats yet</p>
                    ) : (
                        <ul className="space-y-1">
                            {conversations.map((conv) => (
                                <li key={conv.uuid}>
                                    <SidebarConversationItem
                                        conversation={conv}
                                        isSelected={conv.uuid === selectedUuid}
                                        isRenaming={isRenaming}
                                        onSelect={() => {
                                            onSelect(conv.uuid)
                                            onClose()
                                        }}
                                        onDelete={() => onDelete(conv.uuid)}
                                        onRename={(title) => onRename(conv.uuid, title)}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </aside>
        </>
    )
}
