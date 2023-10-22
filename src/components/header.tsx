import { useLocation } from "wouter";
import { usePathname } from "wouter/use-location";

import { pageHeaderMap, pageList } from "../utils/utils";

export const Header = () => {
  const [, navigate] = useLocation();
  const pathName = usePathname().substring(1).split("/")[0];
  const headerLabel =
    pathName in pageHeaderMap ? pageHeaderMap[pathName] : null;

  const currPageIdx = pageList.findIndex((page) => page === pathName);
  const hasPreviousPage = currPageIdx - 1 >= 0;
  const hasNextPage = currPageIdx + 1 < pageList.length;

  const goToPage = (type: "forward" | "backward") => () => {
    const newPageIdx = currPageIdx + (type === "forward" ? 1 : -1);
    const page = pageList[newPageIdx];
    navigate("/" + page);
  };

  if (!headerLabel) return null;

  return (
    <header className="is-flex p-4 is-justify-content-space-between">
      <button
        onClick={goToPage("backward")}
        disabled={!hasPreviousPage}
        className="button mr-6"
      >
        <i className="fa-solid fa-arrow-left" />
      </button>
      <h1 className="is-size-4 has-text-weight-bold mb-0">{headerLabel}</h1>
      <button
        onClick={goToPage("forward")}
        disabled={!hasNextPage}
        className="button ml-6"
      >
        <i className="fa-solid fa-arrow-right" />
      </button>
    </header>
  );
};
