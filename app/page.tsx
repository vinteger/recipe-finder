export default function Home() {
    return (
        <main className="min-h-screen bg-sky-blue flex justify-center pt-6">
          <div className="flex flex-col gap-2">
            <input type="text" className="rounded border-prussian-blue"/>
            <button className="rounded bg-blue-300 border-solid border-2 border-prussian-blue text-prussian-blue hover:bg-sky-blue">Search</button>
          </div>

        </main>
    );
}
