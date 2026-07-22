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
    <div className={`relative z-0 min-h-[75vh] h-[100svh] grid mx-auto ${styles.parallax}`}>
      
      <div className={`z-10 ${styles.hero}`}>
        <div className="wrapper">
         
        </div>
      </div>

      <img className={`z-[1] w-full ${styles['parallax-bg']}`} src="hero/bg.webp" alt="" />
      <img className={`z-[3] ${styles['parallax-beam']}`} src="hero/beam.webp" alt="" />
      <img className={`z-[4] ${styles['parallax-bauml']}`} src="hero/baum_l.webp" alt="" />
       <h1 className={`z-[3] text-8xl w-full text-center top-[30%] absolute leading-none italic text-white font-black  ${styles.heroTitle}`}>
            
           Moderne Waldarbeit.
          </h1>
      <img className={`z-[5] ${styles['parallax-baumr']}`} src="hero/baum_r.webp" alt="" />
      <img className={`z-[999] self-end ${styles['parallax-foreground-back']}`} src="hero/foreground-back.webp" alt="" />
      <img className={`z-[999] self-end ${styles['parallax-foreground-front']}`} src="hero/foreground-front.webp" alt="" />
      <img className={`z-[6] ${styles['parallax-klaus']}`} src="hero/klaus.webp" alt="" />

    </div>
  );
}





