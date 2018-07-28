
const colorizeBG = (song) => {
  let bg = {
    a: `rgba(${song.color['Vibrant'] ? song.color['Vibrant']._rgb.join(',') + ',0.5' : '125,125,125'})`,
    b: `rgba(${song.color['DarkMuted'] ? song.color['DarkMuted']._rgb.join(',') + ',0.5' : '125,125,125'})`,
    c: `rgba(${song.color['DarkVibrant'] ? song.color['DarkVibrant']._rgb.join(',') + ',0.5' : '125,125,125'})`,
    d: `rgba(${song.color['LightMuted'] ? song.color['LightMuted']._rgb.join(',') + ',0.5' : '125,125,125'})`,
    e: `rgba(${song.color['LightVibrant'] ? song.color['LightVibrant']._rgb.join(',') + ',0.5' : '125,125,125'})`,
    f: `rgba(${song.color['Muted'] ? song.color['Muted']._rgb.join(',') + ',0.5' : '125,125,125'})`,
  }
  document.documentElement.style.setProperty(`--one`, bg.a);
  document.documentElement.style.setProperty(`--two`, bg.b);
  document.documentElement.style.setProperty(`--three`, bg.c);
  document.documentElement.style.setProperty(`--four`, bg.d);
}


export default {
  colorizeBG
} 