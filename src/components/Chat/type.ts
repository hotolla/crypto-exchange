export type Message = string;
export type ChatMessages = Message[];
export interface IChatMessage {
  user: string;
  message: string;
}
export const chatMessageInitialState: IChatMessage = {
  user: '',
  message: '',
}