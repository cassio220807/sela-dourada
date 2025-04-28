document.getElementById('formCadastro').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const dados = {
      valor: parseFloat(form.valor.value),
      raca: form.raca.value,
      data_nascimento: form.idade.value,
      tamanho: parseFloat(form.tamanho.value),
      peso: parseFloat(form.peso.value),
      pelagem_cor: form.pelagem.value,
      sexo: form.sexo.value === 'Masculino' ? 'Macho' : 'Fêmea',
      numero_registro: form.cavregis.value,
      localizacao: form.localizacao.value,
    };

    const fotos = form.fotos.files;
    if (fotos.length > 0) {
      dados.fotos = [];
      for (const foto of fotos) {
        dados.fotos.push(foto);
      }
    }

    try {
      const resposta = await fetch('http://localhost:3000/cavalo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        alert('Cavalo cadastrado com sucesso! ID: ' + resultado.id);
        form.reset();
      } else {
        alert('Erro ao cadastrar cavalo: ' + resultado.message);
      }
    } catch (erro) {
      console.error('Erro na conexão com o backend:', erro);
      alert('Erro ao conectar com o servidor.');
    }
  });