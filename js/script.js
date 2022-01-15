'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this; 


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


  /* find the correct article using the selector (value of 'href' attribute) */

  const correctArticle = document.querySelector(clickedHrefArticle);


  /* add class 'active' to the correct article */

  correctArticle.classList.add('active');
}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = '') {

  /* remove all links in left table  */
    
  const listTitles = document.querySelector(optTitleListSelector);
  listTitles.innerHTML = '';
    
  /* for each link in article  */

  const listArticles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (let article of listArticles){

    /* get article id  */
    const articleId = article.getAttribute("id");


    /* get title and save in const  */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML


    /* based on above save link to html  */
    const htmlLink = '<li><a href="#'+articleId+'" class="active"><span>'+articleTitle+'</span></a></li>';

    /* insert html to table  */
    html = html + htmlLink;
  
  }
    
  listTitles.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
    
}
    
generateTitleLinks();

function generateTags(){
  /* find all articles */

  const allArticles = document.querySelectorAll(optArticleSelector);
  

  /* START LOOP: for every article: */

  for (let article of allArticles){

    /* find tags wrapper */
    const wrapper = article.querySelector(optArticleTagsSelector);


    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const dataTags = article.getAttribute('data-tags');

    /* split tags into array */
    const tagsArr = dataTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of tagsArr){

      /* generate HTML of the link */
      const linkHtml = '<li><a href="#tag-'+tag+'">'+tag+'</a></li>';

      /* add generated code to html variable */
      html = html + linkHtml;

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }
}

generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this; 

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags){
    /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTags = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let hrefTag of hrefTags){
    /* add class active */
    hrefTag.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}



function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('.post .list a');

  /* START LOOP: for each link */
  for (let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();