
export default async function Home() {
  // const res = await fetch('https://api.freeapi.app/api/v1/public/books?page=1&limit=10&inc=kind%2Cid%2Cetag%2CvolumeInfo&query=tech');
  // const posts = await res.json();

  // console.log('====================================');
  // console.log(posts);
  // console.log('====================================');
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
            <p className="mt-4 text-lg">
                Get started by editing <code>app/page.tsx</code>
            </p>
          
        </div>
    );
}
