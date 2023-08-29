export interface Message {
  id: number;
  messageContent: string;
  attachments?: string[];
  chatId: number;
  userId: number;
}

export interface ServerToClientEvents {
  onCreate: (payload: Message) => void;
  onFindAll: (payload: Message[]) => void;
  onFind: (payload: Message) => void;
  onUpdate: (payload: Message) => void;
  onDelete: (payload: Message) => void;
}

export interface SendMessagePayload {
  message: Message['messageContent'];
}

export interface ClientToServerEvents {
  'send-message': (payload: SendMessagePayload) => void;
  'user-join-chat': (payload: { chatId: string }) => void;
}
