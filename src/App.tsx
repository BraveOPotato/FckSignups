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
    categories,
    loadStatus,
    errorMessage,
    searchQuery,
    activeCategory,
    setSearchQuery,
    setActiveCategory,
  } = useTools();

  const activeCat = categories.find((c) => c.id === activeCategory);
  const sectionLabel =
    activeCat && activeCat.id !== "all"
      ? `${activeCat.icon} ${activeCat.name}`
      : "All Tools";

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
          onCategoryChange={setActiveCategory}
          onSearchChange={setSearchQuery}
        />
        <div className="section-divider">{sectionLabel}</div>

        <ReportProvider>
          <ToolGrid
            tools={filteredTools}
            categories={categories}
            loadStatus={loadStatus}
            errorMessage={errorMessage}
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
