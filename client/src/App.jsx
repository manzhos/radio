
import { useEffect,useRef,useState } from 'react';
export default function App(){
  const audioRef=useRef(null);
  const [list,setList]=useState([]);
  const [idx,setIdx]=useState(-1);
  const [play,setPlay]=useState(true);
  const [prog,setProg]=useState(0);
  const [dark,setDark]=useState(false);

  const fetchTrack=async()=>{
    const r=await fetch('/random');
    if(r.ok){const p=await r.text();setList(l=>[...l,p]);setIdx(i=>i+1);}
  };
  useEffect(()=>{fetchTrack();},[]);
  useEffect(()=>{if(idx>=0&&list[idx]&&audioRef.current){audioRef.current.load();audioRef.current.play();setPlay(true);}},[idx]);

  return (
    <div className={'app '+(dark?'dark':'light')}>
      <button className="theme" onClick={()=>setDark(!dark)}>{dark?'☀️':'🌙'}</button>
      <div className="ctr">
        <button onClick={()=>idx>0&&setIdx(idx-1)}>⏮</button>
        <button onClick={()=>{if(!audioRef.current)return;if(audioRef.current.paused){audioRef.current.play();setPlay(true);}else{audioRef.current.pause();setPlay(false);}}}>{play?'⏸':'▶'}</button>
        <button onClick={()=>{idx<list.length-1?setIdx(idx+1):fetchTrack();}}>⏭</button>
      </div>
      {/* <p className="name">{list[idx]?.split('/').pop()||'...'}</p> */}
      <div className="bar" onClick={e=>{if(!audioRef.current)return;const rect=e.currentTarget.getBoundingClientRect();audioRef.current.currentTime=((e.clientX-rect.left)/rect.width)*audioRef.current.duration;}}>
        <div className="fill" style={{width:prog+'%'}}/>
      </div>
      <audio ref={audioRef} onTimeUpdate={()=>{if(!audioRef.current)return;setProg((audioRef.current.currentTime/audioRef.current.duration)*100||0);}} onEnded={()=>{idx<list.length-1?setIdx(idx+1):fetchTrack();}} autoPlay>
        <source src={list[idx]} type="audio/mpeg"/>
      </audio>
    </div>);
}
