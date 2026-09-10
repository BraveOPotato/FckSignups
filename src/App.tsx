import { useState } from "react";
import { Footer } from "./components/Home/Footer/Footer";
import { Header } from "./components/Home/Header/Header";
import { ReportFloatingWidget } from "./components/Home/ReportFloatingWidget/ReportFloatingWidget";
import { ToolFilters } from "./components/Home/ToolFilters/ToolFilters";
import { Tools } from "./components/Home/Tools/Tools";
import { ScrollToTopButton } from "./components/Shared/Buttons/ScrollToTopButton/ScrollToTopButton";
import SkipContentLink from "./components/Shared/Links/SkipContentLink/SkipContentLink";
import { MODAL_CONFIGS } from "./constants/ModalConfigs";
import { ModalProvider } from "./hooks/useModal";
import { ReportProvider } from "./hooks/useReport";
import { useTools } from "./hooks/useTools";
import type { SortOption } from "./types";

export default function App() {
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const {
    tools,
    filteredTools,
    sections,
    searchKeywords,
    isSearching,
    categories,
    loadStatus,
    errorMessage,
    searchQuery,
    activeCategory,
    setSearchQuery,
    setActiveCategory,
  } = useTools();

  const activeCat = categories.find((c) => c.id === activeCategory);

  return (
    <div className="container">
      <ModalProvider modalConfigs={MODAL_CONFIGS}>
        <SkipContentLink />
        <Header
          toolCount={tools.length}
          categoryCount={Math.max(0, categories.length - 1)}
          setSearchQuery={setSearchQuery}
        />

        <ToolFilters
          categories={categories}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          allTools={tools}
          filteredCount={filteredTools.length}
          sortBy={sortBy}
          onCategoryChange={setActiveCategory}
          onSearchChange={setSearchQuery}
          onSortChange={setSortBy}
        />
        {activeCat && activeCat.id !== "all" && (
          <div className="section-divider">
            {`${activeCat.icon} ${activeCat.name}`}
          </div>
        )}

        <ReportProvider>
          <Tools
            sections={sections}
            searchKeywords={searchKeywords}
            isSearching={isSearching}
            categories={categories}
            loadStatus={loadStatus}
            errorMessage={errorMessage}
            searchQuery={searchQuery}
            activeCategory={activeCategory}
            sortBy={sortBy}
            setSearchQuery={setSearchQuery}
          />

          <ReportFloatingWidget />
        </ReportProvider>
        <ScrollToTopButton />
        <Footer />
      </ModalProvider>
    </div>
  );
}
