'use strict';
const hotel = {venue:'Archer Hotel Redmond',address:'7200 164th Ave NE, Redmond, WA 98052'};
const days = [
  {id:'oct-10',weekday:'Saturday',date:'October 10',title:'Welcome to Washington',intro:'Arrive, settle in, and join the plans that work for your arrival time.',events:[
    {id:'boat',time:'4:00–6:00 PM',title:'Seattle boat ride',venue:'The Electric Boat Company',address:'2046 Westlake Ave N #102, Seattle, WA 98109',tag:'Early arrivals',start:'2026-10-10T16:00:00-07:00',end:'2026-10-10T18:00:00-07:00'},
    {id:'la-palmera',time:'6:30–8:00 PM',title:'Dinner at La Palmera',venue:'La Palmera Mexican Restaurant',address:'901 Mercer St, Seattle, WA 98109',start:'2026-10-10T18:30:00-07:00',end:'2026-10-10T20:00:00-07:00'}
  ]},
  {id:'oct-11',weekday:'Sunday',date:'October 11',title:'A day around Redmond',events:[
    {id:'akb-breakfast',time:'9:00–11:00 AM',title:'Breakfast at AKB',...hotel,start:'2026-10-11T09:00:00-07:00',end:'2026-10-11T11:00:00-07:00'},
    {id:'marymoor',time:'12:00–2:00 PM',title:'Marymoor Park',venue:'Marymoor Park',address:'6046 West Lake Sammamish Pkwy NE, Redmond, WA 98052',start:'2026-10-11T12:00:00-07:00',end:'2026-10-11T14:00:00-07:00'},
    {id:'explore',time:'After Marymoor · Flexible',title:'Explore Redmond & nearby',tag:'Optional',description:'If we have time and feel like exploring, a few options:',options:[{text:'Flatstick Pub — mini golf in Redmond',url:'https://flatstickpub.com/redmond/'},{text:'Redmond Town Center — shops, coffee, and a walk',url:'https://redmondtowncenter.com/'},{text:'Visit our apartment at Avalon Commons in Bothell, for anyone who hasn’t seen it.'},{text:'Or head back to the hotel and relax.'}]},
    {id:'agave',time:'6:30–7:30 PM',title:'Dinner at Agave',venue:'Agave Cocina & Cantina',address:'17158 Redmond Way #180, Redmond, WA 98052',start:'2026-10-11T18:30:00-07:00',end:'2026-10-11T19:30:00-07:00'},
    {id:'mehndi',time:'7:30–9:00 PM',title:'Mehndi at the hotel',...hotel,tag:'Optional',description:'For anyone who would like mehndi applied. Roshni and her mom are joining so far.',start:'2026-10-11T19:30:00-07:00',end:'2026-10-11T21:00:00-07:00'}
  ]},
  {id:'oct-12',weekday:'Monday',date:'October 12',title:'The civil ceremony',events:[
    {id:'breakfast-options',time:'8:00 AM',title:'Breakfast',description:'Choose what works for you before getting ready.',options:[{text:'Village Square Cafe'},{text:'The Original Pancake House'},{text:'Crepes at Redmond Town Center'}]},
    {id:'depart-chapel',time:'Ready by noon · Leave at 12:30 PM',title:'Head to Belle Chapel',description:'Finish getting ready by noon. Leave at 12:30 PM to arrive at the chapel at 1:30 PM.',venue:'Belle Chapel',address:'231 Avenue B, Snohomish, WA 98290',start:'2026-10-12T12:30:00-07:00',end:'2026-10-12T13:30:00-07:00'},
    {id:'civil',time:'Arrive 1:30 PM · Ceremony 2:00 PM',title:'Our civil ceremony',venue:'Belle Chapel',address:'231 Avenue B, Snohomish, WA 98290',schedule:[['1:30 PM','Arrive and get ready at the chapel'],['2:00 PM','Ceremony'],['2:30–3:30','Photos around the venue']],start:'2026-10-12T13:30:00-07:00',end:'2026-10-12T15:30:00-07:00'},
    {id:'earls',time:'7:00–8:00 PM',title:'Dinner at Earls',venue:'Earls Kitchen + Bar',address:'700 Bellevue Way NE, Unit 130, Bellevue, WA 98004',start:'2026-10-12T19:00:00-07:00',end:'2026-10-12T20:00:00-07:00'}
  ]},
  {id:'oct-13',weekday:'Tuesday',date:'October 13',title:'The Hindu ceremony',events:[
    {id:'bakery',time:'7:00–8:00 AM',title:'Breakfast',description:'French Bakery breakfast is planned. Serving details to follow.'},
    {id:'hindu',time:'10:00 AM–1:00 PM',title:'Our Hindu ceremony',venue:'ISKCON Vedic Cultural Center',address:'1420 228th Ave SE, Sammamish, WA 98075',start:'2026-10-13T10:00:00-07:00',end:'2026-10-13T13:00:00-07:00'},
    {id:'kanishka',time:'2:00–4:00 PM',title:'Lunch at Kanishka',venue:'Kanishka Cuisine of India',address:'16651 Redmond Way, Suite 180, Redmond, WA 98052',start:'2026-10-13T14:00:00-07:00',end:'2026-10-13T16:00:00-07:00'}
  ]},
  {id:'oct-14',weekday:'Wednesday',date:'October 14',title:'Safe travels home',intro:'Thank you for being here with us.',events:[
    {id:'departures',time:'Throughout the day',title:'Family departures'}
  ]}
];

const links = document.getElementById('date-links');
const panels = document.getElementById('day-panels');
const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const utc = value => new Date(value).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');
const locationText = event => [event.venue,event.address].filter(Boolean).join(', ');
const detailsText = event => [event.description,...(event.schedule||[]).map(([time,title])=>`${time}: ${title}`),'All times Pacific (America/Los_Angeles).'].filter(Boolean).join('\n');
function googleLink(event){
  const params = new URLSearchParams({action:'TEMPLATE',text:`${event.title} · Roshni & Luis`,dates:`${utc(event.start)}/${utc(event.end)}`,ctz:'America/Los_Angeles',details:detailsText(event),location:locationText(event)});
  return `https://calendar.google.com/calendar/render?${params}`;
}
const icsEscape = value => String(value).replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');
function foldLine(line){
  const encoder=new TextEncoder();let out='',part='',size=0;
  for(const character of line){const bytes=encoder.encode(character).length;if(size+bytes>75){out+=part+'\r\n';part=' ';size=1;}part+=character;size+=bytes;}
  return out+part;
}
function eventICS(event){
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Roshni and Luis//Wedding Week//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:${event.id}-202610@luisandroshni.com`,`DTSTAMP:${utc(new Date())}`,`DTSTART:${utc(event.start)}`,`DTEND:${utc(event.end)}`,`SUMMARY:${icsEscape(event.title+' · Roshni & Luis')}`,`LOCATION:${icsEscape(locationText(event))}`,`DESCRIPTION:${icsEscape(detailsText(event))}`,'END:VEVENT','END:VCALENDAR'].map(foldLine).join('\r\n')+'\r\n';
}
function downloadICS(event){
  const url=URL.createObjectURL(new Blob([eventICS(event)],{type:'text/calendar;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download=`roshni-luis-${event.id}.ics`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function eventMarkup(event){
  return `<article class="event"><div class="event-topline"><span class="event-time">${esc(event.time)}</span>${event.tag?`<span class="event-tag">${esc(event.tag)}</span>`:''}</div><h3>${esc(event.title)}</h3>${event.venue?`<p class="event-venue">${esc(event.venue)}</p>`:''}${event.address?`<p class="event-address">${esc(event.address)}</p>`:''}${event.description?`<p class="event-description">${esc(event.description)}</p>`:''}${event.options?`<ul class="event-options">${event.options.map(o=>`<li>${o.url?`<a href="${esc(o.url)}" target="_blank" rel="noopener noreferrer">${esc(o.text)}</a>`:esc(o.text)}</li>`).join('')}</ul>`:''}${event.schedule?`<ul class="event-schedule">${event.schedule.map(([time,title])=>`<li><time>${esc(time)}</time><span>${esc(title)}</span></li>`).join('')}</ul>`:''}${event.address||event.start?`<div class="event-actions">${event.address?`<a class="directions" href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(locationText(event))}" target="_blank" rel="noopener noreferrer">Directions ↗</a>`:''}${event.start?`<details class="calendar-menu"><summary aria-label="Add ${esc(event.title)} to calendar">Add to calendar</summary><div class="calendar-choices"><a href="${esc(googleLink(event))}" target="_blank" rel="noopener noreferrer">Google Calendar ↗</a><a href="#" data-download="${esc(event.id)}">Apple / Outlook (.ics)</a></div></details>`:''}</div>`:''}</article>`;
}
days.forEach(day=>{
  const a=document.createElement('a');a.className='day-link';a.href=`#${day.id}`;a.innerHTML=`<span class="weekday">${day.weekday.slice(0,3)}</span>Oct ${day.date.split(' ')[1]}`;a.setAttribute('aria-controls',day.id);links.appendChild(a);
  const section=document.createElement('section');section.className='day-panel';section.id=day.id;section.setAttribute('aria-labelledby',`${day.id}-title`);section.innerHTML=`<p class="day-date">${day.weekday}, ${day.date}</p><h2 id="${day.id}-title">${day.title}</h2>${day.intro?`<p class="day-intro">${day.intro}</p>`:''}<div class="event-list">${day.events.map(eventMarkup).join('')}</div>`;panels.appendChild(section);
});
function selectDay(){
  const id=days.some(day=>`#${day.id}`===location.hash)?location.hash.slice(1):days[0].id;
  document.querySelectorAll('.day-panel').forEach(panel=>panel.hidden=panel.id!==id);
  document.querySelectorAll('.day-link').forEach(link=>{if(link.hash===`#${id}`)link.setAttribute('aria-current','date');else link.removeAttribute('aria-current')});
  document.querySelectorAll('.calendar-menu[open]').forEach(menu=>menu.open=false);
}
window.addEventListener('hashchange',selectDay);selectDay();
panels.addEventListener('click',event=>{
  const target=event.target.closest('[data-download]');if(!target)return;event.preventDefault();const item=days.flatMap(day=>day.events).find(item=>item.id===target.dataset.download);if(item)downloadICS(item);
});
document.addEventListener('click',event=>{document.querySelectorAll('.calendar-menu[open]').forEach(menu=>{if(!menu.contains(event.target))menu.open=false})});
document.addEventListener('keydown',event=>{if(event.key==='Escape')document.querySelectorAll('.calendar-menu[open]').forEach(menu=>{menu.open=false;menu.querySelector('summary').focus()})});
document.getElementById('print-button').addEventListener('click',()=>window.print());
