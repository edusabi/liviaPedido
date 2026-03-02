import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Posts.module.css";
import EmojiPicker from 'emoji-picker-react';
// IMPORTAR O NOVO FUNDO
import GalaxyBackground3 from "../../components/GalaxyBackground3/GalaxyBackground3";

const Posts = () => {
  const [autorAtual, setAutorAtual] = useState("Lívia");
  const [novoPost, setNovoPost] = useState("");
  const [mostrarEmoji, setMostrarEmoji] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const [posts, setPosts] = useState(() => {
    const dadosSalvos = localStorage.getItem("nossas_memorias_posts");
    if (dadosSalvos) {
      return JSON.parse(dadosSalvos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("nossas_memorias_posts", JSON.stringify(posts));
  }, [posts]);

  // --- FUNÇÕES DE CRIAÇÃO ---
  const onEmojiClick = (emojiObject) => {
    setNovoPost((prevInput) => prevInput + emojiObject.emoji);
  };

  const handlePublicar = () => {
    if (novoPost.trim() === "") return;

    const novoItem = {
      id: Date.now(),
      autor: autorAtual,
      texto: novoPost,
      data: new Date().toLocaleDateString('pt-BR'),
      foto: autorAtual === "Eduardo" 
        ? "./fotoEduardo.jpeg"
        : "./liviaPhoto2.jpg",
    };

    setPosts([novoItem, ...posts]);
    setNovoPost("");
    setMostrarEmoji(false);
  };

  const handleDelete = (id) => {
    const confirmar = window.confirm("Tem certeza que quer apagar essa memória?");
    if (confirmar) {
      const novaLista = posts.filter((post) => post.id !== id);
      setPosts(novaLista);
    }
  };

  const startEditing = (post) => {
    setEditingId(post.id);
    setEditText(post.texto);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = (id) => {
    const novaLista = posts.map((post) => {
      if (post.id === id) {
        return { ...post, texto: editText };
      }
      return post;
    });
    setPosts(novaLista);
    setEditingId(null);
  };

  return (
    <div className={styles.postsContainer}>
      
      {/* ADICIONAR O BACKGROUND AQUI */}
      <GalaxyBackground3 />
      
      {/* Envolver o conteúdo num wrapper relativo para ficar por cima do canvas */}
      <div style={{ position: 'relative', zIndex: 1 }}>
          <Navbar />
          
          <div className={styles.contentWrapper}>
            <h2 className={styles.title}>Mural de Memórias ❤️</h2>

            {/* Seletor */}
            <div className={styles.userSelector}>
              <span className={styles.label}>Quem está escrevendo?</span>
              <div className={styles.buttonsWrapper}>
                <button 
                  className={`${styles.toggleBtn} ${autorAtual === "Lívia" ? styles.activeLivia : ""}`} 
                  onClick={() => setAutorAtual("Lívia")}
                >
                  👩 Lívia
                </button>
                <button 
                  className={`${styles.toggleBtn} ${autorAtual === "Eduardo" ? styles.activeEduardo : ""}`} 
                  onClick={() => setAutorAtual("Eduardo")}
                >
                  👨 Eduardo
                </button>
              </div>
            </div>

            {/* Criar Post */}
            <div className={styles.createPost}>
              <textarea
                className={styles.textArea}
                placeholder={`Escreva algo especial, ${autorAtual}...`}
                value={novoPost}
                onChange={(e) => setNovoPost(e.target.value)}
                onClick={() => setMostrarEmoji(false)} 
              />
              
              <div className={styles.actionsBar}>
                <button 
                  className={styles.emojiBtn} 
                  onClick={() => setMostrarEmoji(!mostrarEmoji)}
                  title="Adicionar Emoji"
                >
                  😊
                </button>

                <button onClick={handlePublicar} className={styles.publishBtn}>
                  Publicar
                </button>
              </div>

              {mostrarEmoji && (
                <div className={styles.emojiPickerContainer}>
                  <EmojiPicker 
                    onEmojiClick={onEmojiClick}
                    theme="dark"
                    searchDisabled={false}
                    width="100%"
                    height={350}
                  />
                </div>
              )}
            </div>

            {/* Lista de Posts */}
            <div className={styles.feed}>
              {posts.map((post) => (
                <div 
                  key={post.id} 
                  className={`${styles.postCard} ${post.autor === "Lívia" ? styles.cardLivia : styles.cardEduardo}`}
                >
                  <div className={styles.postHeader}>
                    <img src={post.foto} alt={post.autor} className={styles.avatar} />
                    <div className={styles.postInfo}>
                      <span className={styles.authorName}>{post.autor}</span>
                      <span className={styles.postDate}>{post.data}</span>
                    </div>
                  </div>

                  {editingId === post.id ? (
                    <div className={styles.editContainer}>
                      <textarea 
                        className={styles.editTextArea}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <div className={styles.editButtons}>
                        <button onClick={cancelEdit} className={styles.cancelBtn}>Cancelar</button>
                        <button onClick={() => saveEdit(post.id)} className={styles.saveBtn}>Salvar</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className={styles.postContent}>{post.texto}</p>
                      
                      <div className={styles.postActions}>
                        <button 
                          className={styles.actionBtn} 
                          onClick={() => startEditing(post)}
                          title="Editar Post"
                        >
                          ✏️ Editar
                        </button>
                        <button 
                          className={`${styles.actionBtn} ${styles.deleteBtn}`} 
                          onClick={() => handleDelete(post.id)}
                          title="Excluir Post"
                        >
                          🗑️ Excluir
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {posts.length === 0 && (
                <p style={{textAlign: "center", color: "#aaa", marginTop: "20px"}}>
                  Nenhuma memória postada ainda...
                </p>
              )}
            </div>
          </div>
      </div>
    </div>
  );
};

export default Posts;