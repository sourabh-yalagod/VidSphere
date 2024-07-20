import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import APIloading from "@/utils/APIloading";
import APIError from "@/utils/APIError";
import VideoController from "@/components/VideoController";
import Subscrption from "@/components/Subscrption";
import VideoFigures from "@/components/VideoFigures";
import Description from "@/components/Description";
import Comments from "@/components/Comments";
import RecommendSession from "@/components/RecommendSession";

const fetchVideoData = async (videoId) => {
  const response = await axios.get(`/api/v1/videos/get-video/${videoId}`);
  return response.data.data;
};

const PlayVideo = () => {
  const { videoId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["playVideo", videoId],
    queryFn: () => fetchVideoData(videoId),
  });
  if (isLoading) {
    return <APIloading />;
  }

  if (isError) {
    return <APIError />;
  }

  const { allComments, recommendedVideos, Uploader } = data;
  const apiResponse = data;
  return (
    <div className="w-full grid min-h-screen pl-3 lg:flex lg:gap-4 p-1 lg:grid-cols-2 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 pb-10 mx-auto">
      <div className="lg:w-full space-y-2">
        <VideoController apiResponse={apiResponse} />
        <Subscrption apiResponse={apiResponse} />
        <VideoFigures apiResponse={apiResponse} videoId={videoId} />
        <Description apiResponse={apiResponse} />
        <Comments
          apiResponse={apiResponse}
          videoId={videoId}
          allComments={allComments}
        />
      </div>
      <RecommendSession
        className=""
        videos={recommendedVideos[0]?.videos}
        avatar={Uploader?.avatar}
        username={Uploader?.username}
      />
    </div>
  );
};

export default PlayVideo;
