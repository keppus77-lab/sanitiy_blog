import styles from './HeroKlaus.module.css'






export default function HeroKlaus({
    title,
    description,
    categories = []
}: {
    title: string
    description?: any[]
    categories?: { title: string; slug: string }[] 
}) {
  return (
    <section className="bg-gradient-to-r from-green-800 via-green-700 to-emerald-800 text-white relative ">
    <div className={`max-w-7xl mx-auto relative z-0   h-[calc(100vh-76px)] grid ${styles.parallax}`}>
      
      

      <img className={`z-[0] w-full ${styles['parallax-l1']}`} src="hero/layer1.webp" alt="" />
         <h1 className={`z-[8] text-8xl w-full text-center bottom-[50%] absolute leading-none italic text-white font-black  ${styles['hero-title']}`}>
            
           Moderne Waldarbeit
          </h1>
      <img className={`z-[1] w-full ${styles['parallax-l2']}`} src="hero/layer2.webp" alt="" />
      <img className={`z-[2] w-full ${styles['parallax-l3']}`} src="hero/layer3.webp" alt="" />
      <img className={`z-[3] w-full ${styles['parallax-l4']}`} src="hero/layer4.webp" alt="" />
      <img className={`z-[4] ${styles['parallax-beam']}`} src="hero/beam.webp" alt="" />
      <img className={`z-[5] ${styles['parallax-bauml']}`} src="hero/baum_l.webp" alt="" />
    
      <img className={`z-[7] ${styles['parallax-baumr']}`} src="hero/baum_r.webp" alt="" />
      <img className={`z-[8] ${styles['parallax-klaus']}`} src="hero/klaus.webp" alt="" />
      <img className={`z-[999] self-end ${styles['parallax-foreground-back']}`} src="hero/foreground-back.webp" alt="" />
      <img className={`z-[999] self-end ${styles['parallax-foreground-front']}`} src="hero/foreground-front.webp" alt="" />
      <h2 className={`z-[8] text-8xl w-full text-center bottom-[-20%] absolute leading-none italic text-emerald-300  ${styles['hero-subtitle']}`}>
            
           Nachhaltig gedacht
          </h2>

    </div>
    </section>
  );
}





