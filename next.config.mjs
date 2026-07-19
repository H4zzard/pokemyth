/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Placeholders locais são SVG identificados — seguro por serem assets próprios.
    // TODO: remover dangerouslyAllowSVG quando todos os assets forem imagens reais.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // TODO: adicionar domínios de imagens remotas (Supabase Storage, CDN do jogo) quando integrar
    remotePatterns: [],
  },
};

export default nextConfig;
