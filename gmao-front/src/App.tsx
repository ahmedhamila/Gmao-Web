import { Toaster } from "@/components/ui/Toaster";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/shared/Sidebar";
import { useState, Fragment } from "react";
import { cn } from "./lib/utils";
import { useGetUserCredentialsQuery } from "@/redux/features/UserApiSlice.js";
import { useDispatch } from "react-redux";
import { updateCredentials } from '@/redux/features/UserSlice'
import ErrorPage from "./pages/ErrorPage";
function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const dispatch = useDispatch()
  const { data, error, isLoading, isSuccess } = useGetUserCredentialsQuery({
    Token: localStorage.getItem("Token"),
  });
  if (data) {
    console.log(data);
    dispatch(updateCredentials(data))
  }
  return (
    <Fragment>
      {isLoading ? (
        <div>...Loading</div>
      ) : data ? (
        <div>
          <ProSidebarProvider>
            <Sidebar
              isCollapsed={isSidebarCollapsed}
              CollapseSidebar={setIsSidebarCollapsed}
            />
          </ProSidebarProvider>
          <main
            className={cn(
              "w-full p-2 transition-all duration-200 h-full",
              isSidebarCollapsed ? "lg:pl-[5.5rem]" : "lg:pl-[300px]"
            )}
          >
            <Outlet />
          </main>
          <Toaster />
        </div>
      ) : (
        <ErrorPage />
      )}
    </Fragment>
  );
}

export default App;
