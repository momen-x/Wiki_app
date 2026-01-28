import Image from "next/image";
import cloud from "@/app/images/cloud&host.png";

// Force dynamic rendering to avoid prerendering issues
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center min-h-[calc(100vh-150px)] gap-8">
        <div className="flex-1">
          <h5 className="text-2xl font-bold mb-4">Cloud Hosting</h5>
          <p className="text-lg mb-6">
            The best web hosting solution for your online success
          </p>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <span>✔</span>
              Easy To Use Control Panel
            </p>
            <p className="flex items-center gap-2">
              <span>✔</span>
              Secure Hosting
            </p>
            <p className="flex items-center gap-2">
              <span>✔</span>
              Website Maintenance
            </p>
          </div>
        </div>

        <Image
          src={cloud}
          alt="cloud hosting photo"
          width={250}
          height={0}
          className="rounded-2xl"
          style={{ height: 'auto' }}
        />
      </div>
    </div>
  );
}
