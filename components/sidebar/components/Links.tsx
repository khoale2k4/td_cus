"use client"
import React, { MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { motion, Variants } from "framer-motion";
import DashIcon from "@/components/icons/DashIcon";
import routes from "@/data/routes";
import { FormattedMessage, useIntl } from "react-intl";

type Props = {
  onClickRoute?: (e: MouseEvent<HTMLElement>) => any | any
}

const linkVariants: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
};

export function SidebarLinks({ onClickRoute }: Props) {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const intl = useIntl()
  useEffect(() => {
    const findActiveRouteIndex = () => {
      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        if (route.layout && route.path && pathname.includes(route.path)) {
          return i;
        }
      }
      return null;
    };

    setActiveIndex(findActiveRouteIndex());
  }, [pathname]);

  const handleRouteClick = (index: number, e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    setActiveIndex(index);
    if (onClickRoute) {
      onClickRoute(e);
    }
  };

  const createLinks = (routes: any) => {
    const toolRoutes = routes.filter((route: { path: string; }) => route.path === "orders");
    const managementRoutes = routes.filter((route: { path: string; }) => route.path !== "orders");

    return (
      <>
        <div className="mb-4">
          <p className={`${activeIndex != null && activeIndex < toolRoutes.length ? "" : "text-gray-600"} font-semibold mb-2 pl-5`}><FormattedMessage id="routes.orders2" /></p>
          {toolRoutes.map((route: any, index: number) => (
            <Link key={`tool-${index}`} href={route.path} onClick={(e) => handleRouteClick(index, e)}>
              <motion.div
                variants={linkVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="relative mb-3 flex hover:cursor-pointer"
              >
                <li
                  className="my-[3px] flex cursor-pointer items-center px-8"
                >
                  <span
                    className={`${activeIndex === index
                      ? "font-bold text-red-500 dark:text-white"
                      : "font-medium text-gray-600"
                      }`}
                  >
                    {route.icon ? route.icon : <DashIcon />}{" "}
                  </span>
                  <p
                    className={`leading-1 ml-4 flex ${activeIndex === index
                      ? "font-medium text-red-500 dark:text-white"
                      : "font-medium text-gray-600"
                      }`}
                  >
                    {intl.formatMessage({ id: `routes.${route.path}` })}
                  </p>
                </li>
                {activeIndex === index && (
                  <motion.div
                    className="absolute right-0 -top-0.5 h-9 w-1 rounded-lg bg-red-500 dark:bg-red-500"
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 * index }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </div>
        <div>
          <p className={`${activeIndex != null && activeIndex >= toolRoutes.length ? "" : "text-gray-600"} font-semibold mb-2 pl-5 pt-2`}><FormattedMessage id="routes.manage" /></p>
          {managementRoutes.map((route: any, index: number) => {
            const managementIndex = index + toolRoutes.length;
            return (
              <Link key={`management-${index}`} href={route.path} onClick={(e) => handleRouteClick(managementIndex, e)}>
                <motion.div
                  variants={linkVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.3, delay: 0.1 * (managementIndex) }}
                  className="relative mb-3 flex hover:cursor-pointer"
                >
                  <li
                    className="my-[3px] flex cursor-pointer items-center px-8"
                  >
                    <span
                      className={`${activeIndex === managementIndex
                        ? "font-medium text-red-500 dark:text-white"
                        : "font-medium text-gray-600"
                        }`}
                    >
                      {route.icon ? route.icon : <DashIcon />}{" "}
                    </span>
                    <p
                      className={`leading-1 ml-4 flex ${activeIndex === managementIndex
                        ? "font-medium text-red-500 dark:text-white"
                        : "font-medium text-gray-600"
                        }`}
                    >
                      {intl.formatMessage({ id: `routes.${route.path}` })}
                    </p>
                  </li>
                  {activeIndex === managementIndex && (
                    <motion.div
                      className="absolute right-0 -top-0.5 h-9 w-1 rounded-lg bg-red-500 dark:bg-red-500"
                      initial={{ x: "100%", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "-100%", opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 * (managementIndex) }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </>
    );
  };

  return createLinks(routes);
}

export default SidebarLinks;
