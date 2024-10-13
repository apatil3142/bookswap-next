"use server";

import { Book, User } from "./models";
import { connectToDb } from "./db";
import { auth, signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export const handleLogout = async () => {
  await signOut();
};

export interface IBookDetails {
  title: string, 
  abbreviation: string, 
  amount: number, 
  city: string, 
  image: string, 
  cloudinaryId: string
}

interface IAddNewBook {
  imageFile: string,
  payload: IBookDetails
}

const uploadBookDetails = async (payload: IBookDetails) => {
  try {
    await connectToDb();
    const session = await auth();
    const postedBy = session?.user?.id;
    
    const {title, abbreviation, amount, city, image, cloudinaryId} = payload;
    if(!title || !abbreviation || !amount || !city || !image || !cloudinaryId){
      if(!image){
        throw new Error("Please upload image of your book");
      }
      throw new Error("Please fill all the fields");
    }
    const newBook = new Book({
      title,
      abbreviation,
      amount,
      city,
      image,
      cloudinaryId,
      postedBy
    })
    await newBook.save();
    return {success: true};

  } catch (error) {
    console.log(error);
    let errorMessage = "An unknown error occurred"; // Default message for unknown error type
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return { error: errorMessage };
  }
}

export const addNewBook = async ({imageFile, payload}: IAddNewBook) => {

  try {
    const data = new FormData();
  data.append('file', imageFile);
  data.append("upload_preset","book-swap")
  data.append("cloud_name",process.env.CLOUDINARY_CLOUD_NAME!);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method:"post",
      body:data
    });
  const responseData = await response.json();
  const result = await uploadBookDetails({...payload, image: responseData.url, cloudinaryId: responseData.public_id})
  return result;
    
  } catch (error) {
    console.log(error);
  }
  
};

export const register = async (previousState, formData) => {
  const { username, email, password, confirmPassword } =
    Object.fromEntries(formData);

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  try {
    await connectToDb();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};