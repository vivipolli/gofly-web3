"use client"

import Link from "next/link";
import Header from "./components/header";
import { useReadContract } from "wagmi";
import { factoryConfig } from "./web3/factoryConfig";
import { useEffect } from "react";


export default function Home() {
	const { data, error } = useReadContract({
		abi: factoryConfig.abi,
		address: factoryConfig.address as any,
		functionName: 'getDeployedCampaigns',
	});

	useEffect(() => {
		console.log(error);
	},[data, error])

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Header />
			<section className="relative">
				<div className="px-4 pt-10 mx-auto max-w-7xl md:pt-16">
					<div className="w-full pb-5 mx-auto text-center md:w-11/12">
						<h1 className="mb-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl">
							Bringing creative
							<br />
							<span className="text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 dark:from-pink-500 dark:via-purple-400 dark:to-indigo-500">
								projects to the real world
							</span>
						</h1>
						<p className="max-w-xl pt-5 mx-auto text-lg text-gray-600 dark:text-gray-400 md:text-lg">
							Welcome to our project creation platform, where your ideas come to
							life with the support of our vibrant community. Raise funds, bring
							your project to completion, and reward your backers with exclusive
							products and perks. Join us and turn your vision into reality,
							connecting creativity with those who believe in it!
						</p>
						<div className="mt-6 text-center md:ml-6">
							<br className="sm:hidden" />
							<Link href="404">
								<span
									className="inline-flex items-center px-5 py-3 mt-2 ml-0 text-sm font-medium text-purple-700 uppercase transition duration-300 border rounded shadow hover:border-purple-500 hover:shadow-md md:ml-2 dark:text-purple-300"
									aria-label="learn more">
									<span className="flex justify-center">Create a Campaign</span>
								</span>
							</Link>
						</div>
					</div>
					<div className="relative w-full py-10 mx-auto text-center md:py-32 md:my-12 md:w-10/12">
						<p className="z-10 my-8 text-sm font-medium text-gray-500">
							Maybe we&apos;re bringing brightness too?
						</p>
					</div>
				</div>
				{/* <div
          style={{ backgroundImage: "url(/images/blur.png)" }}
          className="absolute inset-0 w-full h-full bg-bottom bg-no-repeat bg-cover -z-1"
        /> */}
			</section>
			{/* <Features />
			<Footer /> */}
		</main>
	);
}
