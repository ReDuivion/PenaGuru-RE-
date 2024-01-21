"use client";

// pages/me.jsx
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Perhatikan penggunaan next/navigation
import { supabase } from "../config/supabase.js";


import Image from "next/image";

const MePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error.message);
          router.push("/login");
        } else {
          setUser(user);

          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("email", user?.email)
            .single();
          console.log(data);

          if (error) {
            console.error("Error fetching user data:", error.message);
          } else {
            setUserData(data || {});
            console.log(data);

            const res = await supabase.storage
              .from("gambar")
              .getPublicUrl(data?.avatar);

            if (res.error) {
              console.error("Error fetching avatar URL:", res.error.message);
            } else {
              setAvatarUrl(res.data?.publicUrl); // Use optional chaining to handle null publicUrl
              console.log(res.data);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    const fetchLatestPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("user_id", user?.id)
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) {
          console.error("Error fetching user posts:", error.message);
        } else {
          setPosts(data || []);
        }
      } catch (error) {
        console.error("Error fetching user posts:", error.message);
      }
    };

    const fetchFriends = async () => {
      try {
        const { data, error } = await supabase
          .from("friends")
          .select("*")
          .eq("user_id", user?.id);

        if (error) {
          console.error("Error fetching user friends:", error.message);
        } else {
          setFriends(data || []);
        }
      } catch (error) {
        console.error("Error fetching user friends:", error.message);
      }
    };

    fetchUser();
    fetchLatestPosts();
    fetchFriends();
  }, [router]);

  return (
    <>
     <div className="bg-gray-100 min-h-screen py-8">
        <div className="max-w-screen-lg mx-auto">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="flex items-center justify-center p-6 md:p-8">
              <div className="relative w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full">
                <Image
                  src={avatarUrl}
                  alt="Avatar"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-semibold">{user?.email}</h2>
                <p className="text-gray-600">Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <hr className="border-t border-gray-200" />
            <div className="p-6 md:p-8">
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <span className="font-semibold block">Posts</span>
                  <span className="text-gray-600 block">100</span>
                </div>
                <div className="text-center">
                  <span className="font-semibold block">Followers</span>
                  <span className="text-gray-600 block">500</span>
                </div>
                <div className="text-center">
                  <span className="font-semibold block">Following</span>
                  <span className="text-gray-600 block">200</span>
                </div>
              </div>
              <div className="mt-4 text-center">
       
              </div>
              <hr className="my-4 border-t border-gray-200" />
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-2">About Me</h3>
                <p className="text-gray-600">
                  {userData.motto}
                </p>
              </div>
              <hr className="my-4 border-t border-gray-200" />
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-2">Latest Posts</h3>
                <div className="grid grid-cols-3 gap-4">
                  {posts.map((post) => (
                    <div key={post.id} className="relative w-full h-20 overflow-hidden rounded-md">
                      <Image
                        src={post.image_url || "/placeholder-image.png"}
                        alt="Post Image"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <hr className="my-4 border-t border-gray-200" />
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-2">Friends</h3>
                <div className="flex items-center space-x-3">
                  {friends.map((friend) => (
                    <div key={friend.id} className="w-8 h-8 relative overflow-hidden rounded-full">
                      <Image
                        src={friend.avatar_url || "/placeholder-avatar.png"}
                        alt="Friend Avatar"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MePage;
