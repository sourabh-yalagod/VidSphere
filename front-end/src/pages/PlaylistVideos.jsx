import axios, { AxiosError } from "axios";
import { Loader2, NutOffIcon, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Video from "@/utils/Video";
import VideoNotFound from "@/utils/VideoNotFound";
import APIloading from "@/utils/APIloading";
import APIError from "@/utils/APIError";
import userAuth from "@/Services/Auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

const PlaylistVideos = () => {
  const time = new Date();
  const { playlistId } = useParams();
  const { toast } = useToast();
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userId = userAuth().userId;
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   setLoading(true);
  //   (async () => {
  //     try {
  //       setError("");
  //       const response = await axios.get(
  //         `/api/v1/video-play-list/all-playlist-videos/${playlistId}`
  //       );
  //       setApiResponse(response?.data?.data);
  //     } catch (error) {
  //       const err = error;
  //       setError(err?.message ?? "Error while API call");
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, [playlistId]);

  const fetchPlaylistVideos = async () => {
    const response = await axios.get(
      `/api/v1/video-play-list/all-playlist-videos/${playlistId}`
    );
    return response?.data?.data;
  };
  const {
    data: playlistVideos,
    isPending: playlistVideosLoding,
    error: playlistVideosError,
  } = useQuery({
    queryKey: ["fetchPlaylistVideos"],
    queryFn: fetchPlaylistVideos,
    staleTime: 10 * 60 * 1000,
  });
  // const removeVideoFromPlaylist = async (videoId, playlistId) => {
  //   try {
  //     setIsLoading(true);
  //     setError("");
  //     const response = await axios.delete(
  //       `/api/v1/video-play-list/delete-video/${videoId}/${playlistId}`
  //     );
  //     console.log(
  //       "Response for deleting a video from Playlist : ",
  //       response.data.data
  //     );
  //     // navigate(0)
  //   } catch (error) {
  //     const axiosError = error;
  //     setError(axiosError);
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const removeVideoFromPlaylist = async ({ videoId, playlistId }) => {
    const response = await axios.delete(
      `/api/v1/video-play-list/delete-video/${videoId}/${playlistId}`
    );
    return response?.data;
  };
  
  const removeVideoFromPlaylistMutation = useMutation({
    mutationFn: removeVideoFromPlaylist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchPlaylistVideos"] });
      toast({
        title: "Videos Removed succesfully.",
        description: `At : ${time.toLocaleDateString()}`,
        variant: "default",
        duration: 2000,
      });
    },
    onError: (error) => {
      toast({
        title: error?.message,
        description: `At : ${time.toLocaleDateString()}`,
        variant: "destructive",
        duration: 2000,
      });
    },
  });

  if (playlistVideosLoding) {
    return <APIloading />;
  }
  
  if (playlistVideosError) {
    return <APIError />;
  }
  return (
    <div className="min-h-screen w-full px-3 bg-white dark:bg-black pt-16 relative">
      <div>
        <p
          onClick={() => navigate(`/signin/user-profile/${userId}`)}
          className="flex gap-3 dark:border-slate-400 border-slate-900 border-[1px] p-2 w-fit hover:bg-blue-700 hover:border-none hover:scale-95 rounded-xl hover:text-white transition-all items-center text-center text-slate-800 dark:text-slate-300 cursor-pointer"
        >
          <PlusCircle />
          Add Videos
        </p>
        <h1 className="text-center underline underline-offset-8 py-10 animate-pulse text-gray-800 dark:text-white text-2xl font-black">
          Playlist Videos
        </h1>
        {playlistVideos?.videos?.length > 0 ? (
          <ul className="flex flex-wrap items-center w-full gap-2 justify-center relative">
            {playlistVideos?.videos?.map((video) => (
              <div
                key={video._id}
                className="flex-1 min-w-[320px] max-w-[350px] border-slate-700 border p-2 rounded-xl relative"
              >
                <Video
                  video={video}
                  userId={video?.owner?._id}
                  username={video?.owner?.username}
                  avatar={video?.owner?.avatar}
                  dropMenuBar={[
                    {
                      name: removeVideoFromPlaylistMutation.isPending ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Remove video"
                      ),
                      operation: () =>
                        removeVideoFromPlaylistMutation.mutate({
                          videoId: video?._id,
                          playlistId,
                        }),
                    },
                  ]}
                />
              </div>
            ))}
          </ul>
        ) : (
          <div className="relative grid place-items-center">
            <VideoNotFound />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistVideos;
