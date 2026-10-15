# ENTRE TELAS — versão atual para continuar no Codex

Cópia da **versão publicada 7**, de 15/10/2026, commit `8dabfe80b811ea60f587410dfbaf766b73c3671f`.
Inclui o Portal, Museu Sonoro (11 obras e 69 cenas) e Museu Invisível (três rodadas, ranking, áudios independentes, penalidade por repetição e Modo Visitante).
O site publicado não foi alterado para esta exportação. O código-fonte foi copiado sem alterações; o README original está em `docs/README_SITE_ORIGINAL.md`.

## Executar

Extraia o ZIP e abra a pasta ENTRE_TELAS_ATUALIZADO no Codex. Instale Node.js 22 ou superior, com npm. No terminal dessa pasta:

```sh
npm ci
npm run build
npm start
```

Abra **http://localhost:4173/**. Ctrl+C encerra o servidor. Não abra o HTML por duplo clique. A instalação inicial das dependências requer internet; não é necessário GitHub.

- `/`: Portal ENTRE TELAS.
- `/museu/`: Museu Sonoro.
- `/jogo/`: Museu Invisível.
- `/sobre/`: informações educativas.

Para verificar:

```sh
npm run build
npm test
```

`npm run dev` reúne build e servidor. Após alterações, execute o build novamente e atualize o navegador; não há recarga automática. Os testes automatizados usam DOM, players e IndexedDB controlados. Som real, leitor de tela e aparência devem ser conferidos nos notebooks.

## Estrutura

- `src/app.js`, `src/game.js`, `src/championship/`: jogo e ranking.
- `src/audio/`, `src/components/`, `src/config/`, `src/data/`: áudio, administração e acervo.
- `src/museum/`: apresentação e áudio do museu.
- `src/portal.js` e `src/portal.css`: portal.
- `public/`: documentos das rotas e imagens.
- `scripts/`: build, servidor e utilitário histórico de empacotamento.
- `tests/`: testes; `docs/`: documentação original.
- `VERSAO_EXPORTADA.json` e `SHA256SUMS.txt`: origem e integridade da cópia.

`dist/` é gerado pelo build. `node_modules/` é recriado por npm ci. O package-lock.json foi preservado. O ZIP antigo de public/downloads foi excluído por estar desatualizado.

## Publicar sem GitHub

O projeto é estático, sem servidor de aplicação ou chave de API obrigatória.

1. Execute npm ci e npm run build.
2. Publique **o conteúdo de dist na raiz de um domínio**, em hospedagem estática com HTTPS e index.html em subdiretórios.
3. Confira as quatro rotas, inclusive ao recarregar a página.
4. Não redirecione todas as rotas para um único HTML: cada experiência tem seu próprio documento.

Os caminhos atuais são absolutos; hospedagem dentro de subpasta exige adaptação. Os arquivos antigos de GitHub em docs e .github são históricos/opcionais e não são necessários para usar o projeto.

`.openai/hosting.json` contém apenas a identificação/configuração do Site existente, sem credenciais. Não reutilize essa identidade para publicar outro projeto. Para atualizar o endereço atual pelo Codex com Sites, selecione o projeto existente e autentique-se pela ferramenta. Nenhum token de publicação acompanha o ZIP.

## O que ficou de fora

Esta cópia contém o programa, mas não os dados privados do seu navegador. Não foi possível exportar automaticamente:

- arquivos MP3/WAV/OGG/M4A/MPEG enviados pela interface, associações e textos/volumes personalizados;
- inscrições e pontuações do ranking;
- senha administrativa, hash e salt;
- estado ativado/desativado do Modo Visitante;
- preferências pessoais de voz, velocidade, volume, contraste, texto e movimento;
- gravações e preferências do endereço antigo do Museu Sonoro;
- vozes instaladas no Windows/navegador.

Nenhum arquivo de áudio gravado estava incluído no código publicado. Estão incluídos textos, ambientes sintetizados, mecanismos de voz e todo o suporte a arquivos personalizados. Seus dados continuam no navegador onde foram salvos. Localhost, outro domínio ou outro computador não recebem esses dados automaticamente.

### Transferir dados do jogo com segurança

No site atual, saia do Modo Visitante pela ÁREA DO ORGANIZADOR usando sua senha. Abra PREPARAR EXPERIÊNCIA → GERENCIAR ÁUDIOS E RANKING e desbloqueie.

1. Use **Exportar pacote com áudios**.
2. Na área do ranking, use **Exportar JSON**; CSV é para leitura, não para restauração.
3. Guarde os backups separadamente, sem publicá-los no código.
4. Na nova instalação, crie uma senha local pelo painel (mínimo de 8 caracteres). Pode escolher a mesma senha sem escrevê-la em arquivos.
5. Importe o pacote de áudio e o JSON do ranking, confira os resultados, ajuste as preferências gerais e reative o Modo Visitante.

O museu tem envio de MP3 por obra/cena, mas não dispõe de exportação coletiva nesta versão. Reenvie os MP3 originais nas configurações da nova instalação. Os áudios do museu não entram no pacote de áudio do jogo.

A senha protege a interface local para uso supervisionado, não é autenticação de servidor. Não inclua senhas reais, tokens ou chaves privadas em código, prompts ou backups públicos. Os valores de senha presentes nos testes são fictícios. Se adicionar serviços externos, use o gerenciador de segredos/variáveis de ambiente da hospedagem.

## Continuar no Codex

Abra esta pasta e peça ao Codex para ler este README e docs/README_SITE_ORIGINAL.md antes de alterar o código. Preserve as duas experiências, as 11 obras, a reprodução manual e o Modo Visitante. Esta cópia corresponde à versão publicada 7, não ao ZIP antigo de preparação para GitHub.
