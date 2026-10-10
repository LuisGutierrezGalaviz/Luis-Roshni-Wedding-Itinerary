"use strict";
function mauiMarkup(){
  return `<div id="maui-feature"><div class="pf-perspective"><button class="pf-postcard cursor-interaction" type="button" aria-label="Flip postcard to read our family note" aria-pressed="false">
  <span class="pf-rotor">
   <span class="pf-face pf-front" aria-hidden="false">
    <span class="pf-top"><span>MAUI · OCT 2026</span><span>WITH LOVE</span></span>
    <span class="pf-scene" role="img" aria-label="Illustrated island sunset with mountains, ocean, palm tree, and a plane"><span class="pf-sun"></span><span class="pf-mountain"></span><span class="pf-ocean"></span><span class="pf-ripple"></span><span class="pf-shore"></span><span class="pf-palm" aria-hidden="true">🌴</span><span class="pf-plane" aria-hidden="true">✈</span></span>
    <span class="pf-caption">From “I do” to island views.</span><span class="pf-small">October 15–21 · Back in Seattle October 21</span>
   </span>
   <span class="pf-face pf-back" aria-hidden="true">
    <span class="pf-top"><span>A POSTCARD FOR OUR FAMILY</span><span>♡</span></span>
    <span class="pf-message"><span><span class="pf-hand">Dear family,</span><span class="pf-paragraph">Thank you for being part of our wedding week and making it so special. We’re so happy we get to spend this time together.</span><span class="pf-paragraph">Next up: a few sunsets, sandy toes, and a little time together.</span><span class="pf-hand">With love,<br>Roshni & Luis</span></span><span class="pf-address"><span class="pf-stamp">🌴<br>MAUI</span><span class="pf-address-line">To our favorite people</span><span class="pf-address-line">With us in spirit</span></span></span>
    <span class="pf-small">October 15–21 · Back in Seattle October 21</span>
   </span>
  </span>
 </button></div></div>`;
}
function initializeMauiPostcard(){
  const feature=document.getElementById('maui-feature');
  if(!feature)return;
  const button=feature.querySelector('.pf-postcard');
  const front=feature.querySelector('.pf-front');
  const back=feature.querySelector('.pf-back');
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let liftAnimation;
  button.addEventListener('click',()=>{
    const toBack=button.getAttribute('aria-pressed')!=='true';
    button.setAttribute('aria-pressed',String(toBack));
    button.setAttribute('aria-label',toBack?'Flip postcard back to island views':'Flip postcard to read our family note');
    front.setAttribute('aria-hidden',String(toBack));
    back.setAttribute('aria-hidden',String(!toBack));
    if(liftAnimation)liftAnimation.cancel();
    if(reducedMotion.matches)return;
    liftAnimation=button.animate([
      {transform:'translateY(0) rotate(-1deg) scale(1)',filter:'drop-shadow(0 0 0 transparent)'},
      {transform:'translateY(-9px) rotate(-1deg) scale(1.015)',filter:'drop-shadow(0 13px 9px #243e3125)',offset:.3},
      {transform:'translateY(-9px) rotate(-1deg) scale(1.015)',filter:'drop-shadow(0 13px 9px #243e3125)',offset:.7},
      {transform:'translateY(0) rotate(-1deg) scale(1)',filter:'drop-shadow(0 0 0 transparent)'}
    ],{duration:760,easing:'cubic-bezier(.3,.05,.25,1)'});
  });
  reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches&&liftAnimation)liftAnimation.cancel()});
}
