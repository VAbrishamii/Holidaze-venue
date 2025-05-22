"use client";
import RouteLoaderListener from "@/component/layout/RouteLoaderListener";
import PageLoader from "@/component/ui/PageLoader";
import { useLoader } from "@/context/LoaderContext";

/**
 * ClientWrapper runs client-side logic like loading listeners and conditional loaders.
 * Keeps layout.tsx as a server component.
 */
export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useLoader();

  return (
    <>
      <RouteLoaderListener />
      {loading && <PageLoader />}
      {children}
    </>
  );
}
