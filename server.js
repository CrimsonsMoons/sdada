
const express=require('express');
const {createProxyMiddleware}=require('http-proxy-middleware');
const path=require('path');
const app=express();
const PORT=process.env.PORT||3000;
app.use(express.static(path.join(__dirname,'public')));
app.use('/proxy', createProxyMiddleware({
 target:'https://aniwatchtv.to',
 changeOrigin:true,
 secure:true,
 pathRewrite:{'^/proxy':''},
 onProxyRes:(proxyRes)=>{
   delete proxyRes.headers['x-frame-options'];
   delete proxyRes.headers['content-security-policy'];
   delete proxyRes.headers['content-security-policy-report-only'];
 }
}));
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'public','index.html')));
app.listen(PORT,'0.0.0.0',()=>console.log('running '+PORT));
