/* 
*   Make a PLP title for product as a widget
*   
*   Use a template for rendering
*/

window.onload = () => {
  console.log('app started.', DATABASE);
  const PLP = document.getElementById('container');
  let template = '';

  showItems(DATABASE);
  
  let select = document.getElementById('filterBy'),
    minus = PLP.querySelector('.js-button-minus'),
    plus = PLP.querySelector('.js-button-plus'),
    content = PLP.getElementsByClassName('plp__content--quantity');
  
  count(content);
  
  select.addEventListener('click', e => {
    DATABASE.sort(sortObjectByField(select.value));
    showItems(DATABASE);
  });
  
  function count(arr) {
    for (let item of content) {
      let counter = 0,
          quantity = item.querySelector('.js-selector-quantity');
      
      quantity.innerText = counter;
      item.addEventListener('click', e => {
        if (e.target.innerText === minus.innerText) {
          counter -= 1;
        }
        if (e.target.innerText === plus.innerText) {
          counter += 1;
        }
        if (counter < 0) {
          counter = 0;
        }
        return quantity.innerText = counter;
      })
    }
  }
  
  function showItems(arr) {
    template = '';
    arr.forEach(item => {
      let element = new Render('template', item);
      template += element.render();
    });
    PLP.innerHTML = template;
  }

  function sortObjectByField(field) {
    return function (a, b) {
      if (a[field] > b[field]) {
        return 1;
      }
      if (a[field] < b[field]) {
        return -1;
      }
      return 0;
    };
  }
};

class Render {
  constructor(templateId, data) {
    this.template = document.getElementById(templateId).innerText;
    this.data = data;
  }

  render() {
    for(let key in this.data) {
      this.template = this.template.replace(`{{${key}}}`, this.data[key]);
    }
    return this.template;
  }
}