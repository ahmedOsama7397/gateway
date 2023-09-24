import { Channel, ConsumeMessage } from "amqplib";
import { RabbitMQ } from "./RabbitInterface";
import config from "../../config";
const amqp = require("amqplib");

export class RabbitMQAbstract implements RabbitMQ {
  public channel: Channel | undefined;
  private exchangeName: string = "";

  // method for set exchange name
  public setExchangeName(exchangeName: string) {
    this.exchangeName = exchangeName;
    return this;
  }

  // step 1 : create channel
  public async createChannel() {
    const connection = await amqp.connect(config.rabbitMQ.url as string);
    this.channel = await connection.createChannel();
  }

  // step 2 : producer publish message or send message
  public async send(routingKey: string, message: any, exchangeName: string) {
    if (!this.channel) await this.createChannel();

    this.setExchangeName(exchangeName);
    await this.channel?.assertExchange(exchangeName as string, "direct");

    await this.channel?.publish(
      exchangeName as string,
      routingKey,
      Buffer.from(
        JSON.stringify({
          logType: routingKey,
          message: message,
          date: new Date(),
        })
      )
    );

    console.log(`message: ${message} is sent to exchange:${exchangeName}`);
  }

  // step 3 : consumer or receive message
  public async receive(
    routingKey: string,
    queue: string,
    callback: (arg: ConsumeMessage | null) => void
  ) {
    // create exchange that receive message
    await this.channel?.assertExchange(this.exchangeName, "direct");

    // create the queue
    const q = await this.channel?.assertQueue(queue);

    // bind queue with exchange
    // bindQueue takes (createdQueue, exchangeName,pattern or routing key)
    await this.channel?.bindQueue(
      q?.queue as string,
      this.exchangeName,
      routingKey
    );

    // consume message from queue
    return await this.channel?.consume(
      q?.queue as string,
      (msg: ConsumeMessage | null) => {
        if (msg) {
          callback(msg);
          // Process the message
          const msgDelivered = JSON.parse(msg.content.toString());
          console.log(msgDelivered, "msgDelivered");
          this.channel?.ack(msg);
        }
      }
    );
  }
}
