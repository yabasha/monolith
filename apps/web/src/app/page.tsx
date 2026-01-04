import { Button } from "@yabasha/ui/components/button";

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Monorepo Demo</h1>
      <Button variant="default">Click me</Button>
    </div>
  );
}
