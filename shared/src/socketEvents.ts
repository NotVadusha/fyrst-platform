import { User } from 'user';

export interface Message {
  id: number;
  messageContent: string;
  attachments?: string[];
  chatId: number;
  userId: number;
  user?: User | null;
  createdAt?: Date;
}

export interface Chat {
  id: number;
  name: string;
  ownerId: number;
  user: User;
  messages: Message[];
  members: User[];
}

export interface ServerToClientEvents {
  'new-message': (payload: Message) => void;
  onFindAll: (payload: Message[]) => void;
  onFind: (payload: Message) => void;
  onUpdate: (payload: Message) => void;
  onDelete: (payload: Message) => void;
  'chat-joined': (payload: Chat) => void;
  'new-conversation': (payload: Omit<Chat, 'members'>) => void;
  'conversation-upsert': (payload: Chat) => void;
  'send-conversations': (payload: Chat[]) => void;
}

export interface SendMessagePayload {
  message: Message['messageContent'];
}

export interface ClientToServerEvents {
  'send-message': (payload: SendMessagePayload) => void;
  'user-join-chat': (payload: { chatId: string }) => void;
  'user-leave-chat': (payload: { chatId: string }) => void;
  'user-online': (payload: { userId: number }) => void;
  'get-conversations': (payload: { userId: number }) => void;
}
