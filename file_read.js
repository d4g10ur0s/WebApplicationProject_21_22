
f = document.getElementById('upfile');
var fr=new FileReader();
fr.readAsText(f.files[0]);
fr.onload=function(){alert(fr.result);}
