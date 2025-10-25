"use client";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { useRouter, useSearchParams, usePathname } from "next/navigation"; // Import hooks

export default function PaginationCardControls({ pageData }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { number: currentPage, totalPages } = pageData;

  const goToPage = async (page) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const renderButton = (page, label = page + 1, isActive = false) => (
    <Button
      onClick={() => goToPage(page)}
      key={`page-${page}`}
      variant={isActive ? "default" : "secondary"}
      className={"cursor-pointer"}
    >
      {label}
    </Button>
  );

  const renderEllipsis = (key) => (
    <span key={key} className="bg-accent pl-2 pr-2">
      ...
    </span>
  );

  const getPageRange = () => {
    const isFirstSection = currentPage === 0 && totalPages > 10;
    const isLastSection = totalPages - currentPage <= 10 && totalPages > 10;
    const lessThanorEqual10pages = totalPages <= 10;
    console.log(isFirstSection);
    console.log(isLastSection);
    console.log(lessThanorEqual10pages);

    if (isFirstSection) {
      // First 9 pages
      return {
        showFirstButton: false,
        showFirstEllipsis: false,
        rangeStart: 0,
        rangeCount: 9,
        showLastEllipsis: true,
        showLastButton: true,
      };
    }

    if (isLastSection) {
      // Last 11 pages
      return {
        showFirstButton: true,
        showFirstEllipsis: true,
        rangeStart: totalPages - 11,
        rangeCount: 11,
        showLastEllipsis: false,
        showLastButton: false,
      };
    }

    if (lessThanorEqual10pages) {
      console.log(totalPages);
      console.log(currentPage);

      return {
        showFirstButton: false,
        showFirstEllipsis: false,
        rangeStart: 0,
        rangeCount: totalPages,
        showLastEllipsis: false,
        showLastButton: false,
      };
    }

    return {
      showFirstButton: true,
      showFirstEllipsis: true,
      rangeStart: currentPage,
      rangeCount: 9,
      showLastEllipsis: true,
      showLastButton: true,
    };
  };

  const range = getPageRange();
  return (
    <div className="flex items-center justify-center bg-card px-3 py-2 rounded-2xl">
      <ButtonGroup className="rounded-2xl text-2xl">
        {range.showFirstButton && renderButton(0, 1)}
        {range.showFirstEllipsis && renderEllipsis("first-ellipsis")}
        {Array.from({ length: range.rangeCount }, (_, i) => {
          const page = range.rangeStart + i;
          return renderButton(page, page + 1, page === currentPage);
        })}
        {range.showLastEllipsis && renderEllipsis("last-ellipsis")}
        {range.showLastButton && renderButton(totalPages - 1, totalPages)}
      </ButtonGroup>
    </div>
  );
}
