"use client";
import "@/app/globals.css";
import "@/components/calendar/MiniCalendar.css";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import SidebarProvider from "@/providers/SidebarProvider";
import { usePathname } from "next/navigation";
import MapExport from "./orders/component/MapExport";
import CollapseProvider from "./orders/context/CollapseContext";
import PassDataProvider from "@/providers/PassedData";
import SourceProvider from "@/app/(dashboard)/orders/context/SourceContext";
import DestinationProvider from "@/app/(dashboard)/orders/context/DestinationContext";
import DistanceProvider from "@/app/(dashboard)/orders/context/DistanceContext";
import SettingProvider from "@/providers/SettingProvider";
const RootStructure = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      <DistanceProvider>
        <CollapseProvider>
          <SettingProvider>
            <PassDataProvider>
              <SidebarProvider>
                <SourceProvider>
                  <DestinationProvider>
                    <section className="flex h-full w-full">
                      <Sidebar />

                      {/* Navbar & Main Content */}
                      <div className="h-full w-full bg-lightPrimary dark:!bg-[#3a3b3c]">
                        {/* Main Content */}
                        {pathname != "/orders" ? (
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
                  </DestinationProvider>
                </SourceProvider>
              </SidebarProvider>
            </PassDataProvider >
          </SettingProvider>
        </CollapseProvider>
      </DistanceProvider>
    </>
  );
};

export default RootStructure;
