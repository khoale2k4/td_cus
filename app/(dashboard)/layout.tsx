"use client";
import "@/app/globals.css";
import "@/components/calendar/MiniCalendar.css";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import SidebarProvider from "@/providers/SidebarProvider";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import MapExport from "./tasks/component/MapExport";
import { CollapseContext } from "./tasks/context/CollapseContext";
import { DestinationContext } from "./tasks/context/DestinationContext";
import { DistanceContext } from "./tasks/context/DistanceContext";
import { SourceContext } from "./tasks/context/SourceContext";
import PassDataProvider from "@/providers/PassedData";
const RootStructure = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(0);
  const route = useRouter();
  useEffect(() => {
    // const fetchData = async () => {
    //   const loggedIn2 = await user.checkUserLoggedIn();
    //   if (!loggedIn2) route.push("/");
    // };
    // fetchData();
  }, []);
  return (
    <>
      {/* {loggedIn ? */}
      <>
        {/* @ts-ignore */}
        <DistanceContext.Provider value={{ distance, setDistance }}>
          {/* @ts-ignore */}
          <CollapseContext.Provider value={{ isCollapsed, setIsCollapsed }}>
            {/* @ts-ignore */}
            <SourceContext.Provider value={{ source, setSource }}>
              {/* @ts-ignore */}
              <DestinationContext.Provider value={{ destination, setDestination }} >
                <PassDataProvider>
                  <SidebarProvider>
                    <section className="flex h-full w-full">
                      <Sidebar />

                      {/* Navbar & Main Content */}
                      <div className="h-full w-full bg-lightPrimary dark:!bg-[#3a3b3c]">
                        {/* Main Content */}
                        {pathname != "/tasks" ? (
                          <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
                            {/* Routes */}
                            <div className="h-full">
                              <Navbar />
                              <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                                {children}
                              </div>
                            </div>
                          </main>
                        ) : (
                          <main className="relative mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
                            {/* Routes */}
                            <div className="h-full">
                              <Navbar />

                              <div className="pt-5s mx-auto mb-auto pt-2 md:pr-2">
                                {children}
                              </div>
                            </div>
                            <div className="absolute h-[calc(100dvh)] w-screen xl:w-[calc(100vw-250px)] top-0 -left-[12px] xl:-left-[63px]">
                              <MapExport />
                            </div>
                          </main>
                        )}
                      </div>
                    </section>
                  </SidebarProvider>
                </PassDataProvider >
              </DestinationContext.Provider>
            </SourceContext.Provider>
          </CollapseContext.Provider>
        </DistanceContext.Provider>
      </>
      {/* : <CustomLoadingElement2 />
      } */}
    </>
  );
};

export default RootStructure;
