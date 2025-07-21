// app/about/page.tsx
export const metadata = {
	title: "About | Jokebites",
};

export default function AboutPage() {
	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold">About Jokebites</h1>
			<p className="mt-2">
				Jokebites is a platform to create and share fun jokes. Built with
				Next.js 15.
			</p>
		</div>
	);
}
