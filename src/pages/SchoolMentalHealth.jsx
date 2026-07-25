const SchoolMentalHealth = () => {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#F5F0E8", paddingTop: "120px", paddingBottom: "80px" }}
    >
      <div className="text-center px-6">
        <p
          className="font-body uppercase mb-6"
          style={{ fontSize: "10px", letterSpacing: "0.38em", color: "#8A9E85" }}
        >
          Selves & Spaces
        </p>
        <h1
          className="font-display leading-[0.88]"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#1C1C1A" }}
        >
          School<br />
          <em className="italic" style={{ color: "#2C3B2D" }}>Mental Health</em>
        </h1>
        <p
          className="font-body font-light mt-8 mx-auto"
          style={{ fontSize: "16px", color: "rgba(28,28,26,0.5)", lineHeight: 1.9, maxWidth: "480px" }}
        >
          This page is coming soon. We are building something meaningful for schools and young people.
        </p>
      </div>
    </main>
  );
};

export default SchoolMentalHealth;
