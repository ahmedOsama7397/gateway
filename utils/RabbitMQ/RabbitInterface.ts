import { Channel, ConsumeMessage, Replies } from "amqplib";

export interface RabbitMQ {
  channel: Channel | undefined;
  setExchangeName: (exchangeName: string) => this;
  createChannel: () => Promise<void>;
  send: (
    routingKey: string,
    message: Record<string, string>,
    exchangeName: string
  ) => Promise<void>;
  receive: (
    routingKey: string,
    queue: string,
    callback: (arg: ConsumeMessage | null) => void
  ) => Promise<Replies.Consume | undefined>;
}
