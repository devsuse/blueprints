import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Command } from "@/components/docs/ui/command";
import { source } from "@/lib/docs/source";

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const page = source.getPage(slug);
  if (!page) {
    notFound();
  }

  return {
    description: page.data.description,
    title: page.data.title,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;

  const page = source.getPage(slug);
  if (!page) {
    notFound();
  }

  // const raw = await page.data.getText("processed");

  const MDX = page.data.body;

  return (
    <main className="space-y-4">
      <Command />
      <header>
        <h1 className="font-medium text-3xl">{page.data.title}</h1>
        <p>{page.data.description}</p>
      </header>

      <section>
        <MDX />
      </section>
    </main>
  );
}
