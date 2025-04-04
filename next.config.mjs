/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'hlppyilngpqwxfijkoab.supabase.co',
          pathname: '/storage/v1/object/public/avatar/**', // Specify the path pattern if needed
        },
      ],
    },
  };
  
  export default nextConfig;
  