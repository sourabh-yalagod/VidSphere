import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { Skeleton } from "./components/ui/skeleton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Home = lazy(() => import("./pages/Home.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const PlayVideo = lazy(() => import("./pages/PlayVideo.jsx"));
const SafeRouters = lazy(() => import("./pages/SafeRouters.jsx"));
const UploadVideo = lazy(() => import("./pages/UploadVideo.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const MyProfile = lazy(() => import("./pages/MyProfile.jsx"));
const VideoPlaylist = lazy(() => import("./pages/Playlist.jsx"));
const PlaylistVideos = lazy(() => import("./pages/PlaylistVideos.jsx"));
const Subscription = lazy(() => import("./pages/Subscription.jsx"));
const UpdateProfile = lazy(() => import("./components/UpdateProfile.jsx"));
const LikedVideos = lazy(() => import("./pages/LikedVideos.jsx"));
const WatchHistory = lazy(() => import("./pages/WatchHistory.jsx"));
const WatchLaterVideos = lazy(() => import("./pages/WatchLater.jsx"));
const Signin = lazy(() => import("./pages/SignIn.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/play-video/:videoId" element={<PlayVideo />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signin" element={<SafeRouters />}>
        <Route path="upload-video" element={<UploadVideo />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="user-profile/:userId" element={<MyProfile />} />
        <Route path="video-play-lists/:userId" element={<VideoPlaylist />} />
        <Route
          path="playlist-videos/:playlistId"
          element={<PlaylistVideos />}
        />
        <Route path="subscription-status/:userId" element={<Subscription />} />
        <Route
          path="settings/customize-profile/:userId"
          element={<UpdateProfile />}
        />
        <Route path="all-favourate-videos/:userId" element={<LikedVideos />} />
        <Route path="watch-history/:userId" element={<WatchHistory />} />
        <Route
          path="watch-later-videos/:userId"
          element={<WatchLaterVideos />}
        />
      </Route>
    </Route>
  )
);
const client = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={client}>
      <Suspense fallback={<Skeleton />}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  </Provider>
);
