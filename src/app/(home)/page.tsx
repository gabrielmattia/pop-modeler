import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <form
        action={async () => {
          "use server";
          return redirect("/login");
          // const session = await auth();

          // if (!session.userId) {
          //   return redirect("/sign-in");
          // }

          // return redirect("/drive");
        }}
      >
        <Button
          size="lg"
          type="submit"
          className="border border-neutral-700 bg-neutral-800 text-white transition-colors hover:bg-neutral-700"
        >
          Get Started
        </Button>
      </form>
    </main>
  );
}
