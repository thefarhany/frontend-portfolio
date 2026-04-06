import { useEffect } from "react";

export function useTitle(title: string) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | TheFarhany`;
    } else {
      document.title = "TheFarhany | Frontend Developer";
    }
  }, [title]);
}
