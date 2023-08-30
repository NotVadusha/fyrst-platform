export interface Message {
  id: number;
  messageContent: string;
  attachments?: string[];
  chatId: number;
  userId: number;
}

export interface Chat {
  id: number;
  name: string;
  ownerId: number;
  user: any;
  messages: Message[];
  members: any[];
}

export interface ServerToClientEvents {
  'new-message': (payload: Message) => void;
  onFindAll: (payload: Message[]) => void;
  onFind: (payload: Message) => void;
  onUpdate: (payload: Message) => void;
  onDelete: (payload: Message) => void;
  'chat-joined': (payload: Chat) => void;
  'new-conversation': (payload: Omit<Chat, 'members'>) => void;
  'conversation-update': (payload: Omit<Chat, 'members'>) => void;
}

export interface SendMessagePayload {
  message: Message['messageContent'];
}

export interface ClientToServerEvents {
  // 'client-ready': () => void;
  'send-message': (payload: SendMessagePayload) => void;
  'user-join-chat': (payload: { chatId: string }) => void;
  'user-leave-chat': (payload: { chatId: string }) => void;
}
