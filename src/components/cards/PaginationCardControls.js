"use client";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

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

  const handlePrevious = () => {
    if (currentPage > 0) goToPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) goToPage(currentPage + 1);
  };

  const renderButton = (page, label = page + 1, isActive = false) => (
    <Button
      onClick={() => goToPage(page)}
      key={`page-${page}`}
      variant={isActive ? "default" : "ghost"}
      size="sm"
      className={`
        min-w-[2.5rem] h-9 transition-all duration-200
        ${
          isActive
            ? "shadow-md scale-105 font-bold"
            : "hover:bg-accent hover:scale-105"
        }
      `}
    >
      {label}
    </Button>
  );

  const renderEllipsis = (key) => (
    <div
      key={key}
      className="flex items-center justify-center min-w-[2.5rem] h-9 text-muted-foreground"
    >
      <MoreHorizontal className="w-4 h-4" />
    </div>
  );

  const getPageRange = () => {
    const isFirstSection = currentPage === 0 && totalPages > 10;
    const isLastSection = totalPages - currentPage <= 10 && totalPages > 10;
    const lessThanOrEqual10Pages = totalPages <= 10;

    if (isFirstSection) {
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
      return {
        showFirstButton: true,
        showFirstEllipsis: true,
        rangeStart: totalPages - 11,
        rangeCount: 11,
        showLastEllipsis: false,
        showLastButton: false,
      };
    }

    if (lessThanOrEqual10Pages) {
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
    <div className="flex items-center justify-center gap-3 bg-card/50 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg border">
      {/* Previous Button */}
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 0}
        variant="ghost"
        size="sm"
        className="h-9 px-3 hover:bg-accent hover:scale-105 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      {/* Page Numbers */}
      <ButtonGroup className="rounded-xl shadow-sm border  overflow-hidden">
        {range.showFirstButton && renderButton(0, 1)}
        {range.showFirstEllipsis && renderEllipsis("first-ellipsis")}
        {Array.from({ length: range.rangeCount }, (_, i) => {
          const page = range.rangeStart + i;
          return renderButton(page, page + 1, page === currentPage);
        })}
        {range.showLastEllipsis && renderEllipsis("last-ellipsis")}
        {range.showLastButton && renderButton(totalPages - 1, totalPages)}
      </ButtonGroup>

      {/* Next Button */}
      <Button
        onClick={handleNext}
        disabled={currentPage >= totalPages - 1}
        variant="ghost"
        size="sm"
        className="h-9 px-3 hover:bg-accent hover:scale-105 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>

      {/* Page Info */}
      <div className="hidden md:flex items-center gap-2 ml-2 px-3 py-1.5 bg-accent/30 rounded-lg border ">
        <span className="text-sm font-medium">
          Page <span className="text-primary font-bold">{currentPage + 1}</span>
        </span>
        <span className="text-xs text-muted-foreground">of</span>
        <span className="text-sm font-medium text-muted-foreground">
          {totalPages}
        </span>
      </div>
    </div>
  );
}
