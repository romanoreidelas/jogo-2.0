# MUSEU INVISÍVEL — O Desafio da Imaginação

Minijogo independente do ENTRE TELAS: três rodadas, três opções por rodada, onze pinturas e dois canais de áudio independentes. Site estático, sem servidor de aplicação.

## Para usar na feira

Você não precisa de GitHub, terminal ou programação para usar o site já publicado.

1. Abra **PREPARAR EXPERIÊNCIA → GERENCIAR ÁUDIOS**.
2. Selecione a obra e a etapa, envie seu arquivo e clique em **Salvar configurações**.
3. A transcrição é **opcional**. A gravação funciona sem digitar o conteúdo falado.
4. Use **Ouvir prévia** para testar. Enviar um arquivo nunca o reproduz.
5. Inicie a partida. Cada áudio só começa pelo seu botão de reprodução.
6. Para outro computador ou endereço, exporte o pacote e importe no navegador da feira.

MP3, WAV e OGG são aceitos; M4A, MPEG e MPG dependem do conteúdo/codec e do navegador. A importação verifica assinatura do conteúdo e decodificação sem tocar o som. Arquivos incompatíveis recebem orientação para converter a MP3. Renomear uma extensão não converte o áudio.

Não existe opção de reprodução automática. Preferências antigas de autoplay são descartadas. Trocar de tela interrompe os canais; não há início automático em rodada, resposta, revelação, final, upload ou importação.

## Estrutura

- `src/app.js`: navegação e integração da interface.
- `src/game.js`: sorteio e pontuação.
- `src/components/`: gerenciamento de áudio.
- `src/audio/`: players, mixagem, validação e IndexedDB.
- `src/data/`: onze obras, descrições e catálogo de telas.
- `src/config/`: velocidades, ambientes e arquivos distribuídos com o site.
- `src/styles/`: aparência e responsividade.
- `public/assets/images/`: pinturas e recortes reais do acervo.
- `public/assets/audio/`: gravações opcionais incluídas na publicação.
- `public/index.html`: estrutura inicial da interface.
- `scripts/`: geração do site e servidor local opcional.
- `tests/`: testes de lógica, mídia e interface.
- `dist/`: saída gerada para publicação; não editar diretamente.
- `.github/workflows/pages.yml`: publicação opcional pelo GitHub Actions.

## Instalar e executar localmente (opcional)

Requer Node.js 22 ou posterior, apenas para quem quiser trabalhar no código:

```sh
npm ci
npm run build
npm start
```

Abra `http://localhost:4173`. Não abra index.html diretamente pelo explorador de arquivos; módulos JavaScript precisam de HTTP(S). `npm run dev` gera o site e inicia o servidor. `npm test` executa os testes após a geração.

## GitHub Pages (opcional)

Veja [docs/GITHUB.md](docs/GITHUB.md). O projeto já tem workflow; nenhuma publicação ou conta GitHub foi criada automaticamente. Os caminhos relativos funcionam na raiz e em `https://usuario.github.io/nome-do-repositorio/`, sem configurar uma base fixa.

## Arquivos e privacidade

Uploads ficam como bytes no IndexedDB do navegador, não apenas como URLs temporárias. Atualizar a página mantém os arquivos, salvo limpeza/evicção dos dados do navegador. Eles não são enviados a um servidor nem aparecem automaticamente em outros dispositivos ou domínios. A exportação inclui os arquivos e configurações; a importação preserva os destinos não incluídos no pacote. Limites: 40 MB por arquivo, 250 MB de áudio por pacote.

O painel tem bloqueio local por senha. Isso evita alterações casuais pela interface; não substitui autenticação de servidor nem protege contra quem controla o perfil/ferramentas do navegador. O GitHub Pages pode deixar o site e os arquivos incluídos publicamente acessíveis. Nenhuma senha, gravação local ou configuração privada do navegador faz parte do código-fonte exportado.

## Verificação e limites

Testes automatizados cobrem reprodução manual, navegação silenciosa inclusive com preferências legadas de autoplay, dois canais independentes, pausa e retomada, arquivos sem transcrição, substituição, persistência, pacote, três rodadas, onze obras, pontuação e caminhos em subpastas. O DOM e os players desses testes são substitutos controlados.

Nesta sessão não há navegador de QA disponível. Compatibilidade acústica dos arquivos reais, pausa audível da Web Speech API, responsividade visual e leitor de tela real precisam de conferência no computador da feira. A voz sintetizada depende do navegador/sistema; gravações têm prioridade e não são substituídas automaticamente por síntese quando falham.

O museu ENTRE TELAS original não é alterado por este projeto. Histórico técnico em `docs/HISTORY.md`.

## Campeonato da feira

A tela JOGAR solicita apenas apelido. Três obras distintas, 30 segundos por escolha a partir de “Estou pronto”. Acerto: 100 + 30/20/10 conforme o tempo; máximo 390. Em 30 segundos a resposta expira, vale zero e a pintura é revelada. A escuta anterior é livre. Transcrições, pausa, retomada e ambiente não alteram a pontuação. Uma repetição completa voluntária da audiodescrição, após o término anterior, desconta 15 pontos quando começa a tocar, com teto de 30 por rodada; falhas estornam o desconto. O modo acessível não tem penalidades. A opção sem limite de tempo vale até 300 e não entra no ranking.

O Top 10 usa IndexedDB separado dos áudios. Persiste no mesmo navegador/dispositivo, sem sincronização entre computadores. Apelidos repetidos são aceitos; cada partida tem UUID próprio. Ordem: pontos, acertos, menor tempo, data e ID para desempate estável. O filtro usa tokens e normalização de acentos, caixa e substituições simples; não é perfeito.

PREPARAR EXPERIÊNCIA → GERENCIAR ÁUDIOS → desbloquear com senha → GERENCIAR RANKING: atualizar inscrições, renomear, excluir com confirmação, exportar JSON/CSV, importar JSON (mesmos IDs substituídos) ou ZERAR RANKING, validar novamente a senha e confirmar a exclusão. Excluir uma inscrição também exige nova validação. A senha é uma barreira local da interface, não autenticação de servidor. Exportações não incluem senhas ou áudios; os áudios mantêm seu pacote próprio. Backups importados são validados antes de uma transação atômica.

Modo vitrine: botão na tela inicial alterna apresentação e ranking a cada 12 segundos, sem áudio. Teclado, toque, clique ou rolagem interrompem a alternância.

Não é necessário GitHub para jogar ou preparar a feira. A publicação atual continua no Sites.

## Uso supervisionado: Modo Visitante

Em PREPARAR EXPERIÊNCIA → GERENCIAR ÁUDIOS E RANKING, desbloqueie com a senha existente e clique ATIVAR MODO VISITANTE. A tela volta ao cadastro limpo. Apenas ÁREA DO ORGANIZADOR, no rodapé fora da partida, permite sair mediante essa mesma senha. O estado é salvo no IndexedDB junto à segurança local; reiniciar partidas não o altera. Uploads, prévias administrativas, preferências e operações de ranking verificam autorização, além de ocultar os controles. Não é proteção contra alguém com acesso às ferramentas de desenvolvedor ou aos dados do navegador; a feira deve ser supervisionada.

Sorteio: Fisher–Yates com crypto.getRandomValues, novo a cada partida. Repetições entre partidas são possíveis e normais; dentro de uma partida, as três obras são diferentes e a ordem fica estável.

Testes utilizam DOM, áudio e IndexedDB controlados; verificam nova inicialização do aplicativo com estado persistido, senha correta/incorreta, bloqueio administrativo, reset sem apagar MP3 e cálculo das repetições. Aparência e som real precisam de verificação no notebook da feira.

## Portal ENTRE TELAS

O endereço publicado agora abre a seleção de experiências. Rotas estáticas independentes:

- `/`: portal com três links/cartões. Tab, setas locais e Enter; sem áudio.
- `/museu/`: Museu Sonoro, 11 obras e 69 cenas. Código em `src/museum`, documento e imagens em `public/museu`; build reúne-os em `dist/museu`.
- `/jogo/`: campeonato existente. Documento em `public/jogo`, módulos em `src`. A base `/` mantém os mesmos caminhos de mídias. Bancos IndexedDB e chaves de preferências do jogo não foram renomeados.
- `/sobre/`: informações educativas estáticas, sem players.

Cada rota tem seu próprio documento; não há dois aplicativos ativos no mesmo DOM nem comunicação que redirecione outro dispositivo. Arquivos `index.html` e bases explícitas permitem acesso direto às rotas com ou sem a barra final conforme a normalização de diretórios da hospedagem.

Notebook 1: abra `/museu/`. Notebook 2: abra `/jogo/`, prepare os áudios e ative o Modo Visitante. Não existe sincronização global do ranking, dos arquivos ou da navegação.

Voltar ao portal encerra players e invalida operações pendentes. Durante uma partida normal, pede confirmação; no Modo Visitante, o controle de retorno fica oculto e seu handler recusa a ação. Acessar o portal pelo endereço não desativa o estado protegido do jogo. A saída desse estado continua exigindo a senha local. O museu incorporado usa exclusivamente reprodução manual, inclusive quando um evento antigo tenta ativar narração automática.

Origem do museu incorporado: projeto ENTRE TELAS, commit `e5407a0ad32723cdd05b1e532c298df4f8067e14`. O projeto antigo e seus dados não foram modificados. Os MP3 e preferências salvos no domínio antigo continuam disponíveis lá; o navegador isola dados entre domínios, portanto esses arquivos precisam ser carregados na nova rota caso ainda não estejam neste endereço. O jogo manteve o domínio e os mesmos bancos, preservando seus dados locais.

Validação: 70 testes automatizados, com DOM/áudio/IndexedDB controlados, cobrem cartões, seleção, estrutura das rotas, catálogo, apresentação, controles, navegação, persistência, senha, partida e limpeza dos players. Não houve navegador de QA disponível: renderização em notebook/celular, leitor de tela real, console do navegador e codecs/dispositivos de áudio precisam de verificação no equipamento da feira.
