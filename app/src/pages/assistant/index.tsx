import { useCallback, useEffect, useMemo, useState } from 'react'
import { Menu } from 'lucide-react'
import { ConfirmationModal } from '../../components/ui/ConfirmationModal'
import {
    useAssistantConversations,
    useCreateConversation,
    useDeleteConversation,
    useUpdateConversation,
} from '../../features/assistant/hooks/use-assistant-conversations'
import { useAssistantMessages, useSendAssistantMessage } from '../../features/assistant/hooks/use-assistant-messages'
import type { DisplayMessage } from '../../features/assistant/interfaces/chat.interface'
import { AssistantSidebar } from './components/AssistantSidebar'
import { ChatComposer } from './components/ChatComposer'
import { ChatMessageList } from './components/ChatMessageList'
import { ChatTitleEditor } from './components/ChatTitleEditor'

export function AssistantPage() {
    const [selectedUuid, setSelectedUuid] = useState<string | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [deleteTargetUuid, setDeleteTargetUuid] = useState<string | null>(null)

    const { data: conversations = [], isLoading: conversationsLoading } = useAssistantConversations()
    const { data: messages = [], isLoading: messagesLoading } = useAssistantMessages(selectedUuid)
    const createConversation = useCreateConversation()
    const deleteConversation = useDeleteConversation()
    const updateConversation = useUpdateConversation()
    const sendMessage = useSendAssistantMessage()

    useEffect(() => {
        if (conversationsLoading) {
            return
        }

        if (conversations.length === 0) {
            setSelectedUuid(null)
            return
        }

        if (selectedUuid && !conversations.some((conversation) => conversation.uuid === selectedUuid)) {
            setSelectedUuid(null)
            return
        }

        if (!selectedUuid) {
            setSelectedUuid(conversations[0].uuid)
        }
    }, [conversations, selectedUuid, conversationsLoading])

    const displayMessages: DisplayMessage[] = useMemo(() => {
        return messages.map((m) => ({
            ...m,
            status: m.uuid.startsWith('pending-assistant-')
                ? ('pending' as const)
                : ('complete' as const),
        }))
    }, [messages])

    const handleNewChat = useCallback(async () => {
        const created = await createConversation.mutateAsync(undefined)
        setSelectedUuid(created.uuid)
        setSidebarOpen(false)
    }, [createConversation])

    const handleSend = useCallback(
        async (content: string) => {
            let conversationUuid = selectedUuid

            if (!conversationUuid) {
                const created = await createConversation.mutateAsync(undefined)
                conversationUuid = created.uuid
                setSelectedUuid(created.uuid)
            }

            await sendMessage.mutateAsync({ conversationUuid, dto: { content } })
        },
        [selectedUuid, createConversation, sendMessage],
    )

    const handleRename = useCallback(
        async (uuid: string, title: string) => {
            await updateConversation.mutateAsync({ uuid, data: { title } })
        },
        [updateConversation],
    )

    const handleConfirmDelete = useCallback(async () => {
        if (!deleteTargetUuid) return

        const wasSelected = deleteTargetUuid === selectedUuid

        if (wasSelected) {
            const created = await createConversation.mutateAsync(undefined)
            setSelectedUuid(created.uuid)
            setSidebarOpen(false)
        }

        await deleteConversation.mutateAsync(deleteTargetUuid)
        setDeleteTargetUuid(null)
    }, [deleteTargetUuid, deleteConversation, selectedUuid, createConversation])

    const selectedTitle = conversations.find((c) => c.uuid === selectedUuid)?.title ?? 'Assistant'

    return (
        <div className="relative flex flex-1 min-h-0 w-full overflow-hidden">
            <AssistantSidebar
                conversations={conversations}
                selectedUuid={selectedUuid}
                isLoading={conversationsLoading}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onSelect={setSelectedUuid}
                onNewChat={handleNewChat}
                onDelete={setDeleteTargetUuid}
                onRename={handleRename}
                isRenaming={updateConversation.isPending}
                isCreating={createConversation.isPending}
            />

            <div className="relative flex flex-1 flex-col min-h-0 min-w-0 overflow-hidden lg:ml-[280px]">
                <header className="fixed top-[4.5rem] left-0 right-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b border-slate-700/50 bg-slate-950/95 px-4 backdrop-blur-sm lg:left-[280px]">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white rounded-lg"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="min-w-0 flex-1">
                        {selectedUuid ? (
                            <ChatTitleEditor
                                title={selectedTitle}
                                onSave={(title) => handleRename(selectedUuid, title)}
                                disabled={updateConversation.isPending}
                                isPending={updateConversation.isPending}
                            />
                        ) : (
                            <h1 className="text-lg font-bold text-white truncate">Assistant</h1>
                        )}
                        <p className="text-slate-500 text-xs mt-0.5">Answers from your notes</p>
                    </div>
                </header>

                {/* Scrollable message area positioned between header and composer */}
                <div className="absolute inset-x-0 top-16 bottom-20 flex flex-col">
                    <ChatMessageList
                        messages={displayMessages}
                        isLoading={!!selectedUuid && messagesLoading}
                    />
                </div>
            </div>

            <ChatComposer
                onSend={handleSend}
                disabled={sendMessage.isPending || createConversation.isPending}
                isPending={sendMessage.isPending}
            />

            <ConfirmationModal
                isOpen={!!deleteTargetUuid}
                onClose={() => setDeleteTargetUuid(null)}
                onConfirm={handleConfirmDelete}
                title="Delete chat"
                description="This conversation and all its messages will be permanently deleted."
                confirmText="Delete"
                variant="danger"
                isPending={deleteConversation.isPending}
            />
        </div>
    )
}
