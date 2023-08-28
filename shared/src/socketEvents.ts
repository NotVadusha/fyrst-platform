export interface Message {
  id: number;
  messageContent: string;
  time: string;
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

export interface ClientToServerEvents {
  'send-message': (payload: { message: Message['messageContent'] }) => void;
}
