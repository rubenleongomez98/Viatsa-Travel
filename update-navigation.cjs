// Mechanical update of legacy HTML links and shared footer loader.
const fs=require('fs');
for(const file of ['index.html','aventuras.html','experiencias.html','grupales.html','explorar.html','terminos.html','producto-demo.html']){
 let html=fs.readFileSync(file,'utf8');
 html=html.replace(/(<header[\s\S]*?<\/header>)/g,header=>header.replace(/<a\b[^>]*>\s*(?:Sobre Viatsa|About Viatsa)\s*<\/a>/gi,''));
 html=html.replace(/href="(?:index\.html)?#tailor"/g,'href="viajes-a-medida.html"');
 html=html.replace(/<script src="site-common\.js[^"]*" defer><\/script>/g,'');
 html=html.replace('</body>','<script src="site-common.js?v=1" defer></script></body>');
 fs.writeFileSync(file,html);
}
