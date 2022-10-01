import { Client, Account, Databases } from "appwrite";

const client = new Client();

client.setEndpoint("http://localhost/v1").setProject("6336fa6cc4cd95833e41");

export const account = new Account(client);
export const databases = new Databases(client, "63371d8a882b81c0e738");
