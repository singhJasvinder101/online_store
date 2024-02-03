
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders sectionHeaders={"Our Story"} sectionSubHeaders={"About Us"} />
        <div className="text-gray-500 max-w-2xl md:max-w-full mx-auto mt-4 flex flex-col gap-4">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur in minus, molestiae reiciendis consectetur recusandae quam nostrum ullam voluptate possimus quis tempore rem doloribus ea quas beatae, dignissimos nihil modi repudiandae. Libero?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur in minus, molestiae reiciendis consectetur recusandae quam nostrum ullam voluptate possimus quis tempore rem doloribus ea quas beatae, dignissimos nihil modi repudiandae. Libero?</p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          sectionHeaders={"Don't hesitate"}
          sectionSubHeaders={'Contact us'}
        />
        <div className="mt-8">
          <a className="text-2xl text-black" href="tel:+46738123123">
            +46 738 123 123
          </a>
        </div>
      </section>
    </main>
  )
}
