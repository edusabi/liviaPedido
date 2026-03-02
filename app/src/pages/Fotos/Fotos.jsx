import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import style from "./Fotos.module.css";
// 1. IMPORTAR A GALÁXIA AQUI
import GalaxyBackground from "../../components/GalaxyBackground2/GalaxyBackground2"; 

const Fotos = () => {
  // Efeito para rolar para o topo ao abrir a página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const minhasFotos = [
    {
      id: 1,
      titulo: "Seu Olhar",
      descricao: "Eu amo a profundidade dos seus olhos, é onde eu me perco e me encontro ao mesmo tempo.",
      img: "/olhoLivia.jpeg" 
    },
    {
      id: 2,
      titulo: "Seu Sorriso",
      descricao: "Seu sorriso é a coisa mais linda do mundo e ilumina todos os meus dias.",
      img: "/sorriso.jpeg"
    },
    {
      id: 3,
      titulo: "Minha Cura", 
      descricao: "Seu beijo é a minha cura, ele tem o poder de fazer tudo ficar bem.",
      img: "/beijo.jpeg"
    },
    {
      id: 4,
      titulo: "Minha Paz", 
      descricao: "Você é a minha paz. É ao seu lado que eu me sinto verdadeiramente seguro e protegido.",
      img: "/dormindo.jpeg"
    },
    {
      id: 5,
      titulo: "Suas Loucuras",
      descricao: "Amo cada detalhe do seu jeito, principalmente suas loucuras que fazem meus dias muito mais felizes e divertidos.",
      img: "/loucuras.jpeg" 
    }
  ];

  return (
    <div className={style.container}>
      
      {/* 2. COLOCAR O COMPONENTE AQUI (Primeira coisa dentro da div) */}
      <GalaxyBackground />

      {/* Como o GalaxyBackground tem position: fixed e z-index: -1, 
          ele vai ficar automaticamente atrás de tudo abaixo */}

      <Navbar />
      
      {/* Container do conteúdo com animação de entrada */}
      <div className={style.contentFadeIn}>
        
        <h1 className={style.title}>Por que eu te amo</h1>

        <div className={style.grid}>
          {minhasFotos.map((item) => (
            <div key={item.id} className={style.card}>
              
              <div className={style.imageWrapper}>
                <img src={item.img} alt={item.titulo} className={style.photo} />
              </div>

              <div className={style.info}>
                <h3 className={style.cardTitle}>{item.titulo}</h3>
                <p className={style.cardDesc}>{item.descricao}</p>
              </div>

            </div>
          ))}
        </div>

        <div className={style.videoSection}>
          <h2 className={style.videoTitle}>Nossos Momentos 🎥</h2>
          <p className={style.videoSubtitle}>Memórias em movimento</p>
          
          <div className={style.videoGrid}>
            <div className={style.videoCard}>
              <video controls className={style.videoPlayer}>
                <source src="/nosso_video.mp4" type="video/mp4" />
              </video>
            </div>
            <div className={style.videoCard}>
              <video controls className={style.videoPlayer}>
                <source src="/nosso_video2.mp4" type="video/mp4" />
              </video>
            </div>
            <div className={style.videoCard}>
              <video controls className={style.videoPlayer}>
                <source src="/nosso_video3.mp4" type="video/mp4" />
              </video>
            </div>
            <div className={style.videoCard}>
              <video controls className={style.videoPlayer}>
                <source src="/nosso_video4.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Fotos;