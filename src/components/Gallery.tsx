const Gallery = () => {
  const images = [
    "",
    "",
    "",
    "",
    "",
    "",
  ];

  return (
    <section
      id="gallery"
      style={{
        padding: "80px 0",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <h2
          style={{
            fontSize: "48px",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: "16px",
            background: "linear-gradient(135deg, #0f1b2d 0%, #667eea 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Наши работы
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            color: "#64748b",
            marginBottom: "60px",
          }}
        >
          Более 500 выполненных проектов по всей России
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                aspectRatio: "4/3",
              }}
            >
              {img ? (
                <img
                  src={img}
                  alt={`Работа ${i + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    opacity: 0.3,
                  }}
                >
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
