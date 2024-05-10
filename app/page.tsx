import React from "react";
import LandingPage from "@/components/LandingPage";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Recipe Finder',
    description: 'A simple recipe finder app',
}

export default function Home() {

    return (
        <main className="min-h-screen bg-sky-blue p-6">
            <LandingPage/>
        </main>
    );
}
