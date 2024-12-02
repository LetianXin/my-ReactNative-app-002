import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';
export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.capy.aora",
    projectId: "6740b211002a352f20c9",
    databaseId: "6740b6370007468edc63",
    userCollectionId: "6740b65e000972c822c2",
    videoCollectionId: "6740b673001c497b6607",
    storageId: "6740b78c000acc982241",

}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId

} = config


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const creatUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) {throw Error}

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password) 

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl


            }
            
        )
        return newUser
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }

}

export const signIn = async (email, password) => {
    try {
        // Check if a session already exists
        const user = await account.get();
        if (user) {
            console.log("User already signed in:", user);
            return user; // Return existing session
        }
    } catch (error) {
        console.log("No active session, proceeding to sign in.");
        // No active session, continue to create a new one
    }

    try {
        const session = await account.createEmailPasswordSession(email, password)
        
        return session
    } catch (error) {
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;
        return currentUser.documents[0]

    } catch (error) {
        console.log(error)
    }
}

export const getAllPosts = async () => {

    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId
        )
        return posts.documents
    } catch {

        throw new Error(error)
    }

}