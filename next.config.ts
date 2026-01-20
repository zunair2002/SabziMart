import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  // jab google image dyta tu usy config krna prhta
  images:{
    remotePatterns:[
      {hostname:'lh3.googleusercontent.com'}
    ]
  }
};

export default nextConfig;
