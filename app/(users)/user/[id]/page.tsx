import { getUserById } from "@/services/apiServices/userService";
import { instance } from "@/services/axios";
import { createMetadata } from "@/lib/utils/genarateMeta";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  try {
    const res = await instance(getUserById(id));
    const user = res.data;

    return createMetadata({
      title: user.name,
      description: user.excerpt,
      image: user.ogImage || "/fallback.png",
      url: `http://localhost:3000/user/${id}`,
      keywords: ["blog", user.category, user.author],
    });
  } catch (err) {
    console.error("Failed to fetch metadata", err);
    return createMetadata({
      title: "user Not Found",
      description: "Unable to find the user.",
      image: "/fallback.png",
      url: `http://localhost:3000/user/${id}`,
      keywords: ["not found"],
    });
  }
}

const UserByIdPage = async ({ params }: Props) => {
  const { id } = params;
  const res = await instance(getUserById(id));
  const user = res.data;
  console.log({ user });
  return (
    <div>
      <div className="bg-slate-800 p-4 m-4 rounded-lg shadow-lg" >
        <h2 className="text-white text-xl font-bold">{user.name}</h2>
        <div className="rounded-lg shadow-md flex gap-2 flex-wrap">
          <p className="text-gray-400">{user.email}</p>
          <p className="text-gray-300">{user.phone}</p>
          <p className="text-gray-300">{user.website}</p>
          <p className="text-gray-300">
            Address: {user.address.street}, {user.address.city}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserByIdPage;
