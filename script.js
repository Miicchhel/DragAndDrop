document.addEventListener('DOMContentLoaded', (event) => {

  const AddLocalStorage = () => {
    const obj = {
      toDO:[],
      doing: [],
      done: []
    };
    //localStorage
    const toDO = document.querySelectorAll('.toDo');
    toDO.forEach((item) => obj.toDO.push(item.innerText));
    const doing = document.querySelectorAll('.doing');
    doing.forEach((item) => obj.doing.push(item.innerText));
    const done = document.querySelectorAll('.done');
    done.forEach((item) => obj.done.push(item.innerText));

    localStorage.setItem('objeto', JSON.stringify(obj));
  }

  const getLocalStorage = () => {
    if (localStorage.length > 0) {
      const itemSalvo = JSON.parse(localStorage.getItem('objeto'));

      const toDO = document.getElementsByClassName('toDo');
      [toDO[0].innerText, toDO[1].innerText, toDO[2].innerText] = itemSalvo.toDO;

      const doing = document.querySelectorAll('.doing');
      [doing[0].innerText, doing[1].innerText, doing[2].innerText] = itemSalvo.doing;

      const done = document.querySelectorAll('.done');
      [done[0].innerText, done[1].innerText, done[2].innerText] = itemSalvo.done;
    }
  }

  const handleDragStart = (e) => {
    e.target.style.opacity = '0.4';

    dragSrcEl = e.target;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
  }

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';

    items.forEach((item) => item.classList.remove('over'));
  }

  const handleDragOver = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    
    return false;
  }
  
  const handleDragEnter = (e) => {
    e.target.classList.add('over');
  }
  
  const handleDragLeave = (e) => {
    e.target.classList.remove('over');
  }

  const handleDrop = (e) => {
    e.stopPropagation();
    if (dragSrcEl !== e.target) {
      dragSrcEl.innerHTML = e.target.innerHTML;
      e.target.innerHTML = e.dataTransfer.getData('text/html');

      AddLocalStorage();
    }
    return false;
  }

  const items = document.querySelectorAll('.table .box');
  getLocalStorage();

  items.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('drop', handleDrop);
  });
});