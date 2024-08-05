import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export const useAddToPlayList = () => {
  const time = new Date();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addToPlaylist = async ({ videoId, playlistId }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/video-play-list/new-video/${videoId}/${playlistId}`
    );
    return response?.data;
  };
  const addToPlayListMutation = useMutation({
    mutationFn: addToPlaylist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchPlaylistVideos"] });
      toast({
        title: "Video added successfully . . . . . . . .",
        description: `At : ${time.toLocaleDateString()}`,
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Somthing went wrong . . . . . .!",
        description: error?.message,
        variant: "destructive",
      });
    },
  });
  return {
    addToPlayList: addToPlayListMutation.mutate,
    addToPlaylistLoading: addToPlayListMutation.isPending,
  };
};
