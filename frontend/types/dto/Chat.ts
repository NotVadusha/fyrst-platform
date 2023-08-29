import { Message } from "shared/socketEvents";
import { UserDefaultResponse } from "./UserDto";

export interface Chat {
  messages: Message[];
  members: UserDefaultResponse[];
}
