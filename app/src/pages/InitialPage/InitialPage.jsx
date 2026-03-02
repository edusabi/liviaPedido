import { useEffect, useState } from "react";
import style from "./InitialPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import GalaxyBackground from "../../components/GalaxyBackground/GalaxyBackground";

const InitialPage = () => {
  const [timeTogether, setTimeTogether] = useState(null);

  useEffect(() => {
    const startDate = localStorage.getItem("relationshipStart");
    if (!startDate) return;

    const start = new Date(startDate);

    const updateTime = () => {
      const now = new Date();

      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();
      let hours = now.getHours() - start.getHours();
      let minutes = now.getMinutes() - start.getMinutes();
      let seconds = now.getSeconds() - start.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        const lastMonth = new Date(
          now.getFullYear(),
          now.getMonth(),
          0
        ).getDate();
        days += lastMonth;
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      setTimeTogether({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeTogether) return null;

  return (
    <div className={style.page}>
      {/* BACKGROUND SEMPRE PRIMEIRO */}
      <GalaxyBackground />

      {/* CONTEÚDO */}
      <Navbar />

      <div className={style.container}>
        <h1 className={style.title}>Estamos namorando há</h1>

        <div className={style.timerGrid}>
          {/* Bloco de Anos */}
          <div className={style.timeCard}>
            <span className={style.number}>{timeTogether.years}</span>
            <span className={style.label}>Anos</span>
          </div>

          {/* Bloco de Meses */}
          <div className={style.timeCard}>
            <span className={style.number}>{timeTogether.months}</span>
            <span className={style.label}>Meses</span>
          </div>

          {/* Bloco de Dias */}
          <div className={style.timeCard}>
            <span className={style.number}>{timeTogether.days}</span>
            <span className={style.label}>Dias</span>
          </div>

          {/* Bloco de Horas */}
          <div className={style.timeCard}>
            <span className={style.number}>{timeTogether.hours}</span>
            <span className={style.label}>Horas</span>
          </div>

          {/* Bloco de Minutos */}
          <div className={style.timeCard}>
            <span className={style.number}>{timeTogether.minutes}</span>
            <span className={style.label}>Min</span>
          </div>

          {/* Bloco de Segundos */}
          <div className={style.timeCard}>
            <span className={style.number}>{timeTogether.seconds}</span>
            <span className={style.label}>Seg</span>
          </div>
        </div>

        <div className={style.footer}>E contando... ❤️</div>
      </div>
    </div>
  );
};

export default InitialPage;
