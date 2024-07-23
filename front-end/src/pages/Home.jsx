import axios from "axios";
import { Loader2 } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";
import BottomNavBar from "../components/BottomNavBar.jsx";
import { SkeletonCard } from "@/utils/Skeleton.jsx";
import Video from "@/utils/Video.jsx";
import VideoNotFound from "@/utils/VideoNotFound.jsx";
import APIError from "@/utils/APIError.jsx";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useAddToWatchLater } from "@/hooks/AddToWatchLater.js";
import data from "../utils/Sections.json";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

const limit = 5;

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryResults, setSearchQueryResults] = useState([]);
  const [option, setOption] = useState("");
  const { addToWatchLater, watchLaterLoading } = useAddToWatchLater();
  const { toast } = useToast();
  const { inView, ref } = useInView();

  const homePageVideos = async ({ pageParam = 1 }) => {
    const response = await axios.get(
      `/api/v1/home?limit=${limit}&page=${pageParam}`
    );
    return response?.data;
  };

  const {
    data: videos,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error: queryError,
  } = useInfiniteQuery({
    queryKey: ["homePageVideos"],
    queryFn: homePageVideos,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === limit ? allPages.length + 1 : undefined;
    },
    staleTime: 60 * 30 * 1000,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const result = videos?.pages.flatMap((page) => page) || [];

  // const searchQueryResult = useCallback(
  //   async (option) => {
  //     // setIsLoading(true);
  //     try {
  //       const response = await axios.get(
  //         `/api/v1/home/search-video?search=${searchQuery || option}`
  //       );
  //       setError("");
  //       setSearchQueryResults(response?.data?.data);
  //       toast({
  //         title: `Found related Videos . . . .!`,
  //         duration: 1000,
  //       });
  //     } catch (error) {
  //       toast({
  //         title: "Error while searching...",
  //         description: error?.message,
  //         variant: "destructive",
  //         duration: 1200,
  //       });
  //     } finally {
  //       // setIsLoading(false);
  //       setSearchQuery("");
  //     }
  //   },
  //   [searchQuery, option, toast]
  // );
  const searchVideos = async (searchQuery) => {
    const response = await axios.get(
      `/api/v1/home/search-video?search=${searchQuery || option}`
    );
    return response?.data;
  };
  const searchMutation = useMutation({
    mutationFn: searchVideos,
    onSuccess: (data) => {
      toast({
        title: `Found related Videos . . . .!`,
        duration: 1200,
      });
      setSearchQueryResults(data?.data);
      // setSearchQuery('')
    },
    onError: (error) => {
      toast({
        title: "Error while searching...",
        description: error?.message,
        variant: "destructive",
        duration: 1200,
      });
    },
  });
  if (isLoading) {
    return <SkeletonCard cards={10} />;
  }

  if (queryError) {
    return <APIError />;
  }

  return (
    <div className="min-h-screen transition-all w-full flex relative place-items-center py-3 dark:bg-gray-900 bg-white">
      <BottomNavBar />
      <div className="min-h-screen w-full p-2 grid place-items-center transition-all">
        <div className="w-full grid place-items-center gap-10 md:grid-cols-2">
          <div className="w-full relative max-w-[450px]">
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              placeholder="Search Here....."
              className="bg-transparent pl-4 py-2 text-gray-700 dark:text-slate-400 grid place-items-center text-[18px] w-full border-gray-700 dark:border-slate-400 outline-none border-[1px] rounded-xl"
            />
            <button
              onClick={() => searchMutation.mutate(searchQuery)}
              className="absolute right-0 inset-y-0 cursor-pointer bg-blue-600 text-white px-3 rounded-l-3xl rounded-xl"
              disabled={searchMutation?.isPending}
            >
              {searchMutation?.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Search"
              )}
            </button>
          </div>
          <div className="flex w-full max-w-sm overflow-x-auto gap-1 justify-around rounded-xl items-center">
            {data?.Niches?.map((niche) => (
              <p
                key={niche.id}
                className="dark:bg-slate-700 dark:text-white text-slate-800 bg-slate-300 p-2 rounded-xl text-sm sm:text-[16px] cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setOption(niche?.value);
                  searchQueryResult(niche?.value);
                }}
              >
                {niche.niche}
              </p>
            ))}
          </div>
        </div>
        <div className="w-full min-h-screen py-5">
          {result.length > 0 ? (
            <ul className="flex flex-wrap items-center w-full gap-2 justify-center">
              {(searchQueryResults.length > 0
                ? searchQueryResults
                : result
              ).map((video, index) => {
                const lastItem = result.length === index + 1;
                return (
                  <div
                    ref={lastItem ? ref : null}
                    key={video._id + index}
                    className="flex-1 min-w-[320px] max-w-[350px] border-slate-700 border p-2 rounded-xl relative"
                  >
                    <Video
                      video={video}
                      userId={video?.owner?._id}
                      username={video?.owner?.username}
                      avatar={video?.owner?.avatar}
                      dropMenuBar={[
                        {
                          name: watchLaterLoading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            "Add to watch Later"
                          ),
                          operation: () => addToWatchLater(video?._id),
                        },
                      ]}
                    />
                  </div>
                );
              })}
              {!searchQuery && hasNextPage && <SkeletonCard />}
              {isFetchingNextPage && (
                <Loader2 className="animate-spin mx-auto" />
              )}
            </ul>
          ) : (
            <VideoNotFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
