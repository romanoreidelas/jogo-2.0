import {artworks} from './acervo.js';
const venusContext='Realizada por volta de 1485, em Florença, a pintura aproxima o Renascimento da mitologia clássica. A cena mostra a chegada de Vênus à costa de Chipre. A encomenda por alguém da família Médici é provável, mas não está documentada com certeza. Os Uffizi mencionam um registro de 1550, quando Vasari descreve a obra na Villa de Castello.';
const venusReading='A postura de Vênus remete à escultura antiga. O contraste entre a figura central e os tecidos agitados convida a uma leitura de serenidade em meio ao movimento. Essa é uma proposta de olhar, não uma afirmação sobre a intenção do artista. A acompanhante de Zéfiro e a mulher à direita admitem diferentes identificações.';
export function createScenes(work){
 const context=work.context||venusContext,reading=work.reading||venusReading;
 return [
  {id:'introducao',kind:'full',title:work.title,kicker:'A PINTURA',image:work.image,alt:work.objective,summary:`${work.artist} · ${work.date}`,text:`${work.museum} · ${work.city}`,narration:`${work.title}. ${work.artist}. ${work.date}. ${work.museum}. Descrição objetiva. ${work.objective}`,transcript:work.objective},
  {id:'contexto',kind:'context',title:'Uma história para conhecer',kicker:'CONTEXTO E LEITURAS',image:work.image,alt:work.title,summary:context,text:reading,narration:`${work.title}. Contexto histórico. ${context} Interpretação artística. ${reading}`,transcript:`Contexto histórico: ${context}\n\nInterpretação artística: ${reading}`},
  ...work.details.map((d,i)=>({id:`detalhe-${i+1}`,kind:'detail',title:d.title,kicker:`DETALHE ${String(i+1).padStart(2,'0')}`,image:d.image||`assets/${work.id}-detail-${i+1}.webp`,alt:d.objective,summary:d.objective,text:d.poetic,narration:`${d.title}. ${d.objective}`,transcript:`Descrição objetiva: ${d.objective}\n\nLeitura poética: ${d.poetic}\n\n${d.note}`,detail:d})),
  {id:'encerramento',kind:'closing',title:'A imagem permanece.',kicker:'PARA LEVAR COM VOCÊ',image:work.image,alt:work.objective,summary:work.poetic,text:'Uma leitura poética inspirada na pintura.',narration:work.poetic,transcript:work.poetic}
 ];
}
export const collection=artworks.map(work=>({...work,scenes:createScenes(work)}));
export function boundedScene(index,delta,count){return Math.max(0,Math.min(count-1,index+delta));}
export function handlesPresentationKey(event,active,dialogOpen){
 if(!active||dialogOpen||event.defaultPrevented||event.isComposing||event.repeat||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey)return false;
 const target=event.target;
 if(target?.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"]),[role="menu"],[role="menubar"],[role="listbox"],[role="combobox"],[role="slider"],[role="spinbutton"],[role="tablist"],[role="tree"],[role="grid"],audio,video'))return false;
 if(event.key===' '&&target?.closest('button,a,summary,[role="button"]'))return false;
 return ['ArrowRight','ArrowLeft',' ','Escape'].includes(event.key);
}
