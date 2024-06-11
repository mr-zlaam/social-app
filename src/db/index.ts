import { PrismaClient } from "@prisma/client";
import { PORT } from "../config";
import app from "../app";

const prisma = new PrismaClient({});
export default async function connectDB() {
  prisma
    .$connect()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`
                  **************************************************************
                            connected to the database successfully!!

                       Server is running on port:- http://localhost:${PORT}
                  **************************************************************
        `);
      });
    })
    .catch((err) => {
      console.error(`
                        **************************************************************
                                  X  ERRR while connecting to database X \n ${err.message}
                        **************************************************************
      `);
      return process.exit(1);
    });
}
export { prisma };
