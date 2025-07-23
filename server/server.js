
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
const musicDir = path.join(__dirname,'music');


function listMp3(dir){
    let res=[];
    for(const f of fs.readdirSync(dir)){
        const p=path.join(dir,f);
        const s=fs.statSync(p);
        if(s.isDirectory()) res=res.concat(listMp3(p));
        else if(f.toLowerCase().endsWith('.mp3')) res.push(path.relative(musicDir,p).replace(/\\/g,'/'));
    }
    return res;
}

app.use(cors());

app.use('/music', express.static(path.join(__dirname, 'music'), {
  setHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
}));

app.get('/random',(req,res)=>{
    const all=listMp3(musicDir);
    if(!all.length) return res.status(404).send('No mp3');
    const file=all[Math.floor(Math.random()*all.length)];
    res.send('/music/'+encodeURI(file));
});

app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(PORT,()=>console.log('The server has been started on the PORT: '+PORT));
