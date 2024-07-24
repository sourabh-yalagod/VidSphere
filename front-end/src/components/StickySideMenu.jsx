import { useSignOut } from "@/hooks/SignOut";
import userAuth from "@/Services/Auth";
import { ThemeButton } from "@/utils/ThemeButtom";
import {
  Heart,
  Home,
  Images,
  Loader2,
  Settings,
  Upload,
  User,
  UserCheck2,
  UserRoundMinusIcon,
  Videotape,
  VideotapeIcon,
  View,
  ViewIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";

const StickySideMenu = ({ location }) => {
  const { signOut, signOutLoading } = useSignOut();
  const navigate = useNavigate();
  const { toast } = useToast();
  const userId = userAuth().userId;
  useEffect(() => {
    if (!userId) {
      toast({
        title: "Please sign-in",
        description:
          "To get Access to all pages please authenticate your account . . . . . ",
        variant: "destructive",
        duration: 1500,
      });
      console.log("from Here");
      navigate("/signin");
    }
  }, []);

  return (
    <div className="fixed px-2 min-w-16 transition-all h-full left-0 inset-y-0 shadow-black shadow-lg hidden sm:block z-20 dark:bg-black">
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-4 py-2 mt-16 overflow-hidden px-3 cursor-pointer hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
      >
        <Home />
      </div>
      {!["/signup", "/signin"].includes(location) ? (
        <div className="grid justify-around py-2 text-black dark:text-white space-y-1">
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={() => navigate("/signup")}
          >
            <UserCheck2 className="w-6 h-6" />
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={() => navigate("/signin")}
          >
            <User className="w-6 h-6" />
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={() => navigate("/signin/upload-video")}
          >
            <Upload className="w-6 h-6" />
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={() => navigate(`/signin/video-play-lists/${userId}`)}
          >
            <VideotapeIcon className="w-6 h-6" />
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={() => navigate(`/signin/user-profile/${userId}`)}
          >
            <Images className="w-6 h-6" />
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={() => navigate(`/signin/watch-later-videos/${userId}`)}
          >
            <View className="w-6 h-6" />
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={() => navigate(`/signin/settings/settings/${userId}`)}
          >
            <Settings className="w-6 h-6" />
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={() => navigate(`/signin/subscription-status/${userId}`)}
          >
            <Videotape className="w-6 h-6" />
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={() => navigate(`/signin/all-favourate-videos/${userId}`)}
          >
            <Heart className="w-6 h-6" />
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={() => navigate(`/signin/watch-history/${userId}`)}
          >
            <ViewIcon className="w-6 h-6" />
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={
              () => signOut()
              //     {
              //   localStorage.removeItem("accessToken");
              //   localStorage.removeItem("userId");
              //   navigate("/");
              // }
            }
          >
            {signOutLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <UserRoundMinusIcon className="w-6 h-6" />
            )}
          </div>
          <div className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105">
            <ThemeButton />
          </div>
        </div>
      ) : (
        // <div className="grid justify-around mt-5 text-black dark:text-white space-y-1">
        //   <MenuBar/>
        // </div>
        <div className="flex mt-8 items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105">
          <ThemeButton />
        </div>
      )}
    </div>
  );
};

export default StickySideMenu;
