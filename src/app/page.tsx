"use client";

import HomeView from "@/views/home/HomeView";
import { initialNotes } from "@/data/initialData";

export default function Home() {
  return <HomeView notes={initialNotes} />;
}
