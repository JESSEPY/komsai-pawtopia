const SectionContainer = ({ children }) => {
  return (
    <section
      className="rounded-3xl border-8 bg-sectionBg shadow-stroke h-auto container mx-20"
      style={{
        borderColor: "rgba(255, 255, 255, 0.30)",
      }}
    >
      {children}
    </section>
  );
};

export default SectionContainer;
