import { useEffect } from "react";
import style from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Se já clicou antes, pula direto para InitialPage
  useEffect(() => {
    const alreadyVisited = localStorage.getItem("visitedInitialPage");

    if (alreadyVisited) {
      navigate("/initialPage", { replace: true });
    }
  }, [navigate]);

  // Criação dos corações
  useEffect(() => {
    const container = document.querySelector(`.${style.hearts}`);
    if (!container) return;

    const createHeart = () => {
      const heart = document.createElement("span");
      heart.className = style.heart;
      heart.innerHTML = "❤️";

      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = Math.random() * 20 + 15 + "px";
      heart.style.animationDuration = Math.random() * 3 + 3 + "s";

      container.appendChild(heart);

      setTimeout(() => heart.remove(), 6000);
    };

    const interval = setInterval(createHeart, 300);

    return () => clearInterval(interval);
  }, []);

  const navigateFromPageInitial = () => {
    localStorage.setItem("visitedInitialPage", "true");
    localStorage.setItem("relationshipStart", new Date().toISOString());
    navigate("/initialPage", { replace: true });
  };

  return (
    <div className={style.container}>
      <div className={style.hearts}></div>

      <button className={style.button} onClick={navigateFromPageInitial}>
        Clique aqui
      </button>
    </div>
  );
};

export default Home;
