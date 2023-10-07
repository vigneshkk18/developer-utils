import { usePathname } from "wouter/use-location";
import { pageHeaderMap } from "../utils/utils";

export const Header = () => {
  const pathName = usePathname().substring(1);
  const headerLabel =
    pathName in pageHeaderMap ? pageHeaderMap[pathName] : null;

  if (!headerLabel) return null;

  return (
    <header className="is-flex py-4 is-justify-content-center">
      <button className="button mr-6">
        <i className="fa-solid fa-arrow-left" />
      </button>
      <h1 className="is-size-4 has-text-weight-bold mb-0">{headerLabel}</h1>
      <button className="button ml-6">
        <i className="fa-solid fa-arrow-right" />
      </button>
    </header>
  );
};
