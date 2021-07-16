window.onload = function() {

  let leafs = [];
  let body = document.getElementsByTagName('body')[0];

  for(let i = 0; i < 10; ++i) {
    let img = document.createElement('img');
    img.src = 'img/sakura.png';
    img.classList = 'h-4';
  
    let leaf = document.createElement('div');
    leaf.classList = 'absolute transition-transform duration-1000 z-10';
    leaf.append(img);

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
        leaf.style.setProperty('transform', 'translateY(98vh)');
        leaf.style.setProperty('opacity', '75%');
        setTimeout(function() {
          leaf.style.removeProperty('transform');
          leaf.style.setProperty('display', 'none');
          leafs.push(leaf);
        }, 1000);
      }, 1000);
    }
  }, 200);

};