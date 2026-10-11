const { chromium } = require('/Users/john/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 const page=await browser.newPage({viewport:{width:1200,height:920},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.goto('http://127.0.0.1:8766/',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 const check=await page.evaluate(()=>({
   pages:document.querySelectorAll('.page').length,
   images:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),
   overflow:[...document.querySelectorAll('.page')].flatMap(s=>{
    const r=s.getBoundingClientRect();
    return [...s.querySelectorAll('h1,h2,h3,p,.note,.closing,.directions article,.checklist article,.verbal>div')].filter(el=>el.getBoundingClientRect().bottom>r.bottom-50).map(el=>({page:s.id,tag:el.tagName,text:el.innerText.slice(0,70),bottom:el.getBoundingClientRect().bottom-r.top}));
   })
 }));
 fs.mkdirSync(path.join(root,'output/qa'),{recursive:true});
 for(let i=1;i<=12;i++)await page.locator('#p'+i).screenshot({path:path.join(root,'output/qa/page-'+String(i).padStart(2,'0')+'.png')});
 await page.pdf({path:path.join(root,'output/健年品牌识别手册-评审稿.pdf'),preferCSSPageSize:true,printBackground:true});
 const assetPage=await browser.newPage({viewport:{width:1200,height:1200},deviceScaleFactor:1});
 for(const [name,w,h] of [['brand-overview',1600,1060],['logo-horizontal-primary',1680,680],['logo-stacked-primary',900,990],['icon-primary',1080,1080],['avatar',1024,1024],['social-cover-3x4',1080,1440],['health-homework-sheet',840,1188],['video-title-16x9',1920,1080],['letterhead-a4',840,1188]]){
  await assetPage.setViewportSize({width:w,height:h});
  await assetPage.setContent(`<html><body style="margin:0;width:${w}px;height:${h}px;background:transparent"><img style="display:block;width:100%;height:100%" src="http://127.0.0.1:8766/assets/${name}.svg"></body></html>`);
  await assetPage.waitForFunction(()=>document.images[0].complete&&document.images[0].naturalWidth>0);
  await assetPage.screenshot({path:path.join(root,'assets/'+name+'.png'),omitBackground:true});
 }
 for(const [name,source] of [['01-健年-中文字标','wordmark-chinese-black'],['02-年字长线-图形','icon-black'],['03-健年-横式组合','logo-horizontal-black']]){
  await assetPage.setViewportSize({width:1000,height:1000});
  await assetPage.setContent(`<html><body style="margin:0;width:1000px;height:1000px;display:grid;place-items:center;background:white"><img style="width:760px;height:760px;object-fit:contain" src="http://127.0.0.1:8766/assets/${source}.svg"></body></html>`);
  await assetPage.waitForFunction(()=>document.images[0].complete&&document.images[0].naturalWidth>0);
  await assetPage.screenshot({path:path.join(root,'registration/'+name+'.jpg'),type:'jpeg',quality:90});
 }
 check.errors=errors;fs.writeFileSync(path.join(root,'output/qa/browser-check.json'),JSON.stringify(check,null,2));
 console.log(JSON.stringify(check));
 await browser.close();
})();
