import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import IndexPage from "./pages";
import MainLayout from "./layouts/main_layout";
import CreateNewPostPage from "./pages/post/new";
import PostPage from "./pages/post";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostDetailPage from "./pages/post/[id]";

function App() {
  const [queryClient, _] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<IndexPage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/post/new" element={<CreateNewPostPage />} />
            <Route path="/post/:id" element={<PostDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
