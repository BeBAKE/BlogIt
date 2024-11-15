
// // // ! wss - class - pgNode

import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { runQuery } from "./db";
import { EditorPart } from "./constants/enums";
import { auth, SocketWithAuthorDetails } from "./middleware/auth";

class WSS {
  private wss: SocketIOServer;

  constructor(server: HttpServer) {
    // Initialize the Socket.IO server
    this.wss = new SocketIOServer(server, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
      },
    });

    this.authenticate()

  }

  // Authenticate the request using middleware
  private authenticate() {
    this.wss.use((socket:Socket, next:(err?: Error) => void)=>{
      auth(socket,next)
    })

    this.initializeConnection();
  }

  // Initialize socket connection events
  private initializeConnection() {
    this.wss.on("connection", (socket: Socket) => {
      console.log("New connection with socket id:", socket.id);

      // Handle getting document
      socket.on("get-document", async (id: string) => {
        await this.handleGetDocument(socket, id);
      });

      // Handle saving document
      socket.on(
        "save-document",
        async (id: string, content: any, editorPart: string) => {
          await this.handleSaveDocument(socket, id, content, editorPart);
        }
      );

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log("Socket disconnected with id:", socket.id);
      });
    });
  }

  // Fetch or create a new document
  private async handleGetDocument(socket: Socket, id: string) {
    try {
      const content = await this.getQuillContent(socket,id);
      socket.join(id);
      const returnContent = 
        content===null || (content.body==='""' && content?.title==='""') ? null : content
      socket.emit("document-editing",returnContent)
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  }

  // Save the document content to the database
  private async handleSaveDocument(
    socket: Socket,
    id: string,
    content: any,
    editorPart: string
  ) {
    try {
      if (editorPart !== EditorPart.BODY && editorPart !== EditorPart.TITLE) {
        return;
      }
      const text = `UPDATE "Draft" SET ${editorPart}=$2 where id=$1;`;
      const value = [id, content];
      await runQuery(text, value);
      this.wss.to(id).emit("saved", `${editorPart} saved by new backend`);
    } catch (error) {
      console.error("Error saving document:", error);
    }
  }

  // Function to fetch or initialize the Quill content from the database
  private async getQuillContent(socket: Socket, id: string) {
    const text = `SELECT * FROM "Draft" WHERE id=$1;`;
    const value = [id];
    try {
      const getContent = await runQuery(text, value);
      if (getContent.rowCount === 0) {
        // No existing document, insert new empty title and body
        const insertText =
          `INSERT INTO "Draft"(id, body, title, "authorId", "authorName") 
          VALUES( $1, $2, $3, $4, $5 );`
        const insertValue = [
          id, 
          `""`, 
          `""`,
          socket.data.authorId,
          socket.data.authorName
        ];
        await runQuery(insertText, insertValue);
        return { body: `""`, title: `""` };
      }
      const content = getContent.rows[0];
      return (
        content.body === "" && content.title=== ""
          ? { body: `""`, title: `""` }
          : { title: content.title, body: content.body }
      )
    } catch (error) {
      console.log("Error getting content for quill : ",error)
      return null
    }
  }
}

export default WSS;