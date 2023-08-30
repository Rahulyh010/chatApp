/* eslint-disable @typescript-eslint/no-unused-vars */
import * as io from "socket.io";

declare module "socket.io" {
  interface Socket {
    user: TokenPayload;
  }
}
