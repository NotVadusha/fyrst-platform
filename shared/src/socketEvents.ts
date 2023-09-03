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

export interface UpdateConversationPayload {
  chatId: number;
  message: Message;
}

export interface ServerToClientEvents {
  'new-message': (payload: Message) => void;
  onFindAll: (payload: Message[]) => void;
  onFind: (payload: Message) => void;
  onUpdate: (payload: Message) => void;
  onDelete: (payload: Message) => void;
  'chat-joined': (payload: { chat: Chat; onlineUsers: number[] }) => void;
  'send-conversations': (payload: Chat[]) => void;
  'new-conversation': (payload: Chat) => void;
  'conversation-update': (payload: UpdateConversationPayload) => void;
  'user-online': (payload: { userId: number }) => void;
  'user-offline': (payload: { userId: number }) => void;
  'user-typing': (payload: { user: TypingUser }) => void;
}

export interface SendMessagePayload {
  message: Message['messageContent'];
}

export type TypingUser = Pick<User, 'id' | 'first_name'>;

export interface ClientToServerEvents {
  'send-message': (payload: SendMessagePayload) => void;
  'user-join-chat': (payload: { chatId: string }) => void;
  'user-leave-chat': (payload: { chatId: string }) => void;
  'user-online': (payload: { userId: number }) => void;
  'user-offline': (payload: { userId: number }) => void;
  'get-conversations': (payload: { userId: number }) => void;
  'user-type': (payload: { user: TypingUser, chatId: string }) => void;
}
