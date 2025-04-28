async function carregarAnuncios() {
    try {
      const resposta = await fetch('http://localhost:3000/cavalo'); 
      const anuncios = await resposta.json();
      
      const container = document.getElementById('anuncios-container');
      container.innerHTML = '';
  
      anuncios.forEach(anuncio => {
        const anuncioCard = document.createElement('div');
        anuncioCard.classList.add('anuncio-card');
        anuncioCard.setAttribute('data-id', anuncio.id);
  
        let idade = 'Desconhecida';
        if (anuncio.data_nascimento) {
          const hoje = new Date();
          const nascimento = new Date(anuncio.data_nascimento);
          idade = hoje.getFullYear() - nascimento.getFullYear();
        }
  
        anuncioCard.innerHTML = `
          <img src="/imagens/cavalo1.jpg" alt="Cavalo Crioulo" class="anuncio-imagem">
          <div class="anuncio-info">
            <h2>${anuncio.raca} ${anuncio.pelagem_cor}</h2>
            <p><strong>Raça:</strong> ${anuncio.raca}</p>
            <p><strong>Idade:</strong> ${idade}</p>
            <p><strong>Valor:</strong> R$ ${anuncio.valor}</p>
            <p><strong>Localização:</strong> ${anuncio.localizacao}</p>
            <div class="botoes-anuncio">
              <button class="editar">Editar</button>
              <button class="deletar">Excluir</button>
            </div>
          </div>
        `;
  
        container.appendChild(anuncioCard);
      });
  
      adicionarEventosDeletar();
    } catch (error) {
      console.error('Erro ao carregar anúncios:', error);
    }
  }
  
  function adicionarEventosDeletar() {
    document.querySelectorAll('.deletar').forEach(button => {
      button.addEventListener('click', async function() {
        const anuncioId = this.closest('.anuncio-card').getAttribute('data-id');
        
        if (confirm('Tem certeza que deseja excluir este anúncio?')) {
          try {
            const resposta = await fetch(`http://localhost:3000/cavalo/${anuncioId}`, {
              method: 'DELETE',
            });
  
            const resultado = await resposta.json();
  
            if (resposta.ok) {
              alert('Anúncio excluído com sucesso!');
              this.closest('.anuncio-card').remove();
            } else {
              alert('Erro ao excluir o anúncio: ' + resultado.message);
            }
          } catch (error) {
            console.error('Erro de rede:', error);
            alert('Erro ao conectar com o servidor.');
          }
        }
      });
    });
  }
  
  window.addEventListener('load', carregarAnuncios);
  