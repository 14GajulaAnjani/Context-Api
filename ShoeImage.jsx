// Shows the shoe image. If the file is missing, shows a grey box.
const fallback =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='220'><rect width='100%' height='100%' fill='#dfe4ea'/><text x='50%' y='50%' text-anchor='middle' fill='#6b7787' font-family='sans-serif' font-size='16'>Add image</text></svg>`
  );

export default function ShoeImage({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = fallback;
      }}
    />
  );
}