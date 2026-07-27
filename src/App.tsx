import { useState } from "react";
import { Controls } from "./components/Controls";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Report } from "./components/Report";
import { ScrollToTopButton } from "./components/ScrollToTopButton";
import { ToolGrid } from "./components/ToolGrid";
import { MODAL_CONFIGS } from "./constants/ModalConfigs";
import { ModalProvider } from "./hooks/useModal";
import { ReportProvider } from "./hooks/useReport";
import { useTools } from "./hooks/useTools";

export default function App() {
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

  const [sortBy, setSortBy] = useState("default");

  const activeCat = categories.find((c) => c.id === activeCategory);

  return (
    <>
      <ModalProvider modalConfigs={MODAL_CONFIGS}>
        <Header
          toolCount={tools.length}
          categoryCount={Math.max(0, categories.length - 1)}
          setSearchQuery={setSearchQuery}
        />

        <Controls
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
          <ToolGrid
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

          <Report />
        </ReportProvider>

        <ScrollToTopButton />
        <Footer />
      </ModalProvider>
    </>
  );
}