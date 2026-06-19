import { Header } from "./components/Header";
import { MarqueeStrip } from "./components/MarqueeStrip";
import { Controls } from "./components/Controls";
import { ToolGrid } from "./components/ToolGrid";
import { Footer } from "./components/Footer";
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
      <Header
        toolCount={tools.length}
        categoryCount={Math.max(0, categories.length - 1)}
      />

      <MarqueeStrip />

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

      <ToolGrid
        tools={filteredTools}
        categories={categories}
        loadStatus={loadStatus}
        errorMessage={errorMessage}
        setSearchQuery={setSearchQuery}
      />

      <Footer />
    </>
  );
}
