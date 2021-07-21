window.onload = function() {

  let leafs = [];
  let body = document.getElementsByTagName('body')[0];

  for(let i = 0; i < 10; ++i) {
    let img = document.createElement('img');
    img.src = 'img/sakura.png';
    img.classList = 'h-8';
  
    let leaf = document.createElement('div');
    leaf.classList = 'absolute transition ease-in transition-transform z-10';
    leaf.append(img);

    leaf.style.setProperty('display', 'block');
    leafs.push(leaf);
    body.append(leaf);
  }

  setInterval(function() {
    if(leafs.length > 0) {
      let leaf = leafs.pop();

      leaf.style.setProperty('display', 'block');
      leaf.style.setProperty('top', 0);
      leaf.style.setProperty('left', `${Math.random() * 100}%`);
      leaf.style.setProperty('opacity','0%');
  
      setTimeout(function() {
        leaf.style.setProperty('transform', 'translateY(98vh) rotate(360deg)');
        leaf.style.setProperty('transition-duration', '1500ms');
        leaf.style.setProperty('opacity', '75%');
        setTimeout(function() {
          leaf.style.removeProperty('transform');
          leaf.style.setProperty('display', 'none');
          leafs.push(leaf);
        }, 1500);
      }, 1500);
    }
  }, 500);

};