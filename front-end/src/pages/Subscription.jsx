import axios from "axios";
import { useParams } from "react-router-dom";
import Video from "@/utils/Video";
import APIloading from "@/utils/APIloading";
import APIError from "@/utils/APIError";
import VideoNotFound from "@/utils/VideoNotFound";

import Channel from "@/components/Channel";
import { useQuery } from "@tanstack/react-query";

const Subscription = () => {
  const { userId } = useParams();
  // const [apiResponse, setApiResponse] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  // Api request for Subscription videos
  // useEffect(() => {
  //   (async () => {
  //     setLoading(true);
  //     try {
  //       setError("");
  //       const response = await axios.get(
  //         `/api/v1/users/subscriptions-status/${userId}`
  //       );
  //       setApiResponse(response?.data?.data);
  //       console.log("Response from Subscription : ", apiResponse);
  //     } catch (error) {
  //       const err = error;
  //       setError(err.message ?? "Error while API call");
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, [userId]);
  const handleSubscription = async () => {
    const response = await axios.get(
      `/api/v1/users/subscriptions-status/${userId}`
    );
    return response?.data;
  };
  const {
    data: apiResponse,
    isPending: loading,
    error,
  } = useQuery({
    queryKey: ["subscription"],
    queryFn: handleSubscription,
    staleTime: 5 * 60 * 1000,
  });

  if (loading) {
    return <APIloading />;
  }
  if (error) {
    return <APIError />;
  }
  return (
    <div className="min-h-screen w-full grid place-items-center bg-gray-100 dark:bg-slate-900 relative">
      <p className="text-slate-700 dark:text-slate-300 text-xl py-2 text-center underline sm:text-2xl md:text-3xl lg:text-4xl">
        Channel You Subscribed
      </p>
      <div className="w-auto justify-center items-center flex mb-5 p-5 overflow-x-auto mx-auto px-5 dark:text-white border border-slate-600 rounded-xl">
        {apiResponse?.data?.Channels?.map((channel) => (
          // console.log("channel : ",channel)
          <div key={channel._id}>
            <Channel
              username={channel?.Channel?.username ?? ""}
              fullname={channel?.Channel?.fullname ?? ""}
              channelId={channel.channel}
              avatar={
                channel?.Channel?.avatar ??
                "https://static.vecteezy.com/system/resources/previews/024/183/502/non_2x/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg"
              }
            />
          </div>
        ))}
      </div>
      {apiResponse?.data?.videos?.length > 0 ? (
        <ul className="flex flex-wrap items-center w-full gap-2 justify-center">
          {apiResponse?.data?.videos.map((video) => {
            return (
              <div
                key={video?._id + Math.random()}
                className="flex-1 min-w-[320px] max-w-[450px] border-slate-700 border p-2 rounded-xl relative"
              >
                <Video
                  video={video?.video}
                  avatar={video?.video?.Uploader?.avatar}
                  username={video?.video?.Uploader?.username}
                  userId={video?.video?.Uploader?.userId}
                />
              </div>
            );
          })}
        </ul>
      ) : (
        <VideoNotFound />
      )}
    </div>
  );
};

export default Subscription;
