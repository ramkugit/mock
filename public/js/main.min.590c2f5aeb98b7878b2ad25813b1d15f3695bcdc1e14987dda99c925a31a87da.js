'use strict';const prefersDark=window.matchMedia('(prefers-color-scheme: dark)');const prefersLight=window.matchMedia('(prefers-color-scheme: light)');const rootElement=document.documentElement;const rootStyle=rootElement.style;const metaThemeColor=document.querySelector('meta[name=theme-color]');function setDark(){rootElement.setAttribute('data-mode','dark');}
function setLight(){rootElement.setAttribute('data-mode','light');}
if(localStorage.getItem('isDark')=='true'){setDark();}else if(localStorage.getItem('isDark')=='false'){setLight();}else if(prefersDark.matches){setDark();}else if(prefersLight.matches){setLight();}
function getAccent(){const currentMode=rootElement.getAttribute('data-mode');let currentAccent;if(currentMode==='dark'){if(localStorage.getItem('darkAccent')===null){currentAccent="#1dbc91";}else{currentAccent=localStorage.getItem('darkAccent');}}else if(currentMode==='light'){if(localStorage.getItem('lightAccent')===null){currentAccent="#1f676b";}else{currentAccent=localStorage.getItem('lightAccent');}}
return currentAccent;}
const activeAccent=getAccent();rootStyle.setProperty('--accent',activeAccent);metaThemeColor.setAttribute('content',activeAccent);document.addEventListener('DOMContentLoaded',function(){const palette=document.querySelector('footer input');palette.onchange=function(){const pick=palette.value;rootStyle.setProperty('--accent',pick);if(rootElement.getAttribute('data-mode')==='dark'){localStorage.setItem('darkAccent',pick);}else{localStorage.setItem('lightAccent',pick);}
updateAccent();}
palette.value=activeAccent;function smoothTransition(){document.body.style.transition=document.querySelector('header').style.transition=document.querySelector('footer').style.transition='background-color .3s ease, color .3s ease';}
function userModeChange(){smoothTransition();if(rootElement.getAttribute('data-mode')=='dark'){setLight();localStorage.setItem('isDark','false');}else{setDark();localStorage.setItem('isDark','true');}
updateAccent();}
function OSModeChange(){smoothTransition();if(prefersDark.matches){setDark();localStorage.setItem('isDark','false');}else if(prefersLight.matches){setLight();localStorage.setItem('isDark','true');}
updateAccent();}
prefersDark.addListener(OSModeChange);prefersLight.addListener(OSModeChange);function updateAccent(){const activeAccent=getAccent();rootStyle.setProperty('--accent',activeAccent);palette.value=activeAccent;metaThemeColor.setAttribute('content',activeAccent);}
document.querySelector('footer button').addEventListener('click',userModeChange);});