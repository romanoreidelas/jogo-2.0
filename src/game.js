export function secureRandom(){return crypto.getRandomValues(new Uint32Array(1))[0]/4294967296;}
export function shuffle(items,random=secureRandom){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export class Game{
 constructor(works,accessible=false,random=secureRandom,clock=()=>performance.now()){
  this.rounds=shuffle(works,random).slice(0,3).map(work=>({work,options:shuffle([work,...shuffle(works.filter(x=>x.id!==work.id),random).slice(0,2)],random),plays:0,chosen:null,detail:false,points:0,replays:0,started:null,elapsed:0,answered:false}));this.index=0;this.accessible=accessible;this.clock=clock;
 }
 get round(){return this.rounds[this.index];}get score(){return this.rounds.reduce((s,r)=>s+r.points,0);}get hits(){return this.rounds.filter(r=>r.chosen===r.work.id).length;}get responseTime(){return this.rounds.reduce((s,r)=>s+r.elapsed,0);}
 get penalty(){return this.accessible?0:Math.min(2,this.round.replays)*15;}
 replayStarted(){if(this.accessible||this.round.answered)return false;this.round.replays++;return true;}
 replayFailed(){if(!this.round.answered)this.round.replays=Math.max(0,this.round.replays-1);}
 listen(){if(!this.round.answered)this.round.plays++;}
 start(){if(this.round.started===null)this.round.started=this.clock();}
 elapsed(){const r=this.round;return r.answered?r.elapsed:r.started===null?0:Math.max(0,this.clock()-r.started);}
 remaining(){return this.accessible?Infinity:Math.max(0,30000-this.elapsed());}
 expire(){const r=this.round;if(this.accessible||r.answered||r.started===null||this.remaining()>0)return false;r.answered=true;r.elapsed=30000;r.chosen=null;return true;}
 choose(id){const r=this.round;if(r.answered||r.started===null||!r.options.some(w=>w.id===id))return false;if(this.expire())return true;r.elapsed=this.elapsed();r.answered=true;r.chosen=id;r.points=id===r.work.id?100+(this.accessible?0:r.elapsed<=10000?30:r.elapsed<=20000?20:10)-this.penalty:0;r.points=Math.max(0,r.points);return true;}
 discover(){const r=this.round;if(!r.answered||r.detail)return false;r.detail=true;return true;}
 next(){if(!this.round.detail)return false;if(this.index===2)return 'finished';this.index++;return true;}
}
