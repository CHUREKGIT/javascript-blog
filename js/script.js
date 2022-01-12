'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this; 
  console.log('Link was clicked!');

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const clickedHrefArticle = clickedElement.getAttribute("href");
  console.log(clickedHrefArticle);

  /* find the correct article using the selector (value of 'href' attribute) */

  const correctArticle = document.querySelector(clickedHrefArticle);
  console.log(correctArticle)

  /* add class 'active' to the correct article */

  correctArticle.classList.add('active');
}



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove all links in left table  */
    
  const listTitles = document.querySelector(optTitleListSelector);
  listTitles.innerHTML = '';
    
  /* for each link in article  */

  const listArticles = document.querySelectorAll(optArticleSelector);

  let html = '';

  for (let article of listArticles){

    /* get article id  */
    const articleId = article.getAttribute("id");
    console.log(articleId);

    /* get title and save in const  */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML
    console.log(articleTitle)

    /* based on above save link to html  */
    const htmlLink = '<li><a href="#'+articleId+'" class="active"><span>'+articleTitle+'</span></a></li>'
    console.log(htmlLink)
    /* insert html to table  */
    html = html + htmlLink;
    console.log(html);
  }
    
  listTitles.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
    
}
    
generateTitleLinks();