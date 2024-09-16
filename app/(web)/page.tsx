import Hero from "@/components/home/Hero";
import Header from "@/components/shared/Header";


export default function Home() {
  return (
    <div className="mx-auto w-full overflow-hidden md:max-w-3xl">
      <Header/>
      <Hero/>
    </div>
  );
}
